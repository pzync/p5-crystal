
let PALETTE = []

// Here's where we define all globals within a single object initState
// We can just tweak the property values here to play with our crystal
const initState = {   
  CRYSTAL_SIZE: 160,
  SIDES: 6,
  STEPS_OUT: 8,
  THIN_STROKE: 1,
  THICK_STROKE: 3
}

//layout
const ROWS = 3
const COLUMNS = 3
const MARGIN = initState.CRYSTAL_SIZE / 2
const PADDING = initState.CRYSTAL_SIZE * 0.2
const GRIDBOX = initState.CRYSTAL_SIZE + PADDING


function setup() {
  const totalX = (MARGIN*2) + COLUMNS * GRIDBOX
  const totalY = (MARGIN*2) + ROWS * GRIDBOX
  createCanvas(totalX, totalY, SVG)
  
  angleMode(DEGREES)
  rectMode(CENTER)
  noLoop()
  PALETTE = [
    color(255, 52, 154), // pink
    color(4, 0, 152)     // blue
  ]
}


// const allCrystals = []
// const crystalPos = []

function draw() {
  // const crystal = Crystal({x: width/2, y: height/2})
  // crystal.render()

  for(let x = 0; x < COLUMNS; x++){
    for(let y = 0; y < ROWS; y++){
      const posX = MARGIN*2 + (x * GRIDBOX)
      const posY = MARGIN*2 + (y * GRIDBOX)
      
      // crystalPos.push({ x: posX, y: posY})
      Crystal().render({x:posX, y:posY})
      // allCrystals.push(Crystal())
    }
  }

  // allCrystals.map((crystal, index) => {
  //     crystal.render(crystalPos[index])
  // })

}