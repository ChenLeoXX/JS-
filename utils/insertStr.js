/* 
 实现一个函数，在指定字符串位置插入目标字符
 @parames  str <String> 完整字符串
 @parames  insert <String>  要插入的字符串
 @parames  target <String> 字符串要插入的位置
 @returns  <String> 插入后的字符串
*/
function insertStr(str,target,insert){
 let index = str.search(target) 
 let char = str.substr(0,index)
 return str.replace(char, char+insert)
}
let str = 'As we know, the github is the bigest social platform of Same-sex '
