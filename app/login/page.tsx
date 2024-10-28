"use client";
import { Button, Form, Input, Typography, Image, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { CoatOfArms } from '../components/Logo';
import { FormItem } from "react-hook-form-antd";
import { useForm, SubmitHandler } from 'react-hook-form';
import { Account } from 'appwrite';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { client } from '../backend';

const { Title, Text } = Typography;

export default function LoginPage() {
    const router = useRouter();
    const account = new Account(client);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    type FormValues = {
        emailOrPhone: string
        password: string
    }
    const { control, handleSubmit } = useForm({
    });
    const onSubmit: SubmitHandler<FormValues> = (values) => {
        try {
            // Login user using Appwrite's email and password login method
            setShowError(false)
            account.createEmailPasswordSession(values.emailOrPhone, values.password).then(() => {
                setShowSuccess(true)
                router.push('/');
            })
                .catch(() => {
                    setShowError(true)
                })
            // Redirect to dashboard or home
        } catch (error) {
            if (error) setShowError(true)
        }
    }

    return (
        <div style={styles.container}>

            <div style={styles.formContainer}>
                <Image alt={"logo"} height={100} width={105} src={CoatOfArms} preview={false} />
                <Title level={3}>CHS Integrated Supervision Tool Login</Title>
                {showError &&
                    <Alert
                        message="Incorrect Credentials"
                        description="The credentials provided do not match. Please check your email or password"
                        type="error"
                        closable
                        style={{ marginBottom: 10 }}
                        onClose={() => setShowError(false)}
                    />}
                {showSuccess &&
                    <Alert
                        message="Success!"
                        description="Logging you in momentarily!"
                        type="success"
                        style={{ marginBottom: 10 }}
                    />}
                <Text>Hey, Enter your details to get sign in to your account</Text>
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
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
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
