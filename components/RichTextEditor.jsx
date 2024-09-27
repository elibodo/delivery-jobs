"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";

import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ListBulletIcon,
  NumberedListIcon,
  H1Icon,
} from "@heroicons/react/24/outline";

const RichTextEditor = ({ onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1], // Specify that we want only H1
      }),
    ],
    immediatelyRender: false,
    content:
      "Add your job description here. Use the options at the top for bold, italic, underline, bulleted list, numbered list, and headers.",
    editorProps: {
      attributes: {
        class: "focus:outline-none", // Add the Tailwind class here
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // Get the current HTML
      onChange(html); // Call the onChange prop with the new content
    },
  });

  const handleTab = (event) => {
    if (event.key === "Tab") {
      event.preventDefault(); // Prevent the default tab behavior

      // Insert a tab character (or perform other custom actions)
      editor?.commands.insertContent("    "); // This inserts four spaces
      // Alternatively, you can use editor.commands.insertText('\t'); to insert a tab character
    }
  };

  return (
    <div className="min-h-[200px] min-w-[300px] max-w-[550px] rounded-lg border-2 bg-gray-200 pt-2">
      <div className="mx-2 mb-2 flex justify-center space-x-2">
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`rounded p-2 ${editor?.isActive("bold") ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <BoldIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`rounded p-2 ${editor?.isActive("italic") ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <ItalicIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`rounded p-2 ${editor?.isActive("underline") ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <UnderlineIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`rounded p-2 ${editor?.isActive("bulletList") ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <ListBulletIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`rounded p-2 ${editor?.isActive("orderedList") ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <NumberedListIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`rounded p-2 ${editor?.isActive("heading", { level: 1 }) ? "bg-orange-600 text-sm font-semibold text-white" : "bg-gray-300 text-sm font-semibold"}`}
        >
          <H1Icon className="h-5 w-5" />
        </button>
      </div>
      <div className="prose prose-base prose-h1:text-xl prose-h1:font-semibold prose-h1:mb-2 prose-p:my-0 prose-p:py-0 prose-li:py-0 prose-li:my-0 flex max-h-[500px] min-h-[150px] resize-y overflow-auto rounded-b-lg bg-white px-3 py-3 leading-5 text-gray-700">
        <EditorContent
          editor={editor}
          onKeyDown={handleTab}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
