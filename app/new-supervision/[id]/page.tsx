'use client';

import React, { useContext, useEffect, useState } from 'react';
import { Button, message, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import NavBar from '../../components/NavBar';
import { AppContext } from '../../providers';
import { type NotifsTypes } from '../../login/page';
import Notifications from '../../components/utils/Notifications';

const Home = ({ params }: { params: any }) => {
  const id = params?.id ?? '';
  const router = useRouter();

  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false,
  });
  const [current, setCurrent] = useState(0);
  const store = useContext(AppContext);
  const modules = store?.modules ?? [];

  const next = async () => {
    try {
      const currentModule = modules[current];
      if (!currentModule) {
        message.error('Module not found');
        return;
      }

      const currentState = store?.globalState;
      let isValid = true;
      let errorMessage = '';

      // Validate based on current module
      switch (currentModule.title) {
        case 'Supervision Team':
          const supervisionData = currentState?.superVisionTeam;
          if (!supervisionData?.number_in_supervision_team) {
            isValid = false;
            errorMessage = 'Please fill in the number of supervision team members';
          }
          break;

        case 'CHU Functionality':
          const chuData = currentState?.chuFunctionality;
          if (!chuData?.expected_no_of_chus || !chuData?.no_established_chus) {
            isValid = false;
            errorMessage = 'Please fill in all required CHU fields';
          }
          break;

        // Add cases for other modules as needed
      }

      if (!isValid) {
        message.error(errorMessage);
        return;
      }

      // If validation passes, proceed to next page
      if (current < modules.length - 1) {
        setCurrent(current + 1);
        message.success('Page validated successfully');
      } else {
        message.success('All pages completed!');
      }
    } catch (error) {
      message.error('Please ensure all required fields are filled correctly');
      console.error('Validation error:', error);
    }
  };

  const prev = () => {setCurrent(current + 1);
    setCurrent(current - 1);
  };
  const onChange = (value: number) => {
    setCurrent(value);
  };
  const submitDataToDB = async () => {
    if (store?.globalState[id]) {
      try {
        // Prepare the data for submission
        const dataToSubmit = {
          ...store.globalState[id],
          updatedDate: new Date().toISOString(),
          status: 'Submitted'
        };

        const response = await fetch('/api/auth/db', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            databaseId: process.env.NEXT_PUBLIC_DATABASE_ID,
            collectionId: process.env.NEXT_PUBLIC_COLLECTION_ID,
            data: dataToSubmit,
            id,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          await message.success('Successfully submitted data!');
          router.push('/dashboard');
        } else {
          await message.error(`Error: ${result.error}`);
        }
      } catch (error) {
        await message.error('Something went wrong with the submission. Please try again.');
      }
    } else {
      await message.error(
        'No data to submit. Please fill in the form and try again!'
      );
    }
  };
  useEffect(() => {
    const dataRetrieved = retrieveData('chw-supervision');
    if (!dataRetrieved[id]?.createdDate) {
      const data = {
        ...store?.globalState,
        createdDate: store?.globalState.createdDate || new Date(),
        updatedDate: new Date(),
        status: 'Draft',
      };
      dataRetrieved[id] = data;
      localStorage.setItem('chw-supervision', JSON.stringify(dataRetrieved));
      message.info(
        'New Supervision started and has been added to local drafts!'
      );
    } else {
      store?.setGlobalState((stored) => {
        const toStore = {
          ...dataRetrieved[id],
          ...stored,
        };
        dataRetrieved[id] = toStore;
        localStorage.setItem('chw-supervision', JSON.stringify(dataRetrieved));
        return dataRetrieved[id];
      });
    }
  }, [id, current]);

  const retrieveData = (id: string) => {
    const storedData = localStorage.getItem(id);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {};
  };
  const items = modules?.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Notifications {...notifs} />
      <NavBar setNotifs={setNotifs} id={id} />
      <div style={{ padding: '20px 48px', marginBottom: 80 }}>
        <Steps current={current} items={items} onChange={onChange} />
        <div>{modules?.[current]?.content}</div>
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button
              style={{ margin: '0 8px' }}
              onClick={() => {
                prev();
              }}
            >
              Previous
            </Button>
          )}
          {current < modules?.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                next();
              }}
            >
              Next
            </Button>
          )}
          {current === modules?.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                submitDataToDB();
              }}
            >
              Submit Data
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export const runtime = 'edge';

export default Home;
