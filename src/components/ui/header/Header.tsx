import { FC } from "react"

import styles from "./Header.module.css"

const Header: FC = () => {
  return (
    <div className={styles.header}>
      Digital Currency Blockchain simulator
    </div>
  )
}

export default Header