/*
 寻找最长的单词算法挑战:
 要求：返回提供的句子中最长的单词的长度。
       返回值应该是一个数字。
 可能使用的知识点：
String.prototype.split()
String.length
*/ 
// 解法一：apply
function findLongestWord(str) {
  let longArr = str.split(' ') //字符串转换为数组
 let numArr = longArr.map(function(it){ //将数字内字符串的长度，组成一个新数组
    return it.length
})
 let maxVal = Math.max.apply(numArr,numArr)//利用apply计算数组内的最大值
 return maxVal
 }
 findLongestWord("The quick brown fox jumped over the lazy dog");

//  解法二：设置最大值直接比较
function findLongestWord(str) {
  let longArr = str.split(' ')
  let maxVal = 0
  for(let i=0;i<longArr.length;i++){
      if(longArr[i].length > maxVal){
          maxVal = longArr[i].length
      }
  }
  return maxVal
 }
 findLongestWord("The quick brown fox jumped over the lazy dog");