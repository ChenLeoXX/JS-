/* 
 二分查找：
  特点： 
  用来查找一个已经排序好的数组中的特定值，找到后返回它的位置。
  思路： 
  确定一个 midIndex 中间索引， 一个startIndex起始索引 （默认0）， 一个终止索引endIndex（如果起始位置是0的话，是len - 1）
  通过迭代的方式，来迭代数组（while）
  @parames nums<Array> 排序后的数组
  @parames target<Number> 目标值
  @returns  index <Number> 目标值索引
*/
function binarySearch(nums,target){
  //入参异常判断
 if(!Array.isArray(nums) || nums.length === 0) return -1
 let startIndex = 0
 let endIndex = nums.length - 1
 //终止条件，如果两个元素相邻那么停止迭代
 while(startIndex + 1 < endIndex){
   //  mid 取值向下取整，同时注意不超过最大值
    let mid = Math.floor(startIndex + (endIndex - startIndex)/2)
    if(nums[mid] < target){
      startIndex = mid
    }else{
      endIndex = mid
    }
 }
 if(nums[startIndex] === target){
   return startIndex
 }
 if(nums[endIndex] === target){
   return endIndex
 }
return -1  
}
var arr = [1,2,3,4,7,9,11,22,56] 
binarySearch(arr,9) //output 5