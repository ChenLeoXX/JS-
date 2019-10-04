// 要求将字符串倒转
// 要点：数组和字符串直接的转换，和数组reverse方法的使用
function reverseString(str) {
    str = str.split("").reverse().join('')
    return str;
}

reverseString("hello");
