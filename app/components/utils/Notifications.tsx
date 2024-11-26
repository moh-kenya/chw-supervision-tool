import { NotifsTypes } from "@/app/login/page";
import { notification } from "antd";
import type { NotificationArgsProps } from 'antd';
import { useEffect } from "react";
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
    }, [api, message, title, toggle, type])
    return contextHolder;

}

export default Notifications;