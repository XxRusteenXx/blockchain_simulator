import { FC, useContext, useState } from "react"

import Container from "../ui/container/Container"
import { StateContext } from "../../context/Context"
import InputText from "../ui/input-text/InputText"
import Button from "../ui/button/Button"
import WalletItem from "../wallets/wallet-item/WalletItem"
import BlockList from "../blocks/block-list/BlockList"
import AddBlock from "../blocks/add-block/addBlock"
import Modal from "../ui/modal/Modal"
import { WALLET_NAME_MAX_LENGTH } from "../../const/Const"
import styles from "./Content.module.css"

const Content: FC = () => {
  const {state, rerender} = useContext(StateContext);

  const [showAddTransactionModal, setShowAddTransactionModal] = useState<boolean>(false);
  const [shownBlockchain, setShownBlockchain] = useState<number>(-1);
  const [inputWallet, setInputWallet] = useState<string>("");

  const changeWalletInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= WALLET_NAME_MAX_LENGTH)
      setInputWallet(e.target.value.toUpperCase());
  }

  const addWalletClickHandler = () => {
    state.addWallet(inputWallet);
    rerender();
    setInputWallet("");
  }

  const showAddTransactionClickHandler = () => {
    setShowAddTransactionModal(true);
  }

  return (
    <>
      <div className={styles.content}>
        <Container>
          <div className={styles.addWallet}>
            <InputText placeholder="New Wallet..." value={inputWallet} onChange={changeWalletInputHandler}/>
            <Button text="Add" onClick={addWalletClickHandler}/>
          </div>
          {
            state.getWallets().map((w, i) =>(
              <div className={styles.wallet} key={w.getName()}>
                <WalletItem id={i} wallet={w} isBlockchainShown={w.getIsBlockchainShown()} setShownBlockchain={setShownBlockchain}/>
                {i < state.getWallets().length - 1 && <hr className={styles.horizontalLine}/>}
              </div>
            ))
          }
        </Container>
        {
          shownBlockchain >= 0 &&
          <BlockList blocklist={state.getWallets()[shownBlockchain].getBlockchain()} isMined={true}/>
        }
        <Container>
          <Button text="Add a transaction" onClick={showAddTransactionClickHandler} />
          <BlockList blocklist={state.getBlocksToBeMined()} isMined={false}/>
        </Container>
      </div>
      <Modal isActive={showAddTransactionModal} setVisibility={setShowAddTransactionModal}>
        <AddBlock hideModal={() => setShowAddTransactionModal(false)}/>
      </Modal>
    </>
  )
}

export default Content