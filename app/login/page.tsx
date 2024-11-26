"use client";
import React, { useState } from "react";
import { Button, Form, Input, Typography, Image, Spin } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { CoatOfArms } from '../components/Logo';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormItem } from "react-hook-form-antd";
import Notifications from "../components/utils/Notifications";


const { Title, Text } = Typography;

type FormValues = {
    emailOrPhone: string
    password: string
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';
export type NotifsTypes = {
    type: NotificationType;
    title: string;
    message: string;
    toggle: boolean;
}


export default function LoginPage() {

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm();
    const router = useRouter();
    const [notifs, setNotifs] = useState<NotifsTypes>({
        type: 'success',
        title: 'Success',
        message: 'You are being logged in momentarily!',
        toggle: false
    })

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailOrPhone: values.emailOrPhone,
                    password: values.password,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setNotifs({
                    type: 'success',
                    title: 'Success',
                    message: 'You are being logged in momentarily!',
                    toggle: true
                })
                router.push("/dashboard");

            } else {
                setNotifs({
                    type: 'error',
                    title: "Login Failed",
                    message: data.message || "An error occurred during login.",
                    toggle: true
                })
                setLoading(false);
            }
        } catch (error) {
            console.error(error)
            setNotifs({
                type: 'error',
                title: "An unexpected error occurred",
                message: "Please try again later",
                toggle: true
            })
            setLoading(false);
        }
    };

    return (
        <>
            <Notifications {...notifs} />
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <Image alt="logo" height={100} width={105} src={CoatOfArms} preview={false} />
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
                            rules={[{ required: true, message: 'Please enter your email or phone!' }]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Enter Email"
                            />
                        </FormItem>

                        <FormItem
                            name="password"
                            control={control}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder="Password"
                            />
                        </FormItem>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block style={styles.signInButton}>
                                {loading ? <Spin indicator={<LoadingOutlined spin style={{ color: "#fff" }} />} size="small" /> : <>Sign In</>}
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
