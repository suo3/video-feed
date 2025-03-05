
'use client'
export default function MyButton(props: { onClick: () => void }) {
  return (
    <button onClick={props.onClick}>Click Me</button>
  )
}