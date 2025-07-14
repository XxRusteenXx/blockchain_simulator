import { Block } from "./Block";
import { Wallet } from "./Wallet";
import { KEY_LENGTH } from "../const/Const";
import { createRandomString } from "../utils/RandomString";

export class Loop {
  private static assignTransactions = (miningWallets: Wallet[], transactions: Block[]) => {
    console.log("Assigning transactions")

    miningWallets.forEach(w => {
      if(!w.getAssignedBlock()) {
        const random = Math.floor(Math.random() * transactions.length);
        w.assignBlock(transactions[random]);
      }
    })
  }

  public static Mine = (
      wallets: Wallet[],
      transactions: Block[],
      removeTransaction: (arg: Block) => void,
      rerender: () => void
    ) => {
    console.log("Mine");

    const w = [];
    for(let i = 0; i < wallets.length; i++) {
      if (wallets[i].getIsMining())
        w.push(wallets[i]);
    }

    this.assignTransactions(w, transactions);

    for(let i = 0; i < w.length; i++) {
      const assignedBlock = w[i].getAssignedBlock();
      if(assignedBlock) {
        let generatedKey = createRandomString(KEY_LENGTH);
        assignedBlock.setKey(generatedKey);
        if(Block.verifyWork(assignedBlock)) {
          if(w[i].getBlockchain().length !== 0) {
            assignedBlock.setPrevHash(
              w[i].getBlockchain()[w[i].getBlockchain().length-1].getCurHash()
            );
          } else {
            assignedBlock.setPrevHash(0);
          }
          w[i].addBlockToBlockchain(assignedBlock);
          
          assignedBlock.setMiner(w[i].getName());
          assignedBlock.setReward(Block.calculateReward(assignedBlock.getId()));
          removeTransaction(assignedBlock);
          w[i].assignBlock(null);
          rerender();
        } else {
          assignedBlock.setKey(null);
        }
      }
    }
  }

  public static Broadcast = (wallets: Wallet[]) => {
    console.log("Broadcast");

    for(let i = 0; i < wallets.length; i++) {
      for(let j = 0; j < wallets.length; j++) {
        wallets[j].receiveBlockchain(wallets[i].getBlockchain());
      }
    }

    wallets.forEach(w => {
      w.processReceivedBlockchains();
    })
  }
}