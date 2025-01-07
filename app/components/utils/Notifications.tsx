import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { useEffect } from 'react';
import { type NotifsTypes } from '@/app/login/page';

type NotificationPlacement = NotificationArgsProps['placement'];

const Notifications = (props: NotifsTypes) => {
  const { type, title, message, toggle } = props;
  const placement: NotificationPlacement = 'topRight';
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (toggle) {
      api[type]({
        message: `${title}`,
        description: `${message}`,
        placement,
      });
    }
  }, [api, message, title, toggle, type]);
  return contextHolder;
};

export default Notifications;
