"use client";
import { Button, Card, Col, Form, Input, Row, Typography } from "antd";
import { useState } from "react";
import Link from "next/link";
import { validateRegister } from "@/utils/validator";
import { RegisterErrors } from "@/types/error.types";

const { Title, Text } = Typography;

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validateRegister(form);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        console.log("Register success:", form);
        // TODO: call API register
    };

    const isInvalid = Object.keys(errors).length > 0;

    return (
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", background: "#f5f5f5", padding: 16 }}
      >
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <Card>
            <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
              Register
            </Title>

            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              <Form.Item
                label="Full name"
                validateStatus={errors.name && touched.name ? "error" : ""}
                help={touched.name ? errors.name : undefined}
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

              <Form.Item
                label="Password"
                validateStatus={
                  errors.password && touched.password ? "error" : ""
                }
                help={touched.password ? errors.password : undefined}
              >
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Form.Item
                label="Confirm password"
                validateStatus={
                  errors.confirmPassword && touched.confirmPassword
                    ? "error"
                    : ""
                }
                help={
                  touched.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
              >
                <Input.Password
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Form.Item>

              <Button type="primary" htmlType="submit" block disabled={isInvalid}>
                Sign Up
              </Button>
            </Form>

            <Text style={{ display: "block", textAlign: "center", marginTop: 16 }}>
              Already have an account? <Link href="/login">Login</Link>
            </Text>
          </Card>
        </Col>
      </Row>
    );
}