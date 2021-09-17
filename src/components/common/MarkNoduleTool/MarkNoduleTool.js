import toolStyle from './toolStyle.js'
import toolColors from './toolColors.js'
import csTools from 'cornerstone-tools'
import cornerstone from 'cornerstone-core'

const BaseAnnotationTool = csTools.importInternal('base/BaseAnnotationTool')

function getToolState(element, toolName) {
  const toolStateManager = getElementToolStateManager(element)

  return toolStateManager.get(element, toolName)
}

function getElementToolStateManager(element) {
  const enabledElement = cornerstone.getEnabledElement(element)

  return enabledElement.toolStateManager
}

function getNewContext(canvas) {
  const context = canvas.getContext('2d')
  context.setTransform(1, 0, 0, 1, 0, 0)
  return context
}

function draw(context, fn) {
  context.save()
  fn(context)
  context.restore()
}

function rotatePoint(point, center, angle) {
  const angleRadians = angle * (Math.PI / 180) // Convert to radians

  const rotatedX = Math.cos(angleRadians) * (point.x - center.x) - Math.sin(angleRadians) * (point.y - center.y) + center.x

  const rotatedY = Math.sin(angleRadians) * (point.x - center.x) + Math.cos(angleRadians) * (point.y - center.y) + center.y

  return {
    x: rotatedX,
    y: rotatedY,
  }
}

function path(context, options = {}, fn) {
  const { color, lineWidth, fillStyle, lineDash, shouldDrawLines = true } = options

  context.beginPath()
  context.strokeStyle = color || context.strokeStyle

  context.lineWidth = lineWidth || (lineWidth === undefined && toolStyle.getToolWidth()) || context.lineWidth
  if (lineDash) {
    context.setLineDash(lineDash)
  }

  fn(context)

  if (fillStyle) {
    context.fillStyle = fillStyle
    context.fill()
  }

  if (shouldDrawLines) {
    context.stroke()
  }

  if (lineDash) {
    context.setLineDash([])
  }
}

function drawRect(context, element, corner1, corner2, options, coordSystem = 'pixel', initialRotation = 0.0) {
  if (coordSystem === 'pixel') {
    corner1 = cornerstone.pixelToCanvas(element, corner1)
    corner2 = cornerstone.pixelToCanvas(element, corner2)
  }

  const viewport = cornerstone.getViewport(element)

  // Calculate the center of the image
  const { clientWidth: width, clientHeight: height } = element
  const { scale, translation } = viewport
  const rotation = viewport.rotation - initialRotation

  const centerPoint = {
    x: width / 2 + translation.x * scale,
    y: height / 2 + translation.y * scale,
  }

  if (Math.abs(rotation) > 0.05) {
    corner1 = rotatePoint(corner1, centerPoint, -rotation)
    corner2 = rotatePoint(corner2, centerPoint, -rotation)
  }

  const w = Math.abs(corner1.x - corner2.x)
  const h = Math.abs(corner1.y - corner2.y)

  corner1 = {
    x: Math.min(corner1.x, corner2.x),
    y: Math.min(corner1.y, corner2.y),
  }

  corner2 = {
    x: corner1.x + w,
    y: corner1.y + h,
  }

  let corner3 = {
    x: corner1.x + w,
    y: corner1.y,
  }

  let corner4 = {
    x: corner1.x,
    y: corner1.y + h,
  }

  if (Math.abs(rotation) > 0.05) {
    corner1 = rotatePoint(corner1, centerPoint, rotation)
    corner2 = rotatePoint(corner2, centerPoint, rotation)
    corner3 = rotatePoint(corner3, centerPoint, rotation)
    corner4 = rotatePoint(corner4, centerPoint, rotation)
  }

  path(context, options, context => {
    context.moveTo(corner1.x, corner1.y)
    context.lineTo(corner3.x, corner3.y)
    context.lineTo(corner2.x, corner2.y)
    context.lineTo(corner4.x, corner4.y)
    context.lineTo(corner1.x, corner1.y)
  })
}

export default class MarkNoduleTool extends BaseAnnotationTool {
  constructor(props = {}) {
    const defaultProps = {
      name: 'MarkNodule',
      supportedInteractionTypes: ['Mouse'],
      configuration: {
        drawHandles: false,
        drawHandlesOnHover: false,
        hideHandlesIfMoving: true,
        renderDashed: false,
      },
    }

    super(props, defaultProps)
  }

  handleSelectedCallback(e) {
    // 覆盖父类方法，禁止工具选中
  }

  createNewMeasurement(eventData) {
    return {
      visible: true,
      active: false,
      color: undefined,
      invalidated: true,
      handles: {
        start: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: false,
          active: false,
        },
        end: {
          x: eventData.currentPoints.image.x,
          y: eventData.currentPoints.image.y,
          highlight: false,
          active: false,
        },
      },
    }
  }

  pointNearTool(element, data, coords, interactionType) {
    return false
  }

  updateCachedStats(image, element, data) {
    // const seriesModule = cornerstone.metaData.get('generalSeriesModule', image.imageId) || {}
    // const modality = seriesModule.modality
    // const pixelSpacing = getPixelSpacing(image)
    // const stats = _calculateStats(image, element, data.handles, modality, pixelSpacing)
    // data.cachedStats = stats
    // data.invalidated = false
  }

  renderToolData(evt) {
    const toolData = getToolState(evt.currentTarget, this.name)

    if (!toolData) {
      return
    }

    const eventData = evt.detail
    const { image, element } = eventData
    const context = getNewContext(eventData.canvasContext.canvas)

    draw(context, context => {
      // If we have tool data for this element - iterate over each set and draw it
      for (let i = 0; i < toolData.data.length; i++) {
        const data = toolData.data[i]

        if (data.visible === false) {
          continue
        }

        // Configure
        const color = toolColors.getColorIfActive(data)

        const rectOptions = { color }

        // Draw
        drawRect(context, element, data.handles.start, data.handles.end, rectOptions, 'pixel', data.handles.initialRotation)
      }
    })
  }
  
}
