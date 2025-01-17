import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; 

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const MyRichTextEditor = ({ value, onChange }) => {
  return (
    <ReactQuill value={value} onChange={onChange} theme="snow" />
  );
};

export default MyRichTextEditor;
