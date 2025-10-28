import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Underline } from '@tiptap/extension-underline';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';

import { Button } from "@/components/ui/button";

import './styles.css'; // Ensure you have styles (optional)
import { BoldIcon, ItalicIcon, List, ListOrdered, ListOrderedIcon, UnderlineIcon } from 'lucide-react';

const TextEditor = ({ defaultValue, onChange, disabled }) => {
  // Initialize the editor with the necessary extensions
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      // Update the state whenever the editor's content changes
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editable: !disabled, // Toggle the editable state
      });
    }
  }, [disabled, editor]);

  // Check if editor is ready before rendering the content
  if (!editor) {
    return null;
  }

  return (
    <div className="editor-container tiptap--text-editor--wrapper">
      {/* Toolbar with formatting buttons */}
      <div className="toolbar p-2 border-b-1">
        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
        >
          <BoldIcon />
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
        >
          <ItalicIcon />
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
        >
          <UnderlineIcon />
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
        >
          <List />
        </Button>

        <Button
          variant="ghost"
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
        >
          <ListOrderedIcon />
        </Button>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
