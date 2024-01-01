const rootBlock = document.querySelector('.root-block')

// Creats 200 divs inside the root-block div
for(let i = 0; i < 200; i++) {
    const rootBlockDiv = document.createElement('div')
    rootBlockDiv.classList.add('root-block-div')
    rootBlock.appendChild(rootBlockDiv)
}


