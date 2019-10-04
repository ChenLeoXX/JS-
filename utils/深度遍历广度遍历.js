//深度优先遍历
function deepFirst(root) {
    let {childNode} = root
    root && console.log(root.tagName)
    Array.prototype.filter.call(childNode, el => el.tagName).forEach(el => {
        deepFirst(el)
    })
}

//广度优先遍历
function rangeFirst(root) {
    let queue = [root]
    while (queue.length) {
        let {childNodes, tagName} = queue.shift()
        tagName && console.log(tagName)
        Array.prototype.filter.call(childNodes, el => el.tagName).forEach(el => {
            queue.push(el)
        })
    }

}