import { FC, useContext } from "react";

import styles from "./WalletDescription.module.css"
import { Wallet } from "../../../classes/Wallet";
import Container from "../../ui/container/Container";
import Button from "../../ui/button/Button";
import { StateContext } from "../../../context/Context";

interface WalletDescriptionProps {
  wallet: Wallet
  isBlockchainShown: boolean
  hideShownBlockchain: () => any
}

const WalletDescription: FC<WalletDescriptionProps> = ({wallet, isBlockchainShown, hideShownBlockchain}) => {
  const {state, rerender} = useContext(StateContext);

  const removeWallet = () => {
    state.removeWallet(wallet.getName());
    if(isBlockchainShown)
      hideShownBlockchain();
    rerender();
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
          Balance: {wallet.calculateCurrentBalance()}
        </div>
        <hr className={styles.horizontalLine}/>
        <Button text="Delete" onClick={removeWallet}/>
      </div>
    </Container>
  )
}

export default WalletDescription