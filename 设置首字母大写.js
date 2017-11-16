/*
要求：返回一个字符串,确保字符串的每个单词首字母都大写，其余部分小写。
*/
// 解法一： map()+正则匹配 + String.prototype.replace()
function titleCase(str) {
  let arr = str.toLowerCase().split(' ') //小写转换数组形式
  str = arr.map(function (it, i) {
    return arr[i].replace(/\w{1}/, arr[i].match(/\w{1}/)[0].toUpperCase())
  })
  str = str.join(' ')
  return str;
}
titleCase("I'm a little tea pot") //"I'm A Little Tea Pot"
titleCase("HERE IS MY HANDLE HERE IS MY SPOUT") //"Here Is My Handle Here Is My Spout"

//解法二： charAt()确定位置 + replace()替换
function titleCase(str) {
  var arr = str.toLowerCase().split(" ");
  var i = 0;
  for (; i < arr.length; i++) {
    var Up = arr[i].charAt(0).toUpperCase();
    arr[i] = arr[i].replace(arr[i].charAt(0), Up);
  }
  return arr.join(" ");
}