"use client";
import { Button, Card, Col, Form, Row, Typography, Input } from "antd";
import Link from "next/link";
import { useRegister } from "@/hook/auth/useRegister";

const { Title, Text } = Typography;
export default function RegisterPage() {
  const {
    register,
    loading,
    errors,
    form,
    touched,
    handleChange,
    handleBlur,
  } = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register();
  };

  return (
    <Row justify="center" align="middle" style={{ width: "100%", padding: 16 }}>
      <Col xs={24} sm={20} md={14} lg={10} xl={8}>
        <Card>
          <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
            Register
          </Title>

          <Form layout="vertical" onSubmitCapture={handleSubmit}>
            {/* add input fields here */}
            <Form.Item
              label="Username"
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              validateStatus={
                errors.confirmPassword && touched.confirmPassword ? "error" : ""
              }
              help={
                touched.confirmPassword ? errors.confirmPassword : undefined
              }
            >
              <Input.Password
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            {/* use loading to show registration status button */}
            {loading && (
              <Button type="primary" htmlType="submit" block disabled>
                Registering...
              </Button>
            )}
            <Button type="primary" htmlType="submit" block disabled={loading}>
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
