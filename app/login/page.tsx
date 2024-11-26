"use client";
import { useState } from "react";
import { Button, Form, Input, Typography, Image, Alert, Spin } from "antd";
import { MailOutlined, LockOutlined, LoadingOutlined } from "@ant-design/icons";
import { CoatOfArms } from '../components/Logo';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FormItem } from "react-hook-form-antd";


const { Title, Text } = Typography;

type FormValues = {
    emailOrPhone: string
    password: string
}

export default function LoginPage() {
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        title: "Incorrect Credentials",
        description: "The credentials provided do not match. Please check your email or password",
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const { control, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            setLoading(true);
            setShowError(false);

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
                setShowSuccess(true);
                router.push("/dashboard");
            } else {
                setShowSuccess(false);
                setLoading(false);
                setErrorMessage({
                    title: "Login Failed",
                    description: data.message || "An error occurred during login.",
                });
                setShowError(true);
            }
        } catch (error) {
            console.log(error)
            setShowSuccess(false);
            setLoading(false);
            setErrorMessage({
                title: "An unexpected error occurred",
                description: "Please try again later.",
            });
            setShowError(true);
        }
    };

    return (
        <>
            <div style={styles.container}>
                <div style={styles.formContainer}>
                    <Image alt="logo" height={100} width={105} src={CoatOfArms} preview={false} />
                    <Title level={3}>CHS Integrated Supervision Tool Login</Title>

                    {showError && (
                        <Alert
                            message={errorMessage.title}
                            description={errorMessage.description}
                            type="error"
                            closable
                            style={{ marginBottom: 10 }}
                            onClose={() => setShowError(false)}
                        />
                    )}
                    {showSuccess && (
                        <Alert
                            message="Success!"
                            description="Logging you in momentarily!"
                            type="success"
                            style={{ marginBottom: 10 }}
                        />
                    )}

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
