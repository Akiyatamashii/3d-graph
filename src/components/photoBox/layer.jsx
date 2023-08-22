import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateFarData } from "../store/slice/layerData"

const Layer = ({ index }) => {
  const dispatch = useDispatch()
  const layerConfig = useSelector((state) => state.Layer.data[index])

  const { Id, Far, File } = layerConfig

  const [style, setstyle] = useState({})

  useEffect(() => {
    setstyle({
      position: index === 0 ? "relative" : "absolute",
      transform: `translateZ(${Far})`,
      left: index !== 0 ? "0" : "",
      top: index !== 0 ? "0" : "",
    })
  }, [Far])

  return <img className='rotateContent' style={style} src={File} alt='' />
}
export default Layer
