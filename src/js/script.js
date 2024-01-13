const rootView = document.getElementById('root-view')
const nextShape = document.getElementById('next-shape')
const playerScore = document.getElementById('player-score')
const startBtn = document.getElementById('start-btn')
const btnImg = document.getElementById('btn-img')

// Img control btns
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const downBtn = document.getElementById('down')
const rotateBtn = document.getElementById('rotate')




// Core Value 
let rowContainer = []
let scoreCount = 0
const width = 10

// Creats 200 divs inside the root-view div
for(let i = 0; i < 210; i++) {
    const rootViewBlock = document.createElement('div')

    if(i > 199) {
        rootViewBlock.classList.add('freeze-div')
    }else {
        rootViewBlock.classList.add('block-div')
    }
    
    rootView.appendChild(rootViewBlock)
}
let blocks = Array.from(rootView.querySelectorAll('div'))

// Creates an array containing array of the blocks index number
for(let i = 0; i < 200; i+= width) {
    let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    rowContainer.push(row)
}

// Creats 16 divs inside the next-shape div
for(let i = 0; i < 16; i++) {
    const nextShapeblock = document.createElement('div')
    nextShapeblock.classList.add('block-div')
    nextShape.appendChild(nextShapeblock)
}

// Rought code
// count = 0
// for(let i = 0; i < 200; i++){
//     blocks[i].textContent = count
//     count++
// }


let continueGame = true


// Each shape with there rotation
let iShape = [
    [0, 1, 2, 3],
    [0, width, width*2, width*3],
    [0, 1, 2, 3],
    [0, width, width*2, width*3],
]
let lShape = [
    [0, 1, 2, width],
    [0, 1, width+1, width*2+1],
    [width, width+1, width+2, 2],
    [0, width, width*2, width*2+1],
]
let jShape = [
    [0, 1, 2, width+2],
    [1, width+1, width*2+1, width*2],
    [0, width, width+1, width+2],
    [0, 1, width, width*2],
]
let oShape = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
]
let sShape = [
    [1, 2, width, width+1],
    [0, width, width+1, width*2+1],
    [1, 2, width, width+1],
    [0, width, width+1, width*2+1],
]
let tShape = [
    [1, width,width+1,width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2,width*2+1],
    [1, width, width+1, width*2+1]
]
let zShape = [
    [0, 1, width+1, width+2],
    [1, width+1, width, width*2],
    [0, 1, width+1, width+2],
    [0, width, width+1, width*2+1],
]


// An Array for all shapes with there rotation
const theShapes = [iShape, lShape, jShape, oShape, sShape, tShape, zShape]

// Colors for the shapes
const shapeColors = ['#00ffff', '#0000ff', '#ff7f00', '#ffff00', '#00ff00', '#800080', '#ff0000']


let currentPosition = 3
let currentRotation = 0

// Random selecting blocks
let random = Math.floor(Math.random() * theShapes.length) // gives a random no. between 0-6
let currentShape = theShapes[random][currentRotation]



// Draw the block function
function draw() {
    currentShape.forEach(index => {
        blocks[currentPosition + index].style.backgroundColor = shapeColors[random]
    })
}
draw()

// if(rowContainer[0].some(index => blocks[index].classList.contains('freeze-div'))){
//     console.log('hello')
// }

// Erase the block function
function erase() {
    currentShape.forEach(index => {
        blocks[currentPosition + index].style.backgroundColor = ''
    })
}

// block movement function
function moveDown() {
    erase()
    currentPosition += width
    draw()
    freezeShape()
}
var gameExecution = setInterval(moveDown, 1000)

// Stop the shape at the bottom layer of the root-view div
function freezeShape() {
    if(currentShape.some(index => blocks[currentPosition + index + width].classList.contains('freeze-div'))) {
        currentShape.forEach(index => {
            blocks[currentPosition + index].classList.add('freeze-div')
        })

        // Start new shape
        random = Math.floor(Math.random()*theShapes.length)
        currentRotation = 0
        currentShape = theShapes[random][currentRotation]
        currentPosition = 3

        draw()
        gameOver()
        updateScore()
    }
}

// Shape control function
function control(e) {
    if(e.keyCode === 37) {
        moveLeft()
    }else if(e.keyCode === 39) {
        moveRight()
    }else if(e.keyCode === 40) {
        moveDown()
    }else if(e.keyCode === 32 || e.keyCode === 13) {
        rotateShape()
    }
}
window.addEventListener('keydown', control)

// Image control Assigning function
leftBtn.addEventListener('click', moveLeft)
rightBtn.addEventListener('click', moveRight)
downBtn.addEventListener('click', moveDown)
rotateBtn.addEventListener('click', rotateShape)


// shape left move function
function moveLeft() {
    erase()

    let blockLeft = currentShape.some(index => (currentPosition + index)%width===0)
    let blockLeftMovement = currentShape.some(index => blocks[currentPosition + (index - 1)].classList.contains('freeze-div'))
    let blockDownMovement = currentShape.some(index => blocks[currentPosition + (index + width)].classList.contains('freeze-div'))
    if(!blockLeft && !blockLeftMovement && !blockDownMovement) {
        currentPosition--
    }
    
    draw()
}

// shape right move function
function moveRight() {
    erase()

    let blockRight = currentShape.some(index => (currentPosition + index)%width===width-1)
    let blockRightMovement = currentShape.some(index => blocks[currentPosition + (index + 1)].classList.contains('freeze-div'))
    let blockDownMovement = currentShape.some(index => blocks[currentPosition + (index + width)].classList.contains('freeze-div'))
    if(!blockRight && !blockRightMovement && !blockDownMovement) {
        currentPosition++
    }
    
    draw()
}

// Shape rotation function
function rotateShape() {
    erase()
    currentRotation++ // rotation serial: 0-1-2-3-0-1-2-3
    if(currentRotation === 4) {
        currentRotation = 0
    }
    currentShape = theShapes[random][currentRotation]
    draw()
}

// Game flow function for starting and pausing the game
function gameFlow() {
    if(gameExecution) {
        clearInterval(gameExecution)
        gameExecution = null
        btnImg.src = './src/img/play.png'
    }else {
        draw()
        gameExecution = setInterval(moveDown, 1000)
        btnImg.src = './src/img/pause.png'
    }
}
startBtn.addEventListener('click', gameFlow)

// Game over function
function gameOver() {
    if(currentShape.some(index => blocks[currentPosition + index].classList.contains('freeze-div'))){
        playerScore.innerHTML = 'Game <br> Over'
        continueGame = false
        clearInterval(gameExecution)
    }
}

// Score Updating function
function updateScore() {
    for(let i = 0; i < rowContainer.length; i++){
        if(rowContainer[i].every(index => blocks[index].classList.contains('freeze-div'))){
            scoreCount++
            playerScore.textContent = `Score: ${scoreCount}`

            // Remove the filled row
            rowContainer[i].forEach(index => {
                blocks[index].classList.remove('freeze-div')
                blocks[index].style.backgroundColor = ''
            })
            const removedBlock = blocks.splice(i*width, width)
            blocks = removedBlock.concat(blocks)
            blocks.forEach(block => rootView.appendChild(block))
        }
    }
}

