import { FC, useContext, useState } from "react";

import Container from "../../ui/container/Container";
import Button from "../../ui/button/Button";
import { StateContext } from "../../../context/Context";
import InputText from "../../ui/input-text/InputText";
import { WALLET_NAME_MAX_LENGTH } from "../../../const/Const";

import { numberFiltration } from "../../../utils/NumberFiltration";

interface AddBlockProps {
  hideModal: () => any
}

const AddBlock: FC<AddBlockProps> = ({hideModal}) => {
  const {state, rerender} = useContext(StateContext);

  const [sender, setSender] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const senderChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= WALLET_NAME_MAX_LENGTH)
      setSender(e.target.value.toUpperCase());
  }
  const receiverChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= WALLET_NAME_MAX_LENGTH)
      setReceiver(e.target.value.toUpperCase());
  }
  const amountChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = numberFiltration(e.target.value);
    setAmount(a);
  }

  const addTransactionClickHandler = () => {
    state.addBlockToBeMined(sender, receiver, amount);
    hideModal();
    setSender("");
    setReceiver("");
    setAmount(0);
    rerender();
  }

  return (
    <Container>
      <InputText placeholder="Sender..." value={sender} onChange={senderChangeHandler} />
      <InputText placeholder="Receiver..." value={receiver} onChange={receiverChangeHandler} />
      <InputText placeholder="Amount..." value={String(amount)} onChange={amountChangeHandler} />
      <Button text="Submit" onClick={addTransactionClickHandler} />
    </Container>
  )
}

export default AddBlock