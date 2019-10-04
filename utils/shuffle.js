/* 
  洗牌算法：打乱一个数组内元素的位置
  思路： 1. 首先取一个数组内的随机索引，从后往前洗牌，同时每次随机一次就数组就完成一个位置的洗牌，所以（len - i）
        2.  记录随机索引的值，用作前一个位置坐交换
*/
function shuffle(arr) {
    let copyArr = arr.slice(0)
    let len = arr.length
    for (let i = 0; i < len; i++) {
        //  随机选取一个数组内的索引，数组从后往前开始洗牌，每一次洗牌，数组长度就减少1
        let index = Math.floor(Math.random() * (len - i))
        let temp = copyArr[index]
        copyArr[index] = copyArr[len - i - 1]
        copyArr[len - i - 1] = temp
    }
    return copyArr
}