import { Block } from "./Block"

export class Wallet {
  private name: string
  private address: string
  private balance: number
  private blockchain: Block[]
  private isMining: boolean
  private isBlockchainShown: boolean

  constructor(
    name: string,
    address: string,
    balance: number,
    blockchain: Block[],
    isMining: boolean,
  ) {
    this.name = name
    this.address = address
    this.balance = balance
    this.blockchain = blockchain
    this.isMining = isMining
    this.isBlockchainShown = false
  }

  public getName = () => this.name
  public getAddress = () => this.address
  public getBalance = () => this.balance
  public getBlockchain = () => this.blockchain
  public getIsMining = () => this.isMining
  public getIsBlockchainShown = () => this.isBlockchainShown

  public startMining = () => this.isMining = true
  public stopMining = () => this.isMining = false
  public showBlockchain = () => this.isBlockchainShown = true
  public hideBlockchain = () => this.isBlockchainShown = false
}