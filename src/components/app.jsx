import "./app.css"
import PhotoBox from "./photoBox/photoBox"
import ControlPanel from "./controllBox/controlPanel"
import { useState, useEffect } from "react"

const App = () => {
  const [isDark, setDark] = useState(true)
  const [onMenu, setMenu] = useState(false)

  const isDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches

  useEffect(() => {
    if (!isDarkMode) {
      setDark(false)
    }
  }, [isDarkMode])

  const DarkMod = isDark ? "App black" : "App white"

  const ControlBoxClass = onMenu ? "ControlBox active" : "ControlBox"

  const isMenu = () => {
    setMenu((prev) => !prev)
  }

  return (
    <div className={DarkMod}>
      <div className='ViewBox'>
        <PhotoBox />
      </div>
      <div className={ControlBoxClass}>
        <ControlPanel />
      </div>
      <div className='Menu' onClick={isMenu}>
        <button>
          {onMenu ? (
            <ion-icon name='close'></ion-icon>
          ) : (
            <ion-icon name='menu'></ion-icon>
          )}
        </button>
      </div>
      <div className='iconlink'></div>
    </div>
  )
}

export default App
