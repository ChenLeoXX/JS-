/*
  要求：
  如果给定的字符串是回文，返回true，反之，返回false。
  palindrome(回文)是指一个字符串忽略标点符号、大小写和空格，正着读和反着读一模一样。
  函数参数的值可以为"racecar"，"RaceCar"和"race CAR"。
  使用知识点：
  String.prototype.replace()
  String.prototype.toLowerCase()
*/

function palindrome(str) {
    let font = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase() //正则匹配，替换特殊字符
    return font.split('').reverse().join('') === font
}

palindrome("eye")//true
palindrome("almostomla")//false
palindrome("0_0 (: /-\ :) 0-0")//true