"use client"

import React from 'react';

const RichTextRenderer = ({ content }:{content:any}) => {
  return (
    <div className="prose prose-h1:text-[2rem] prose-h2:text-[1.8rem]  prose-p:text-[1.4rem] prose-p:leading-relaxed">
      {/* Base content container */}
      <div 
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default RichTextRenderer;