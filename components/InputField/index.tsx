interface InputProp {
  placeholder: string
  onChange: () => void
}

const InputField: React.FC<InputProp> = ({ placeholder, onChange }) => {
  return <input type="text" placeholder={placeholder} onChange={onChange} />
}

export default InputField
