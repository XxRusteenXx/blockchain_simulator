import { FC } from "react";

import styles from "./BlockItem.module.css";
import { Block } from "../../../classes/Block";

interface BlockItemProps {
  block: Block
  isMined: boolean
}

const BlockItem: FC<BlockItemProps> = ({block, isMined}) => {
  return (
    <div className={styles.blockItem}>
      {
        isMined ?
          <>
            <div>
              ID: {block.getId()}
            </div>
            <div>
              Previous Hash: {block.getPrevHash()}
            </div>
            <div>
              Current Hash: {block.getCurHash()}
            </div>
            <div>
              Reward: {block.getReward()}
            </div>
          </>
        : <></>
      }
      <div>
        Sender: {block.getSender()}
      </div>
      <div>
        Receiver: {block.getReceiver()}
      </div>
      <div>
        Amount: {block.getAmount()}
      </div>
      <div>
        Fee: {block.getFee()}
      </div>
    </div>
  )
}

export default BlockItem