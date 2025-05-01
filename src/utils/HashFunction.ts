import { Block } from "../classes/Block"

export const hash = (block: Block, key: number | null) => {
  if (key === null) return -1;
  let h = 0;
  h += block.getId();
  h += block.getAmount();
  h += block.getFee();
  h += block.getReward();
  h += block.getPrevHash();
  h += convertStrToNumber(block.getSender());
  h += convertStrToNumber(block.getReceiver());
  h += key;

  const hash = h % 256;
  return hash;
}

const convertStrToNumber = (str: string) => {
  let n = 0;
  for(let i = 0; i < str.length; i++) {
    n += str.charCodeAt(i);
  }
  return n;
}