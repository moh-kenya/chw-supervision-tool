import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { useEffect } from 'react';
import { type NotifsTypes } from '@/app/login/page';

type NotificationPlacement = NotificationArgsProps['placement'];

const Notifications = (props: NotifsTypes) => {
  const { type, title, message, toggle } = props;
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (toggle) {
      api[type]({
        message: title,
        description: message,
        placement: 'top',
        duration: 3,
        style: {
          position: 'relative', // Change from fixed to relative
          zIndex: 1000
        }
      });
    }
  }, [api, message, title, toggle, type]);

  return contextHolder;
};

export default Notifications;
