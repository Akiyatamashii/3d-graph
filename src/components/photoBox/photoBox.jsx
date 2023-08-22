import "./style.css"
import Layer from "./layer"
import Guide from "./guide"
import { useSelector } from "react-redux"
import { useEffect, useState, useRef } from "react"

const PhotoBox = () => {
  const [haveFile, setFile] = useState(0)
  const layerData = useSelector((state) => state.Layer.data)
  const Move = useSelector((state) => state.Layer.move)
  const divRef = useRef(null)
  const [centerX, setCenterX] = useState(0)
  const [centerY, setCenterY] = useState(0)
  const [PositiveX, setPositiveX] = useState(0)
  const [NegativeX, setNegativeX] = useState(0)
  const [PositiveY, setPositiveY] = useState(0)
  const [NegativeY, setNegativeY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [PositionMouseX, setPositionMouseX] = useState(0)
  const [PositionMouseY, setPositionMouseY] = useState(0)
  const [Xpoint, setXpoint] = useState(0)
  const [Ypoint, setYpoint] = useState(0)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (event) => {
    if (event.clientX < centerX) {
      setPositionMouseX(event.clientX - centerX)
    } else {
      setPositionMouseX(event.clientX - centerX)
    }

    if (event.clientY < centerY) {
      setPositionMouseY(centerY - event.clientY)
    } else {
      setPositionMouseY((event.clientY - centerY) * -1)
    }
    setMouseX(PositionMouseX)
    setMouseY(PositionMouseY)
  }

  useEffect(() => {
    if (mouseX > 0) {
      const X = mouseX / PositiveX
      setXpoint(X)
    } else {
      const X = (mouseX / NegativeX) * -1
      setXpoint(X)
    }
    if (mouseY > 0) {
      const Y = mouseY / PositiveY
      setYpoint(Y)
    } else {
      const Y = (mouseY / NegativeY) * -1
      setYpoint(Y)
    }
  }, [mouseY, mouseX])

  useEffect(() => {
    setRotateX(Xpoint * Move)
    setRotateY(Ypoint * Move)
  }, [Xpoint, Ypoint])

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (divRef.current) {
        const { left, top, width, height } =
          divRef.current.getBoundingClientRect()
        const centerX = left + width / 2
        const centerY = top + height / 2
        setCenterX(centerX)
        setCenterY(centerY)
        setPositiveX(width - centerX)
        setNegativeX(centerX - width)
        setPositiveY(height - centerY)
        setNegativeY(centerY - height)
      }
    })

    if (divRef.current) {
      observer.observe(divRef.current)
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setLayer(layerData)
  }, [layerData])

  const setLayer = (layerData) => {
    if (layerData.length !== 0) {
      layerData.forEach((item) => {
        if (item.File !== "") {
          setFile(1)
        }
      })
    } else {
      setFile(0)
    }
  }

  const style = {
    transform: `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
  }

  return (
    <div onMouseMove={handleMouseMove} className='photoBox' ref={divRef}>
      <div className='rotateBox' style={style}>
        {haveFile === 1 ? (
          layerData.map((item, index) => (
            <Layer key={`layer_${item.Id}`} index={index} />
          ))
        ) : (
          <Guide />
        )}
        <div className='Top'></div>
        <div className='Right'></div>
        <div className='Left'></div>
        <div className='Botton'></div>
      </div>
    </div>
  )
}

export default PhotoBox
