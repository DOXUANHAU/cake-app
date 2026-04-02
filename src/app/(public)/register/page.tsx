"use client";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Row,
  Typography,
  Input,
} from "antd";
import { useState } from "react";
import Link from "next/link";
import { validateRegister } from "@/utils/validator";
import { RegisterErrors } from "@/types/error.types";
// import { InputField } from "@/components/ui/InputField";
import { sileo, Toaster } from "sileo";
const { Title, Text } = Typography;
type FieldType = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};
export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    // 🔥 real-time validation
    setErrors(validateRegister(newForm));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateRegister(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // TODO: call API registers
    // try {
    //   const response = await fetch("/api/auth/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });

    //   if (!response.ok) {
    //     const data = await response.json();
    //     setErrors(data.errors || { general: data.message });
    //   } else {
    //     // Registration successful, redirect to login or home page
    //     sileo.success({ title: "Registration saved" });
    //     window.location.href = "/login";
    //   }
    // } catch (error) {
    //   sileo.error({
    //     title: "Error",
    //     description: "An unexpected error occurred. Please try again.",
    //   });
    // }
  };

  const isInvalid = Object.keys(errors).length > 0;

  return (
    <Row justify="center" align="middle" style={{ width: "100%", padding: 16 }}>
      <Toaster position="top-right" />
      <Col xs={24} sm={20} md={14} lg={10} xl={8}>
        <Card>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Register
          </Title>

          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            {/* add input fields here */}
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: errors.name || "Please input your username!",
                },
              ]}
            >
              <Input
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Email"
              validateStatus={errors.email && touched.email ? "error" : ""}
              help={touched.email ? errors.email : undefined}
            >
              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: errors.password || "Please input your password!",
                },
              ]}
            >
              <Input.Password
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item<FieldType>
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message:
                    errors.confirmPassword || "Please confirm your password!",
                },
              ]}
            >
              <Input.Password
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block disabled={isInvalid}>
              Sign Up
            </Button>
          </Form>

          <Text
            style={{ display: "block", textAlign: "center", marginTop: 16 }}
          >
            Already have an account? <Link href="/login">Login</Link>
          </Text>
        </Card>
      </Col>
    </Row>
  );
}
