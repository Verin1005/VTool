export function checkNumber(value) {
  const re = /^[1-9]\d*$/; //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/
  if (!re.test(value)) {
    return false;
  }
  return true;
}
