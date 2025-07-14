import { FC, useContext, useState } from "react";
import { GiMining } from "react-icons/gi";

import styles from "./WalletItem.module.css"
import { StateContext } from "../../../context/Context";
import { Wallet } from "../../../classes/Wallet";
import Modal from "../../ui/modal/Modal";
import WalletDescription from "../wallet-description/WalletDescription";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

interface WalletItemProps {
  id: number
  wallet: Wallet
  isBlockchainShown: boolean
  setShownBlockchain: (arg: any) => any
}

const WalletItem: FC<WalletItemProps> = ({
  id,
  wallet,
  isBlockchainShown,
  setShownBlockchain
}) => {
  const {state, rerender} = useContext(StateContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const triggerCheckbox = () => {
    state.triggerMiningByName(wallet.getName(), !wallet.getIsMining());
    rerender();
  }

  const expandWallet = () => {
    setIsExpanded(true);
  }

  const blockchainShowHandler = (name: string, isShown: boolean) => {
    state.hideBlockchains();
    if(!isShown) {
      state.showBlockchain(name);
      setShownBlockchain(id);
    } else {
      setShownBlockchain(-1);
    }
    rerender();
  }

  const hideBlockchain = () => {
    setShownBlockchain(-1);
  }

  return (
    <>
      <div className={styles.walletItem}>
        <div className={styles.walletName} onClick={expandWallet}>
          {wallet.getName()}
        </div>
        <label className={styles.checkbox} onClick={(e: React.MouseEvent<HTMLLabelElement>) => e.stopPropagation()}>
          <GiMining/>
          <input onChange={triggerCheckbox} type="checkbox" checked={wallet.getIsMining()}/>
        </label>
        <div className={styles.showBlockchainButton} onClick={() => blockchainShowHandler(wallet.getName(), wallet.getIsBlockchainShown())}>
          {isBlockchainShown ? <GoTriangleLeft/> : <GoTriangleRight/>}
        </div>
      </div>
      <Modal isActive={isExpanded} setVisibility={setIsExpanded}>
        <WalletDescription wallet={wallet} isBlockchainShown={isBlockchainShown} hideShownBlockchain={hideBlockchain}/>
      </Modal>
    </>
  )
}

export default WalletItem