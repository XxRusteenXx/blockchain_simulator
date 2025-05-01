import { FC, useContext } from "react";

import styles from "./WalletDescription.module.css"
import { Wallet } from "../../../classes/Wallet";
import Container from "../../ui/container/Container";
import Button from "../../ui/button/Button";
import { StateContext } from "../../../context/Context";

interface WalletDescriptionProps {
  wallet: Wallet
}

const WalletDescription: FC<WalletDescriptionProps> = ({wallet}) => {
  const {state, setState} = useContext(StateContext);

  const removeWallet = () => {
    setState(state.removeWallet(wallet.getName()));
  }

  return (
    <Container>
      <div className={styles.walletDescription}>
        <div>
          Name: {wallet.getName()}
        </div>
        <hr className={styles.horizontalLine}/>
        <div>
          Address: {wallet.getAddress()}
        </div>
        <hr className={styles.horizontalLine}/>
        <div>
          Balance: {wallet.getBalance()}
        </div>
        <hr className={styles.horizontalLine}/>
        <Button text="Delete" onClick={removeWallet}/>
      </div>
    </Container>
  )
}

export default WalletDescription