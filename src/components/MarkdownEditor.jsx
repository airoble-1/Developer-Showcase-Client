import MDEditor from "@uiw/react-md-editor"

export default function MarkdownEditor({ value, onChange }) {
  return (
    <div>
      <MDEditor value={value} onChange={onChange} />
    </div>
  )
}
