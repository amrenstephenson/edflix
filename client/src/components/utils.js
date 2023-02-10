const changeNum = (num) => {
    num = Number(num)
    if (num === "NaN") return null
    let count = String(num).split('.')[1]
    if (count > 5) {
        return Math.ceil(num)
    } else {
        return Number(String(num).split('.')[0] + '.5')
    }
}

export { changeNum }