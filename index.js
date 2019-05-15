// 获取小数点位数
let calcPos = num =>
  num.toString().indexOf(".") > -1 ? num.toString().split(".")[1].length : 0;
// 忽略小数点转为整数
let parseNum = num => parseInt(num.toString().replace(".", ""));

let FC = {
  // 加
  _add: (n1, n2) => {
    let p1 = calcPos(n1),
      p2 = calcPos(n2);
    let m = Math.pow(10, Math.max(p1, p2));
    return (FC._mul(n1, m) + FC._mul(n2, m)) / m;
  },
  add: (...nums) => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) result = FC._add(result, nums[i]);
    return result;
  },
  // 减
  _sub: (n1, n2) => FC.add(n1, -n2),
  sub: (...nums) => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) result = FC._sub(result, nums[i]);
    return result;
  },
  // 乘
  _mul: (n1, n2) => {
    let p1 = calcPos(n1),
      p2 = calcPos(n2);
    let m = Math.pow(10, p1 + p2);
    return (parseNum(n1) * parseNum(n2)) / m;
  },
  mul: (...nums) => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) result = FC._mul(result, nums[i]);
    return result;
  },
  // 除
  _div: (n1, n2) => {
    let p1 = calcPos(n1),
      p2 = calcPos(n2);
    let m = Math.pow(10, p2 - p1);
    return FC.mul(parseNum(n1) / parseNum(n2), m);
  },
  div: (...nums) => {
    let result = nums[0];
    for (let i = 1; i < nums.length; i++) result = FC._div(result, nums[i]);
    return result;
  }
};

export default FC;
