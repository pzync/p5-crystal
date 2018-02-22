// assign a probability weight to shape layers
const layerConstructors = [
  {
    name: 'Outline Shape',
    init: () => OutlineShape(initState),
    weight: 0.9
  },
  {
    name: 'Centered Shape',
    init: () => CenteredShape(initState),
    weight: 0.4
  },
  {
    name: 'Circles',
    init: () => Circles(initState),
    weight: 0.6
  },
  {
    name: 'Simple Lines',
    init: () => SimpleLines(initState),
    weight: 0.8
  },
  {
    name: 'Dotted Lines',
    init: () => DottedLines(initState),
    weight: 0.3
  },
  {
    name: 'Ring of Shapes',
    init: () => RingOfShapes(initState),
    weight: 0.4
  },
  {
    name: 'Stepped Hexagons',
    init: () => SteppedHexagons(initState),
    weight: 0.8
  },
  // {
  //   name: 'Test Lines',
  //   init: () => TestLines(),
  //   weight: 1
  // }
]


// for drawing one complete crystal at a given position
const Crystal = () => {
  // const x = position.x
  // const y = position.y
  let layers = []

  layerConstructors.forEach( lcon => {
    let picker = random(1) 
    
    if(picker > lcon.weight){
      layers.push(lcon.init())   
    }
   }) 

   const crystalObj = {
     render: (position) => {
       push()
        translate(position.x, position.y)
        layers.forEach( layer => {
          layer.render()
        })
       pop()
     }
   }

   return crystalObj
}