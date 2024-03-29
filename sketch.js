let searchedIndex = null

function clearAndRedraw() {
    clear()
    redraw()
}

function modalPopUp(error) {
    const modelBody = document.querySelector('#model-body')
    modelBody.querySelector('p').innerText = error
    $('#errorModel').modal()
}

function setup() {
    createCanvas(displayWidth, windowHeight)
    linear = new LinearHashing()

    insertTableInput = createInput()
    insertTableInput.position(20, 90)
    insertTableInput.attribute('placeholder', 'Insert Key')
    insertTableButton = createButton('Insert')
    insertTableButton.position(insertTableInput.x + insertTableInput.width + 3, insertTableInput.y - 1)
    insertTableButton.addClass('btn btn-primary')
    insertTableButton.mousePressed(() => {
        searchedIndex = null
        const key = insertTableInput.value()
        if (key) {
            try {
                linear.insert(key)
                console.log(`${key} inserted!`)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            insertTableInput.value('')
        }
        clearAndRedraw()
    })
    searchTableInput = createInput()
    searchTableInput.position(insertTableInput.x, insertTableInput.y + insertTableInput.height + 8)
    searchTableInput.attribute('placeholder', 'Search Key')
    searchTableButton = createButton('Search')
    searchTableButton.position(searchTableInput.x + searchTableInput.width + 3, searchTableInput.y - 1)
    searchTableButton.addClass('btn btn-primary')
    searchTableButton.mousePressed(() => {
        searchedIndex = null
        const key = searchTableInput.value()
        if (key) {
            try {
                searchedIndex = linear.search(key)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            searchTableInput.value('')
        }
        clearAndRedraw()
    })
    deleteTableInput = createInput()
    deleteTableInput.position(searchTableInput.x, searchTableInput.y + searchTableInput.height + 8)
    deleteTableInput.attribute('placeholder', 'Delete Key')
    deleteTableButton = createButton('Delete')
    deleteTableButton.position(deleteTableInput.x + deleteTableInput.width + 3, deleteTableInput.y - 1)
    deleteTableButton.addClass('btn btn-primary')
    deleteTableButton.mousePressed(() => {
        searchedIndex = null
        const key = deleteTableInput.value()
        if (key) {
            try {
                linear.delete(key)
                console.log(`${key} deleted`)
            } catch (error) {
                console.error(error)
                modalPopUp(error)
            }
            deleteTableInput.value('')
        }
        clearAndRedraw()
    })
    textAlign(CENTER, CENTER)
    textSize(30)
    ellipseMode(CENTER)
    strokeWeight(3)
    noLoop()
}

function draw() {
    for (let i = 0; i < linear.tableSize; ++i) {
        let key = linear.hashTable[i]
        if (key === null) {
            key = "DEL"
            fill('orange')
        }
        c = getCirclePosition(i)
        if (key !== undefined)
            stroke('orange')
        if (searchedIndex === i)
            stroke('blue')
        circle(c.x, c.y, 70)
        if (key !== undefined) {
            if (key == "DEL")
                fill(255)
            else if (i === searchedIndex)
                fill('blue')
            else
                fill('orange')
            text(key, c.x, c.y)
            fill(255)
            stroke('black')
        }
    }
}

function getCirclePosition(index) {
    return Object.freeze({
        x: deleteTableInput.x + 30 + (displayWidth / linear.tableSize) * index,
        // y: deleteTableInput.y + deleteTableInput.height + 50
        y: windowHeight / 2.25
    })
}