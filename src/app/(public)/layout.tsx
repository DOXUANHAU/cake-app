// 'use client';
// import type { ReactNode } from "react";
// import { PublicFooter, PublicHeader } from "@/components/shared/layout";
// import { Layout , Flex } from "antd";

// type PublicLayoutProps = {
//   children: ReactNode;
// };

// export default function PublicLayout({ children }: PublicLayoutProps) {
//   const {  Content } = Layout;
  
// const contentStyle: React.CSSProperties = {
//   textAlign: 'center',
//   minHeight: 'clamp(240px, 50vh, 560px)',
//   lineHeight: 'normal',
//   padding: '16px',
//   color: '#fff',
//   backgroundColor: '#0958d9',
// };

// const layoutStyle = {
//   borderRadius: 8,
//   overflow: 'hidden',
//   width: '100%',
//   maxWidth: 560,
// };
// return (
//    <Flex gap="medium" wrap>
//     <Layout style={layoutStyle}>
//       <PublicHeader />
//       <Content style={contentStyle}>Content</Content>
//       <PublicFooter />
//     </Layout>
   
//   </Flex>
// );   
// }