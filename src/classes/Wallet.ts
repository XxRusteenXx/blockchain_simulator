import { Block } from "./Block"

export class Wallet {
  private name: string;
  private address: string;
  private balance: number;
  private blockchain: Block[];
  private isMining: boolean;
  private isBlockchainShown: boolean;
  private assignedBlock: Block | null;
  private receivedBlockchains: Block[][];

  constructor(
    name: string,
    address: string,
    balance: number,
    isMining: boolean,
  ) {
    this.name = name;
    this.address = address;
    this.balance = balance;
    this.isMining = isMining;
    this.blockchain = [];
    this.isBlockchainShown = false;
    this.assignedBlock = null;
    this.receivedBlockchains = [];
  }

  public getName = () => this.name;
  public getAddress = () => this.address;
  public getBalance = () => this.balance;
  public getBlockchain = () => this.blockchain;
  public getIsMining = () => this.isMining;
  public getIsBlockchainShown = () => this.isBlockchainShown;
  public getAssignedBlock = () => this.assignedBlock;

  public startMining = () => this.isMining = true;
  public stopMining = () => {
    this.isMining = false;
    this.assignedBlock = null;
  }
  public showBlockchain = () => this.isBlockchainShown = true;
  public hideBlockchain = () => this.isBlockchainShown = false;
  public assignBlock = (block: Block | null) => this.assignedBlock = block;

  public addBlockToBlockchain = (block: Block) => {
    block.setId(this.blockchain.length);
    this.blockchain = [block, ...this.blockchain];
  }

  public receiveBlockchain = (blockchain: Block[]) => this.receivedBlockchains.push(blockchain);

  public processReceivedBlockchains = () => {
    let longestReceivedBlockchains: Block[][] = [];
    let maxLength = 0;
    this.receivedBlockchains.forEach(b => {
      if(b.length > maxLength) {
        maxLength = b.length;
        longestReceivedBlockchains = [b];
      } else if(b.length === maxLength) {
        longestReceivedBlockchains.push(b);
      }
    })

    const differentBlockchains: Block[][] = [];
    const differentBlockchainIdentificators: number[] = [];
    longestReceivedBlockchains.forEach(b => {
      if(b.length === 0) return;
      const h = b[maxLength - 1].getCurHash()!;
      if(!differentBlockchainIdentificators.includes(h)) {
        differentBlockchains.push(b);
        differentBlockchainIdentificators.push(h);
      }
    })

    if(differentBlockchains.length === 0) return;
    const random = Math.floor(Math.random()*differentBlockchains.length);
    this.blockchain = differentBlockchains[random];
    this.receivedBlockchains = [];
  }

  public calculateCurrentBalance = () => {
    let balance = 0;
    this.blockchain.forEach(b => {
      if(b.getSender() === this.name)
        balance -= b.getAmount();
      if(b.getReceiver() === this.name)
        balance += b.getAmount();
      if(b.getMiner() === this.name)
        balance += b.getReward()!;
    })
    return balance;
  }
}