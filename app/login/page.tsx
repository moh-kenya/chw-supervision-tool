'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Typography, Image } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { CoatOfArms } from '../components/Logo';
import Notifications from '../components/utils/Notifications';

const { Title, Text } = Typography;

type NotificationType = 'success' | 'info' | 'warning' | 'error';
export interface NotifsTypes {
  type: NotificationType;
  title: string;
  message: string;
  toggle: boolean;
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [notifs, setNotifs] = useState<NotifsTypes>({
    type: 'success',
    title: 'Success',
    message: 'You are being logged in momentarily!',
    toggle: false,
  });

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      console.log('Attempting login with:', values.email);

      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setNotifs({
          type: 'error',
          title: 'Login Failed',
          message: result.error,
          toggle: true,
        });
        return;
      }

      // Show success message
      setNotifs({
        type: 'success',
        title: 'Welcome back! 👋',
        message: `Successfully logged in as ${values.email}`,
        toggle: true,
      });

      // Wait for notification to show
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Login error:', error);
      setNotifs({
        type: 'error',
        title: 'Login Failed',
        message: error.message || 'An error occurred during login. Please try again.',
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
          <Text>Enter your credentials to access the system</Text>
          
          <Form
            name="login"
            style={styles.form}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please enter your email!' }]}
            >
              <Input
                prefix={<MailOutlined />}
                size="large"
                placeholder="Enter Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
                style={styles.signInButton}
              >
                {loading ? 'Signing in...' : 'Sign In'}
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
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
  },
  formContainer: {
    padding: '2rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center' as const,
  },
  form: {
    marginTop: '2rem',
  },
  signInButton: {
    marginTop: '1rem',
    height: '40px',
  },
};
