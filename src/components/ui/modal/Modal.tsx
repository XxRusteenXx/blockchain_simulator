import { FC } from "react";

import styles from "./Modal.module.css"

interface ModalProps {
  children: React.ReactNode
  isActive: boolean
  setVisibility: (arg: boolean) => any
}

const Modal: FC<ModalProps> = ({children, isActive, setVisibility}) => {
  const classes = [styles.modal];

  if (isActive)
    classes.push(styles.active)

  return (
    <div className={classes.join(' ')} onClick={() => setVisibility(false)}>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal