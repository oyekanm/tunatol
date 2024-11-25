"use client"

import React from 'react';

const RichTextRenderer = ({ content }:{content:any}) => {
  return (
    <div className="prose max-w-none">
      {/* Base content container */}
      <div 
        className="text-gray-800"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Custom styles applied via CSS classes */}
      <style jsx>{`
        /* Headers */
        :global(h1) {
          @apply text-3xl font-bold mb-6 text-gray-900;
        }
        :global(h2) {
          @apply text-2xl font-semibold mb-4 text-gray-900;
        }
        :global(h3) {
          @apply text-xl font-medium mb-3 text-gray-900;
        }

        /* Paragraphs and spacing */
        :global(p) {
          @apply text-[2rem] mb-4 leading-relaxed;
        }

        /* Lists */
        :global(ul), :global(ol) {
          @apply mb-4 pl-6;
        }
        :global(li) {
          @apply mb-2;
        }
        :global(ul > li) {
          @apply list-disc;
        }
        :global(ol > li) {
          @apply list-decimal;
        }

        /* Links */
        :global(a) {
          @apply text-blue-600 hover:text-blue-800 underline;
        }

        /* Blockquotes */
        :global(blockquote) {
          @apply pl-4 border-l-4 border-gray-300 italic my-4;
        }

        /* Code blocks */
        :global(pre) {
          @apply bg-gray-100 rounded-lg p-4 my-4 overflow-x-auto;
        }
        :global(code) {
          @apply font-mono text-sm;
        }

        /* Tables */
        :global(table) {
          @apply w-full border-collapse mb-4;
        }
        :global(th), :global(td) {
          @apply border border-gray-300 p-2;
        }
        :global(th) {
          @apply bg-gray-100;
        }

        /* Images */
        :global(img) {
          @apply max-w-full h-auto rounded-lg my-4;
        }
      `}</style>
    </div>
  );
};

export default RichTextRenderer;