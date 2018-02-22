
// We create the base Layer object here
const Layer = (state) => {
  return {
    sides: state.SIDES,
    numShapes: state.SIDES,
    angle: 360 / state.SIDES,
    stepsOut: state.STEPS_OUT,
    singleStep: (state.CRYSTAL_SIZE/2) / state.STEPS_OUT,
    thinStroke: state.THIN_STROKE,
    thickStroke: state.THICK_STROKE,
    layerColor: random(1) > 0.5 ? PALETTE[0] : PALETTE[1]
  }
}


const Circles = (state) => { 
  
  // get all base Layer object properties in another variable
  // this way we can use it to make Circles object; without mutating 
  // the base Layer object above 
  const layerObj = Layer(state)
  
  // the properties specific to Circles
  const shapeDiameter = (state.CRYSTAL_SIZE/2) * 0.93
  const centerXPosition = (state.CRYSTAL_SIZE/2) - (shapeDiameter/2)
  
  // create the Circles object
  const circlesObj = {
    render: () => {
      noFill()
      strokeWeight(layerObj.thinStroke)          // we'll keep the circles light
      stroke(layerObj.layerColor)
      push()
        for(var i = 0; i < state.NUM_SHAPES; i++) {
          ellipse(centerXPosition, 0, shapeDiameter, shapeDiameter)
          rotate(layerObj.angle)
        }
      pop()
    }
  }

  // extend the base Layer object by assigning Circles properties to it and return
  // if you do Object.assign(circlesObj, layerObj) then the base Layer properties
  // will override Circles properties
  return Object.assign(layerObj, circlesObj)
}


const SimpleLines = (state) => {
  const layerObj = Layer(state) // replicate base Layer object for internal use

  // define own specific properties of SimpleLines
  const numSteps = randomSelectTwo() ? layerObj.stepsOut : int(layerObj.stepsOut * 1.25) 
  const step = (state.CRYSTAL_SIZE/2) / numSteps    // the size of each step
  const start = floor(random(0, numSteps))          // the starting step
  const stop = floor(random(start, numSteps + 1))   // the last step
  const numShapes = randomSelectTwo() ? layerObj.sides : layerObj.sides * 2
  // randomize stroke weight - either 1 or 3
  const weight = randomSelectTwo() ? layerObj.thinStroke : layerObj.thickStroke
  const angle = 360/numShapes

  // create the SimpleLines object
  const simpleLinesObj = {
    render: () => {
      noFill()
      stroke(layerObj.layerColor)
      strokeWeight(weight)
      push()
        //translate(width/2, height/2)
        for(let i = 0; i < numShapes; i++){
          line(start * step, 0, stop * step, 0)
          rotate(angle)
        }   
      pop()
    }
  }

  // return the extended object
  return Object.assign(layerObj, simpleLinesObj)
}


const OutlineShape = (state) => {
  const layerObj = Layer(state)

  const weight = randomSelectTwo() ? layerObj.thinStroke : layerObj.thickStroke
  const hexagonTrue = randomSelectTwo()

  const outlineShapeObj = {
    render: () => {
      stroke(layerObj.layerColor)
      strokeWeight(weight)
      push()
        //translate(width/2, height/2)
        if (hexagonTrue) {
          hexagon(0, 0, state.CRYSTAL_SIZE/2)
        } else {
          ellipse(0, 0, state.CRYSTAL_SIZE, state.CRYSTAL_SIZE)
        }
      pop()
    }
  }

  return Object.assign(layerObj, outlineShapeObj)
}


const DottedLines = (state) => {
  const layerObj = Layer(state)

  const numShapes = randomSelectTwo() ? layerObj.sides : layerObj.sides * 2
  const angle = 360 / numShapes
  const shapeSize = layerObj.thickStroke
  const centerOffset = layerObj.singleStep

  const dottedLinesObj = {
    render: () => {
      fill(layerObj.layerColor)
      noStroke()
      push()
        for(let i = 0; i < numShapes; i++){
          for(let x = centerOffset; x < state.CRYSTAL_SIZE/2; x += layerObj.singleStep){
            rect(x, 0, shapeSize, shapeSize)
          }
          rotate(angle)
        }
      pop()
    }
  }

  return Object.assign(layerObj, dottedLinesObj)
}


const CenteredShape = (state) => {
  const layerObj = Layer(state)

  const randomShape = random(1)
  const shapeSize = floor(random(layerObj.stepsOut / 2, layerObj.stepsOut - 2)) * layerObj.singleStep
  // shapesize is basically the radius of the shape
  // we want the shape to be of size between half crystal size to about full


  const centeredShapeObj = {
    render: () => {
      fill(layerObj.layerColor)
      noStroke()
      push()
        //translate(width/2, height/2)
        if(randomShape < 0.1){
          rect(0, 0, shapeSize * 2, shapeSize * 2)
        } else if (randomShape >= 0.1 && randomShape < 0.6){
          ellipse(0, 0, shapeSize * 2, shapeSize * 2)
        } else if (randomShape >= 0.6){
          rotate(layerObj.angle / 2)
          hexagon(0, 0, shapeSize)
        }
      pop()
    }
  }

  return Object.assign(layerObj, centeredShapeObj)
}


const SteppedHexagons = (state) => {
  const layerObj = Layer(state)

  const weight = randomSelectTwo() ? layerObj.thinStroke : layerObj.thickStroke
  const centerOffset = (state.CRYSTAL_SIZE / 2) * 0.15
  const numSteps = randomSelectTwo() ? layerObj.stepsOut : layerObj.stepsOut * 1.25
  const singleStep = ((state.CRYSTAL_SIZE / 2) - centerOffset) / numSteps


  const steppedHexagonsObj = {
    render: () => {
      stroke(layerObj.layerColor)
      noFill()
      strokeWeight(weight)
      
      push()
        rotate(layerObj.angle / 2)
        for(let i = 0; i < numSteps; i++){
          hexagon(0, 0, centerOffset + (i * singleStep))
        }
      pop()
    }
  }

  return Object.assign(layerObj, steppedHexagonsObj)
}


const RingOfShapes = (state) => {
  const layerObj = Layer(state)

  const steps = floor(random(1, layerObj.stepsOut)) 
  // determines the step # at which shape-center resides
  const center = steps * layerObj.singleStep  
  // determines the shape center actual position
  const randomShape = random(1)             // triangle, ellipse or rect
  const direction = randomSelectTwo()       // tringle inward or outward
  const weight = randomSelectTwo() ? layerObj.thinStroke : layerObj.thickStroke
  const fillColor = randomSelectTwo() ? layerObj.layerColor : color(0, 1)
  // color (x, 1) >> 1 basically is the alpha value 100% i.e. completely transparent

  // depending on where the center of the shape resides, 
  // the following conitions control the size of the shape

  let radius = 0
  if (steps < layerObj.stepsOut / 2) {
    radius = floor(random(1, steps)) * layerObj.singleStep
  } else if (steps > layerObj.stepsOut / 2) {
    radius = floor(random(1, layerObj.stepsOut - steps)) * layerObj.singleStep
  } else {
    radius = floor(random(1, (layerObj.stepsOut / 2) + 1)) * layerObj.singleStep
  }


  const ringOfShapesObj = {
    render: () => {
      fill(fillColor)
      stroke(layerObj.layerColor)
      strokeWeight(weight)
  
      push()
        for(let i = 0; i < layerObj.numShapes; i++){
          if (randomShape < 0.33) {
            ellipse(0, center, radius, radius)
          } else if (randomShape >= 0.33 && randomShape < 0.66) {
            rect(0, center, radius, radius)
          } else if (randomShape >= 0.66) {
            myTriangle(center, radius, direction)
          }
          rotate(layerObj.angle)
        }
      pop()
    }
  }

  return Object.assign(layerObj, ringOfShapesObj)
}