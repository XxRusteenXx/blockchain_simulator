import { IdemBlock } from "../utils/IdemBlock"
import { createRandomString } from "../utils/RandomString"
import { Block } from "./Block"
import { Wallet } from "./Wallet"

export class State{
  private wallets: Wallet[]
  private blocksToBeMined: Block[]

  constructor(){
    this.wallets = []
    this.blocksToBeMined = [IdemBlock]
  }

  public clone = () => {
    const stateClone = new State();
    stateClone.wallets = this.wallets;
    stateClone.blocksToBeMined = this.blocksToBeMined;
    return stateClone;
  }

  public getWallets = () => this.wallets;
  public getBlocksToBeMined = () => this.blocksToBeMined;
  public getWalletByName = (name: string) => this.wallets.find(w => w.getName() === name);

  public addWallet = (name: string) => {
    if (this.verifyWalletName(name)) {
      let address = createRandomString(32);
      while(!this.verifyWalletAddress(address)) address = createRandomString(32);
      this.wallets.push(new Wallet(
        name,
        address,
        0,
        false
      ))
    }
    return this.clone()
  }

  public removeWallet = (name: string) => {
    this.wallets = this.wallets.filter(w => w.getName() !== name);
    return this.clone();
  }

  public triggerMiningByName = (name: string, mining: boolean) => {
    const wallet = this.getWalletByName(name);
    if (wallet) {
      mining ? wallet.startMining() : wallet.stopMining();
    } else {
      console.error("Wallet with name", name, "not found");
    }
    return this.clone();
  }

  private verifyWalletName = (name: string) => {
    if(name.length === 0)
      return false
    let verified = true
    this.wallets.forEach(w => {
      if (w.getName() === name)
        verified = false
    })
    return verified
  }

  private verifyWalletAddress = (address: string) => {
    if(address.length === 0)
      return false;
    let verified = true;
    this.wallets.forEach(w => {
      if (w.getAddress() === address)
        verified = false;
    })
    return verified
  }

  public addBlockToBeMined = (sender: string, receiver: string, amount: number) => {
    const block = new Block(0, sender, receiver, amount, 0, null);
    this.blocksToBeMined.push(block);
  }

  public removeBlockToBeMined = (block: Block) => {
    console.log("Removing block to be mined:", block);
    this.blocksToBeMined = this.blocksToBeMined.filter(b => 
      b.getAmount() !== block.getAmount() ||
      b.getFee() !== block.getFee() ||
      b.getSender() !== block.getSender() ||
      b.getReceiver() !== block.getReceiver()
    )
  }

  public hideBlockchains = () => {
    this.wallets.forEach(w => w.hideBlockchain());
    return this.clone();
  }

  public showBlockchain = (name: string) => {
    this.wallets.forEach(w => w.getName() === name ? w.showBlockchain() : null);
    return this.clone();
  }
}