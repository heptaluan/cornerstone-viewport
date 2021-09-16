import csTools from 'cornerstone-tools'
const BaseTool = csTools.importInternal('base/BaseTool')

const fillRectangle = (evt, operationData, inside = true) => {
  const { points, segmentationMixinType } = operationData

  const { image } = evt.detail
  const vertices = points.map(a => [a.x, a.y])
  const [topLeft, bottomRight] = getBoundingBoxAroundPolygon(vertices, image)

  fillInsideShape(evt, operationData, () => true, topLeft, bottomRight)
}

const getBoundingBoxAroundPolygon = (vertices, image) => {
  let xMin = Infinity
  let xMax = 0
  let yMin = Infinity
  let yMax = 0
  const { width, height } = image

  vertices.forEach(v => {
    xMin = Math.min(v[0], xMin)
    xMax = Math.max(v[0], xMax)
    yMin = Math.min(v[1], yMin)
    yMax = Math.max(v[1], yMax)
  })

  xMin = Math.floor(xMin)
  yMin = Math.floor(yMin)
  xMax = Math.floor(xMax)
  yMax = Math.floor(yMax)

  xMax = Math.min(width, xMax)
  xMin = Math.max(0, xMin)
  yMax = Math.min(height, yMax)
  yMin = Math.max(0, yMin)

  return [
    [xMin, yMin],
    [xMax, yMax],
  ]
}

const fillInsideShape = (evt, operationData, pointInShape, topLeft, bottomRight) => {
  fillShape(evt, operationData, pointInShape, topLeft, bottomRight, 'inside')
}

const fillShape = (evt, operationData, pointInShape, topLeft, bottomRight, insideOrOutside = 'inside') => {
  debugger
  const { pixelData, segmentIndex } = operationData

  const { width } = evt.detail.image
  const [xMin, yMin] = topLeft
  const [xMax, yMax] = bottomRight

  for (let x = xMin; x < xMax; x++) {
    for (let y = yMin; y < yMax; y++) {
      const pixelIndex = y * width + x

      // If the pixel is the same segmentIndex and is inside the
      // Region defined by the array of points, set their value to segmentIndex.
      if (
        pointInShape({
          x,
          y,
        })
      ) {
        pixelData[pixelIndex] = segmentIndex
      }
    }
  }
}

const fillInsideRectangle = (evt, operationData) => {
  fillRectangle(evt, operationData, true)
}

export default class MarkNoduleTool extends BaseTool {
  constructor(name = 'MarkNodule') {
    super({
      name,
      supportedInteractionTypes: ['Mouse'],
      mixins: ['rectangleSegmentationMixin'],
      strategies: {
        default: fillInsideRectangle,
      },
    })
  }

  preMouseDownCallback(evt) {
    console.log('Hello cornerstoneTools!')
  }

  activeCallback(element) {
    console.log(`Hello element ${element.uuid}!`)
  }

  disabledCallback(element) {
    console.log(`Goodbye element ${element.uuid}!`)
  }
}
