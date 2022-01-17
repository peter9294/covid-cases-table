//compare function
function compare(direction, type) {
    function ascending(a, b) {
        if (a[type] > b[type]) {
            return 1
        }
        else if (a[type] < b[type]) {
            return -1
        }
        return 0
    }
    function decending(a, b) {
        if (a[type] > b[type]) {
            return -1
        }
        else if (a[type] < b[type]) {
            return 1
        }
        return 0
    }

    if (direction === "ascending") {
        return ascending
    }
    else if (direction === "decending") {
        return decending
    }
}

export default compare
