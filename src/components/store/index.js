import { configureStore } from "@reduxjs/toolkit";
import LayerDataReducer from "./slice/layerData"

export default configureStore({
  reducer: {
    Layer: LayerDataReducer,
  },
})
