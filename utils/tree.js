/* 
  2018-4-30
  实现一个树级目录结构
  实现思路：递归
  @parames list <Array>  数据数组
       list = [
         {
           id:1,name:超级管理，pid:0
         }，
         {
           id:2,name:用户管理，pid:1
         }
       ]
  id:代表所有的节点的ID，pid则表示它们所属的父节点的ID，0为最高节点
  @parames pid <Number>  从哪个节点开始
  @returns  Array
*/
 const list = [
  {id: 1, name: '超级管理', parent_id: 0},
  {id: 2, name: '用户管理', parent_id: 1},
  {id: 3, name: '部门管理', parent_id: 1},
  {id: 4, name: '日志管理', parent_id: 1},
  {id: 5, name: '操作用户', parent_id: 2},
  {id: 6, name: '查看用户', parent_id: 2},
  {id: 7, name: '用户新增', parent_id: 5},
  {id: 8, name: '用户删除', parent_id: 5},
  {id: 9, name: '用户修改', parent_id: 5},
  {id: 10, name: '操控部门', parent_id: 3},
  {id: 11, name: '查看部门', parent_id: 3},
  {id: 12, name: '部门新增', parent_id: 10},
  {id: 13, name: '部门删除', parent_id: 10},
  {id: 14, name: '部门修改', parent_id: 10},
  {id: 15, name: '日志查看', parent_id: 4},
  {id: 16, name: '日志导出', parent_id: 4}
];
// 获取所有的父节点的直接 子节点： 如 { 0:[{id: 1, name: '超级管理', parent_id: 0}],1:[{id: 2, name: '用户管理', parent_id: 1}]}
function getTree(list,pid){
  let pNode = {}
  // 根据不同的pid，生成一个包含所有父节点的数组
  list.forEach((item)=>{
    // 获取父节点
    let key = item.parent_id
    if(pNode[key]){
      pNode[key].push(item)
    }else{
      pNode[key] = []
      pNode[key].push(item)
    }
  })
  return formatTree(pNode,pid)
}

// 初始化各个节点下的子节点
function formatTree(items,pid){
//  结果是一个数组组成的树形目录
  let result = []
  if(!items[pid]) return result
  // for...of 获取可遍历对象的 键值而不是for...in的键名
  for(let item of items[pid]){
    // 递归，根据自身的ID，寻找到所属的父节点
    item.children = formatTree(items,item.id)
    result.push(item)
  }
  return result
}