function confirmEnding(str, target) { //判断结尾指定字符
   let length = target.length
  return str.substr(-length) === target
  }
  
  confirmEnding("Bastian", "n");

  function repeat(str, num) {//重复字符串,或者使用ES6 repeat api
     while(num>0){
      str= str.concat(str)
      num--
     }
    return str;
  }
    
    repeat("abc", 3);

  function truncate(str, num) {
      if(str.length >3){
        return str.slice(0,num-3) +'...'
      }else{
        return str.slice(0,num) + '...'
      }
     }
     
     truncate("A-tisket a-tasket A green and yellow basket", 11);
