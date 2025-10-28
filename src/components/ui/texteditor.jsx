import { useState } from "react"
import { MinimalTiptapEditor } from "./minimal-tiptap"

const TextEditor = () => {
  const [value, setValue] = useState("")

  return (
    <MinimalTiptapEditor
      value={value}
      onChange={setValue}
      className="w-full"
      editorContentClassName="p-5"
      output="html"
      placeholder="Enter your description..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden"
    />
  )
};

export default TextEditor;