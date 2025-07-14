import { FC } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

import styles from "./BlockList.module.css"
import { Block } from "../../../classes/Block";
import Container from "../../ui/container/Container";
import BlockItem from "../block-item/BlockItem";

interface BlockListProps {
  blocklist: Block[]
  isMined: boolean
}

const BlockList: FC<BlockListProps> = ({blocklist, isMined}) => {
  return (
    <div className={styles.blockList}>
      {blocklist.map((b, i) =>
        <div key={i}>
          <Container>
            <BlockItem block={b} isMined={isMined}/>
          </Container>
          {
            isMined && i < blocklist.length - 1 && <FaLongArrowAltUp/>
          }
        </div>
      )}
    </div>
  )
}

export default BlockList