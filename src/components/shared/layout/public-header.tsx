"use client";

import {  Layout } from 'antd';

const { Header } = Layout;

export function PublicHeader() {
   const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};
  return (
      <Header style={headerStyle}>Header</Header>
  );
}