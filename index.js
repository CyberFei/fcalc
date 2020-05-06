// 运算符
const operators = ["+", "-", "*", "/", "(", ")"];
// 运算符优先级
const priority = {
  ")": 30,
  "*": 20,
  "/": 20,
  "+": 10,
  "-": 10,
  "(": 0,
};
// 获取小数点位数
const calcPos = (num) =>
  num.toString().indexOf(".") > -1 ? num.toString().split(".")[1].length : 0;
// 忽略小数点转为整数
const parseNum = (num) => parseInt(num.toString().replace(".", ""));

export default {
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
  },
  // 表达式计算
  calc: (expression) => {
    // 转化为表达式数组
    operators.map((op) => (expression = expression.split(op).join(`,${op},`)));
    const eArr = expression.split(",").filter((item) => item !== "");

    // 中缀转后缀
    let ops = [];
    let result = [];
    for (let item of eArr) {
      // 是操作符
      if (operators.includes(item)) {
        // 操作符栈为空 直接入栈
        if (ops.length === 0) ops.push(item);
        else {
          // 左括号 直接入栈
          if (item === "(") ops.push(item);
          // 右括号 匹配括号
          else if (item === ")") {
            let top = ops.pop();
            while (top !== "(") {
              result.push(top);
              top = ops.pop();
            }
          }
          // 加减乘除
          else {
            if (priority[item] > priority[ops[ops.length - 1]]) ops.push(item);
            else {
              while (
                ops.length > 0 &&
                priority[item] <= priority[ops[ops.length - 1]]
              ) {
                let top = ops.pop();
                result.push(top);
              }
              ops.push(item);
            }
          }
        }
      }
      // 是数字
      else {
        result.push(item);
      }
    }
    // 多余运算符推入结果栈
    while (ops.length > 0) result.push(ops.pop());

    // 后缀表达式计算
    let nums = [];
    // let r = 0;
    for (let item of result) {
      // 是运算符
      if (operators.includes(item)) {
        let num2 = nums.pop();
        let num1 = nums.pop();
        if (item === "+") nums.push(FC._add(num1, num2));
        if (item === "-") nums.push(FC._sub(num1, num2));
        if (item === "*") nums.push(FC._mul(num1, num2));
        if (item === "/") nums.push(FC._div(num1, num2));
      } else {
        nums.push(item);
      }
    }
    return nums[0];
  },
};
