// 写一个阶乘函数 !5 = 5*4*3*2*1  0的阶乘是1
// 解法一： 尾递归，在函数尾部调用自己减少内存占用
function factorialize(num,total=1) {
  if(num ===0) return 1
  if(num ===1) return total
  return factorialize(num-1,total*num)
 }
 factorialize(5);

//  解法二： 递归调用
// 调用栈过长，先调用后执行，内存占用大。
function factor(num){
  if(num===0) return 1
  return  num * factor(num-1)
}
factor(5)