interface InputProp {
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputProp> = ({ placeholder, onChange }) => {
  return <input type="text" placeholder={placeholder} onChange={onChange} />
}

export default InputField
