import Option from "./option"
import "./style.css"
import { useDispatch, useSelector } from "react-redux"
import { addData, addId, changeMove } from "../store/slice/layerData"
import { useState } from "react"

const ControlPanel = () => {
  const [NewMove, setMove] = useState("10")

  const dispatch = useDispatch()

  const data = useSelector((state) => state.Layer.data)
  const keyId = useSelector((state) => state.Layer.keyId)

  const setOptions = (data) => {
    if (data.length !== 0) {
      return data.map((item, index) => {
        return (
          <Option key={`option_${item.Id}`} index={index} mainData={data} />
        )
      })
    }
  }

  const addLayer = () => {
    const defaultData = {
      Id: keyId,
      FileName: "請選擇檔案",
      File: "",
      Height: "",
      Width: "",
      Move: "",
      Far: "",
    }
    dispatch(addId())
    dispatch(addData(defaultData))
  }

  const ChangeM = (e) => {
    setMove(e.target.value)
  }

  const MoveOnChange = () => {
    dispatch(changeMove(NewMove))
  }

  return (
    <div className='controlPanel'>
      <p className='controlPanelTitle'>控制面板</p>
      {setOptions(data)}
      <button className='addlayer' onClick={addLayer}>
        新增圖層
      </button>
      <div className='Move'>
        <p className='tooltiptext'>圖片偏移量:預設10</p>
        <input
          type='text'
          placeholder='輸入+ nb'
          value={NewMove}
          onChange={ChangeM}
          onBlur={MoveOnChange}
        />
      </div>
    </div>
  )
}
export default ControlPanel
