import { FC } from "react";

import styles from './Button.module.css'

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button
      className={styles.btn}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button