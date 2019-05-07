var yyy = document.getElementById('xxx');

autoSetCaanvasSize(yyy)
listenToMouse(yyy)



/********/
function autoSetCaanvasSize(canvas) {
  setCanvasSize()
  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.height = pageHeight
    canvas.width = pageWidth
  }
}

/********/
function listenToMouse(canvas) {
  var context = canvas.getContext('2d');
  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  yyy.onmousedown = function(aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    using = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 20, 20)
    } else {
      lastPoint = {
        "x": x,
        "y": y
      }
    }

  }

  canvas.onmousemove = function(aaa) {
    var x = aaa.clientX
    var y = aaa.clientY
    if (!using) {
      return
    }
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 20, 20)
    } else {
      var newPoint = {
        "x": x,
        "y": y
      }
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }

  canvas.onmouseup = function(aaa) {
    using = false
  }

  function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.lineWidth = 5
    context.stroke()
    context.closePath()
  }
  var eraserEnabled = false
  eraser.onclick = function() {
    eraserEnabled = !eraserEnabled
  }
}