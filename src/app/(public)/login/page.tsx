"use client";
import Link from "next/link";
import { Button, Card, Col, Form, Row, Typography, Input } from "antd";
import { useSignIn } from "@/hook/auth/useSignIn";
const { Title, Text } = Typography;
export default function LoginPage() {
  const {
    loading,
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useSignIn();
  return (
    <>
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%", padding: 16 }}
      >
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <Card>
            <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
              Login
            </Title>

            <Form layout="vertical" onSubmitCapture={handleSubmit}>
              {/* add input fields here */}

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

              {/* use loading to show registration status button */}
              {loading && (
                <Button type="primary" htmlType="submit" block disabled>
                  Logging in...
                </Button>
              )}
              <Button type="primary" htmlType="submit" block disabled={loading}>
                Login
              </Button>
            </Form>

            <Text
              style={{ display: "block", textAlign: "center", marginTop: 16 }}
            >
              Dont have an account yet ?{" "}
              <Link href="/register">Register here</Link>
            </Text>
          </Card>
        </Col>
      </Row>
    </>
  );
}
