function fallten(arr) {//数组展开
  return arr.reduce((init,cur,index)=>{
    return init.concat(Array.isArray(cur)? fallten(cur) : cur)
  },[])
  }
  
  largestOfFour([[4, [5, 1], 3], [13, [27, 18, 26]], [32, 35, 37, 39], [1000, 1001, 857, 1]]);


  function largestOfFour(arr) {//数组中小数组最大值组成的数组.
    return arr.map((item)=>{
      return Math.max(...item)
    })
    }
    
    largestOfFour([[4, 5, 1, 3], [13, 27, 18, 26], [32, 35, 37, 39], [1000, 1001, 857, 1]]);