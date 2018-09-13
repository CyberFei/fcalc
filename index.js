var calcPos = num => num.toString().indexOf(".") > -1 ? num.toString().split(".")[1].length : 0;
var parseNum = num => parseInt(num.toString().replace(".", ""));

export default {
  // 加
  add: (n1, n2) => {
    var p1 = calcPos(n1), p2 = calcPos(n2);
    var m = Math.pow(10, Math.max(p1, p2));
    return (n1 * m + n2 * m) / m;
  },
  // 减
  sub: (n1, n2) => FCU.add(n1, -n2),
  // 乘
  mul: (n1, n2) => {
    var p1 = calcPos(n1), p2 = calcPos(n2);
    var m = Math.pow(10, p1 + p2);
    return parseNum(n1) * parseNum(n2) / m;
  },
  // 除
  div: (n1, n2) => {
    var p1 = calcPos(n1), p2 = calcPos(n2);
    var m = Math.pow(10, p2 - p1);
    return FCU.mul(parseNum(n1) / parseNum(n2), m);
  }
};
