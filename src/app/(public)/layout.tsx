"use client";
import type { ReactNode } from "react";
import { PublicFooter, PublicHeader } from "@/components/shared/layout";
import { Layout, Flex } from "antd";

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { Content } = Layout;

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: "clamp(240px, 50vh, 560px)",
    padding: "16px",
    color: "#fff",
    backgroundColor: "#0958d9",

    // Make content flexible
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const layoutStyle: React.CSSProperties = {
    borderRadius: 8,
    overflow: "hidden",

    width: "100%",
    maxWidth: "1200px", // limit for large screens
    margin: "0 auto", // center horizontally

    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // full screen height
  };

  return (
    <Flex
      style={{ padding: "12px" }} // spacing on mobile
      justify="center"
      gap="medium"
      wrap
    >
      <Layout style={layoutStyle}>
        <PublicHeader />
        <Content style={contentStyle}>{children}</Content>
        <PublicFooter />
      </Layout>
    </Flex>
  );
}
