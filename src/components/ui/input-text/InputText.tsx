import { FC } from "react";

import styles from "./InputText.module.css"

interface InputTextProps {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputText: FC<InputTextProps> = ({placeholder, value, onChange}) => {
  return (
    <input
      className={styles.inputText}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputText