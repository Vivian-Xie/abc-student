var arr = [
    {'name':'小红'},
    {'name':'小明'},
    {'name':'小李'},
    {'name':'小吴'},
    {'name':'小张'}
]
console.log(arr)
arr = arr.filter(function(x) {
    return x.name !== '小明'
})
console.log(arr)