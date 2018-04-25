/* 
   处理JS中小数精度问题：
     因为JS中浮点数 加减乘除存在 误差 比如： 0.1+0.2 = 0.3000000000000004,这是语言的缺陷，所以我们从结果入手
     对结果进行四舍五入，保证精度。 通过Math.round() 四舍五入 和 Math.pow() 处理保留小数个数 
     @parames  flo_num <Number> 要处理的小数
     @parames  n  <Number> 保留小数点后 n 位
     @return  处理过后的小数
*/
function roundFloat(flo_num,n){
 return Math.round(flo_num * Math.pow(10,n))/ Math.pow(10,n)  
}