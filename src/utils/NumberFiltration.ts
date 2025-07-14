export const numberFiltration = (str: string) => {
  let filtered = [];
  for(let i = 0; i < str.length; i++) {
    if(
      str[i] === '0' ||
      str[i] === '1' ||
      str[i] === '2' ||
      str[i] === '3' ||
      str[i] === '4' ||
      str[i] === '5' ||
      str[i] === '6' ||
      str[i] === '7' ||
      str[i] === '8' ||
      str[i] === '9'
    )
      filtered[filtered.length] = str[i];
  }
  
  let result = 0;
  for(let i = 0; i < filtered.length; i++) {
    result = result * 10 + Number(filtered[i]);
  }
  return result;
}