function bubbleSort(arr) {
    let len = arr.length - 1
    let temp
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
}

function quickSort(arr) {
    let len = arr.length - 1

    function exchange(arr, i, j) {
        let bus = arr[i]
        arr[i] = arr[j]
        arr[j] = bus
    }

    function partition(arr, leftIndex, pivotIndex) {
        let storeIndex = leftIndex //记录中心轴最终的位置
        let pivotValue = arr[pivotIndex]
        for (let i = leftIndex; i < len; i++) {
            if (arr[i] < pivotValue) {
                exchange(arr, storeIndex, i)
                storeIndex++
            }
        }
        exchange(arr, storeIndex, pivotIndex)
        return storeIndex
    }

    function sort(arr, leftIndex, pivotIndex) {
        if (leftIndex > pivotIndex) return
        let storeIndex = partition(arr, leftIndex, pivotIndex)
        sort(arr, leftIndex, storeIndex - 1)
        sort(arr, storeIndex + 1, len)
    }

    let pivotIndex = Math.floor(Math.random() * (len - 1) + 1)
    sort(arr, 0, pivotIndex)
    return arr
}