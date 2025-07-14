import { Block } from "../classes/Block"

export const hash = (block: Block, key: string | null) => {
  if (key === null) return -1;
  let h = 0;
  h += block.getAmount();
  h += block.getFee();
  h += block.getPrevHash();
  h += convertStrToNumber(block.getSender());
  h += convertStrToNumber(block.getReceiver());
  h += convertStrToNumber(key);

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