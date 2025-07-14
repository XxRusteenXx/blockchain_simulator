import { VALID_KEY_RANGE } from "../const/Const";
import { hash } from "../utils/HashFunction";

export class Block {
  private static readonly REWARD_DECREASE_STEP = 10;
  private static readonly MAX_REWARD = 100;
  private id: number
  private prevHash: number
  private curHash: number
  private sender: string
  private receiver: string
  private amount: number
  private fee: number
  private reward: number | null
  private key: string | null
  private miner: string | null

  constructor(
    prevHash: number,
    sender: string,
    receiver: string,
    amount: number,
    fee: number,
    key: string | null
  ) {
    this.prevHash = prevHash
    this.sender = sender
    this.receiver = receiver
    this.amount = amount
    this.fee = fee
    this.key = key
    this.id = -1;
    this.curHash = -1
    this.reward = null
    this.miner = null
    // I think the reward should be calculated after being mined
    // this.reward = Block.calculateReward(id);
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
  public getMiner = () => this.miner;

  public setId = (id: number) => this.id = id;
  public setKey = (key: string | null) => this.key = key;
  public setMiner = (miner: string) => this.miner = miner;
  public setReward = (reward: number) => this.reward = reward;
  public setPrevHash = (prevHash: number) => this.prevHash = prevHash;
  public setCurHash = (curHash: number) => this.curHash = curHash;

  public static calculateCurHash = (
    block: Block,
    key: string | null
  ) => {
    const result = hash(block, key);
    return result;
  }

  public static verifyWork = (block: Block) => {
    const result = Block.calculateCurHash(block, block.getKey());
    if (result === -1) return false;
    if (result <= VALID_KEY_RANGE) {
      block.setCurHash(result);
      return true
    };
    return false;
  }

  public static calculateReward = (id: number) => {
    let k = Math.floor(id / Block.REWARD_DECREASE_STEP);
    let reward = Block.MAX_REWARD / (2**k);
    if (reward < 1) return 0;
    return reward;
  }
}