import { Block } from "../../classes/Block";
import { Wallet } from "../../classes/Wallet";

export class Cycle {
  public static Mine = (wallets: Wallet[], transactions: Block[]) => {
    const w = [];
    for(let i = 0; i < wallets.length; i++) {
      w.push({id: i, assigned: false});
    }
  }
}