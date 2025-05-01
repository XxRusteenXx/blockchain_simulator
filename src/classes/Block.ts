import { hash } from "../utils/HashFunction";

export class Block {
  private static readonly REWARD_DECREASE_STEP = 10;
  private static readonly MAX_REWARD = 100;
  private id: number
  private prevHash: number
  private curHash: number | null
  private sender: string
  private receiver: string
  private amount: number
  private fee: number
  private reward: number
  private key: number | null

  constructor(
    id: number,
    prevHash: number,
    sender: string,
    receiver: string,
    amount: number,
    fee: number,
    key: number | null
  ) {
    this.id = id
    this.prevHash = prevHash
    this.sender = sender
    this.receiver = receiver
    this.amount = amount
    this.fee = fee
    this.key = key
    this.curHash = null
    this.reward = Block.calculateReward(id);
  }

  public getId = () => this.id;
  public getPrevHash = () => this.prevHash;
  public getCurHash = () => this.curHash;
  public getSender = () => this.sender;
  public getReceiver = () => this.receiver;
  public getAmount = () => this.amount;
  public getFee = () => this.fee;
  public getReward = () => this.reward;
  public getKey = () => this.key;

  public static calculateCurHash = (
    block: Block,
    key: number | null
  ) => {
    const result = hash(block, key);
    return result;
  }

  public static verifyWork = (block: Block) => {
    const result = Block.calculateCurHash(block, block.getKey());
    if (result === -1) return false;
    if (result <= 26) return true;
    return false;
  }

  public static calculateReward = (id: number) => {
    let k = Math.floor(id / Block.REWARD_DECREASE_STEP);
    let reward = Block.MAX_REWARD / (2**k);
    if (reward < 1) return 0;
    return reward;
  }
}