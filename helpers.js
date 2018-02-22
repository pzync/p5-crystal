
// function to draw a hexagon
// refer to: https://p5js.org/examples/form-regular-polygon.html
const hexagon = (posX, posY, radius)  => {
  const rotationAngle = 360 / 6
  beginShape()
    for(let i = 0; i < 6; i++){
      const thisVertex = pointOnCircle(posX, posY, radius, i * rotationAngle)
      vertex(thisVertex.x, thisVertex.y)
    }
  endShape(CLOSE)
}

// function to find the vertex points for a polygon 
// this part could be directly written within the hexagon function as well
const pointOnCircle = (posX, posY, radius, angle) => {
  const x = posX + radius * cos(angle)
  const y = posX + radius * sin(angle)
  return createVector(x, y)
}

// return true or false randomly with equal probability
const randomSelectTwo = () => {
  const randomNum = random(1)
  return (randomNum > 0.5) ? true : false
}

// return a random color from the PALETTE array
const getRandomFromPalette = () => {
  const randomIndex = floor(random(0, PALETTE.length))
  return PALETTE[randomIndex]
}


const myTriangle = (center, radius, direction) => {
  if (direction){
    beginShape()
      vertex(center + radius * cos(0), radius * sin(0))
      vertex(center + radius * cos(120), radius * sin(120))
      vertex(center + radius * cos(240), radius * sin(240))
    endShape(CLOSE)
  } else {
    beginShape()
      vertex(center + radius * cos(60), radius * sin(60))
      vertex(center + radius * cos(180), radius * sin(180))
      vertex(center + radius * cos(300), radius * sin(300))
    endShape(CLOSE)
  }
}

// function testLines(){
//   // randomize the no of shape-sides : either 6 or 12
//   let numShapes = randomSelectTwo() ? SIDES : SIDES * 2

//   // randomize the stroke color chosen from PALETTE
//   const strokeColor = getRandomFromPalette()

//   // draw the circle and guiding lines
//   noFill()
//   stroke(PALETTE[0])
//   push()
//     translate(width/2, height/2)
//     ellipse(0, 0, CRYSTAL_SIZE, CRYSTAL_SIZE)
    
//     stroke(strokeColor)
//     const angle = 360/numShapes
//     for(let i = 0; i < numShapes; i++){
//       line(0, 0, 0, CRYSTAL_SIZE/2)
//       rotate(angle)
//     }   
//   pop()
// }


