var searchedIndex = null

function clearAndRedraw() {
    frameRate(1)
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
    insertTableButton.position(insertTableInput.x + insertTableInput.width, insertTableInput.y + 3)
    insertTableButton.mousePressed(() => {
        searchedIndex = null
        const key = insertTableInput.value()
        if (key) {
            try {
                linear.insert(key)
                console.log(`${key} inserted!`)
                clearAndRedraw()
            } catch (error) {
                console.error(error)
                // alert(error)
                modalPopUp(error)

            }
            insertTableInput.value('')
        }
    })
    searchTableInput = createInput()
    searchTableInput.position(insertTableInput.x, insertTableInput.y + insertTableInput.height + 3)
    searchTableInput.attribute('placeholder', 'Search Key')
    searchTableButton = createButton('Search')
    searchTableButton.position(searchTableInput.x + searchTableInput.width, searchTableInput.y + 3)
    searchTableButton.mousePressed(() => {
        searchedIndex = null
        const key = searchTableInput.value()
        if (key) {
            try {
                linear.search(key)
                // console.log(searchedIndex)
            } catch (error) {
                searchedIndex = null
                clearAndRedraw()
                console.error(error)
                // alert(error)
                modalPopUp(error)
            }
            searchTableInput.value('')
        }
    })
    deleteTableInput = createInput()
    deleteTableInput.position(searchTableInput.x, searchTableInput.y + searchTableInput.height + 3)
    deleteTableInput.attribute('placeholder', 'Delete Key')
    deleteTableButton = createButton('Delete')
    deleteTableButton.position(deleteTableInput.x + deleteTableInput.width, deleteTableInput.y + 3)
    deleteTableButton.mousePressed(() => {
        searchedIndex = null
        const key = deleteTableInput.value()
        if (key) {
            try {
                linear.delete(key)
                console.log(`${key} deleted`)
            } catch (error) {
                searchedIndex = null
                clearAndRedraw()
                console.error(error)
                // alert(error)
                modalPopUp(error)
            }
            deleteTableInput.value('')
        }
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
        x: deleteTableInput.x + 20 + (displayWidth / linear.tableSize) * index,
        // y: deleteTableInput.y + deleteTableInput.height + 50
        y: windowHeight / 2.25
    })
}