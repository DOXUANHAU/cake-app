'use client';

import {  Layout } from 'antd';

const {   Footer} = Layout;

export  function PublicFooter() {
  const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
};
  return (
      <Footer style={footerStyle}>Footer</Footer>
  
  );
}