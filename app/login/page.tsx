'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Typography, Image, Spin } from 'antd';
import { MailOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { FormItem } from 'react-hook-form-antd';
import { Client, Account, ID } from 'appwrite';
import { CoatOfArms } from '../components/Logo';
import Notifications from '../components/utils/Notifications';
import environments from '../utils/environments';

const { Title, Text } = Typography;
const { APP_ENDPOINT, APP_PROJECT } = environments;

// Initialize Appwrite client and account service
const client = new Client();

// Set the endpoint and project ID
client
  .setEndpoint(APP_ENDPOINT)
  .setProject(APP_PROJECT);

// Create an account instance
const account = new Account(client);

interface FormValues {
  emailOrPhone: string;
  password: string;
}

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export interface NotifsTypes {
  type: NotificationType;
  title: string;
  message: string;
  toggle: boolean;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>();
  const router = useRouter();
  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false,
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      setLoading(true);
      console.log('Attempting login with:', values.emailOrPhone);

      // First, check if there's an existing session
      try {
        const currentSession = await account.getSession('current');
        if (currentSession) {
          // If the session exists and it's valid, just redirect to dashboard
          console.log('Existing valid session found');
          router.push('/dashboard');
          return;
        }
      } catch (e) {
        // No existing session or session is invalid, proceed with login
        console.log('No valid session found, proceeding with login');
      }

      // Create email session using Appwrite
      const session = await account.createEmailPasswordSession(
        values.emailOrPhone,
        values.password
      );

      // Verify the session was created successfully
      if (!session?.$id) {
        throw new Error('Failed to create session');
      }

      // Get the user details
      const user = await account.get();
      
      if (!user?.$id) {
        throw new Error('Failed to get user details');
      }

      console.log('Login successful:', { session, user });

      setNotifs({
        type: 'success',
        title: 'Welcome back!',
        message: 'Login successful. Redirecting to dashboard...',
        toggle: true,
      });
      
      // Add a small delay before redirect to show the success message
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Invalid credentials. Please try again.';
      
      // Handle specific Appwrite error codes
      if (error?.code === 401) {
        errorMessage = 'Invalid email or password';
      } else if (error?.code === 429) {
        errorMessage = 'Too many login attempts. Please try again later.';
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      setNotifs({
        type: 'error',
        title: 'Login Failed',
        message: errorMessage,
        toggle: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notifications {...notifs} />
      <div style={styles.container}>
        <div style={styles.formContainer}>
          <Image
            alt="logo"
            height={100}
            width={105}
            src={CoatOfArms}
            preview={false}
          />
          <Title level={3}>CHS Integrated Supervision Tool Login</Title>

          <Text>Hey, Enter your details to get signed in to your account</Text>
          <Form
            name="login"
            style={styles.form}
            onFinish={handleSubmit(onSubmit)}
          >
            <FormItem
              name="emailOrPhone"
              control={control}
              rules={[
                {
                  required: true,
                  message: 'Please enter your email or phone!',
                },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                size="large"
                placeholder="Enter Email"
              />
            </FormItem>

            <FormItem
              name="password"
              control={control}
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </FormItem>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={styles.signInButton}
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined spin style={{ color: '#fff' }} />
                    }
                    size="small"
                  />
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F5FA',
    padding: '20px',
  },
  header: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    marginTop: '20px',
  },
  signInButton: {
    backgroundColor: '#433878',
  },
  orSignInWith: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
