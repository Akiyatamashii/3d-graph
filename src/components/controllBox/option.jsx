import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { deleteData, updateData } from "../store/slice/layerData"

const Option = ({ index, mainData }) => {
  //設定redux
  const dispath = useDispatch()
  const data = useSelector((state) => state.Layer.data[index])

  //設定資料
  const { Id, FileName } = data
  const [NewHeight, setHeight] = useState("")
  const [NewWidth, setWidth] = useState("")
  const [NewFar, setNFar] = useState("")
  const [Far, setFar] = useState("")
  const [onOption, setOption] = useState(null)

  useEffect(() => {
    if (NewFar === "") {
      setFar((parseInt(20) * parseInt(index)).toString() + "px")
    } else {
      setFar(NewFar + "px")
    }
  }, [NewFar])

  //同步input資料
  const changeH = (e) => {
    setHeight(e.target.value)
  }
  const changeW = (e) => {
    setWidth(e.target.value)
  }
  const changeF = (e) => {
    setNFar(e.target.value)
  }

  const lastOption = () => {
    if (mainData.length === index + 1) {
      setOption(true)
    } else {
      setOption(false)
    }
  }

  const changeOnOption = () => {
    setOption((prev) => !prev)
  }

  const subOptionClass = onOption ? "subOptions active" : "subOptions"

  useEffect(() => {
    lastOption()
  }, [mainData])

  //圖檔轉URL
  const [fileName, setName] = useState("")
  const [selectedFile, setSelectedFile] = useState("")
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      setSelectedFile(e.target.result)
      setName(file.name)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  //資料更新
  const [newData, setNewData] = useState({})
  const dataChange = () => {
    setNewData({
      Id: Id,
      FileName: fileName,
      File: selectedFile,
      Height: NewHeight,
      Width: NewWidth,
      Far: Far,
    })
  }
  useEffect(() => {
    dispath(updateData(newData))
  }, [newData])

  return (
    <div className='optionBox'>
      <div className='optionList'>
        <div className='fileList'>
          <p className='fileName'>{FileName}</p>
          <div>
            <div className='inputFile'>
              <input
                onChange={handleFileChange}
                type='file'
                accept='image/jpeg,image/png,image/gif'
              />
            </div>
            <button onClick={changeOnOption}>
              {onOption ? (
                <ion-icon name='close-outline'></ion-icon>
              ) : (
                <ion-icon name='settings-outline'></ion-icon>
              )}
            </button>
          </div>
        </div>
        <div className={subOptionClass}>
          <div className='inputOption'>
            <div className='Height'>
              <p className='tooltiptext'>圖片高度:預設為原圖比例大小</p>
              <input
                type='text'
                placeholder='預設自動'
                value={NewHeight}
                onChange={changeH}
                onBlur={dataChange}
              />
            </div>
            <div className='Width'>
              <p className='tooltiptext'>圖片寬度:預設為原圖比例大小</p>
              <input
                type='text'
                placeholder='預設自動'
                value={NewWidth}
                onChange={changeW}
                onBlur={dataChange}
              />
            </div>
            <div className='Far'>
              <p className='tooltiptext'>圖片距離:預設為間隔20</p>
              <input
                type='text'
                placeholder='輸入+- nb'
                value={NewFar}
                onChange={changeF}
                onBlur={dataChange}
              />
            </div>
          </div>
          <div className='buttonDiv'>
            <button className='Apply' onClick={dataChange}>
              應用
            </button>
            <button
              className='delete'
              onClick={() => {
                dispath(deleteData(Id))
              }}
            >
              移除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Option
