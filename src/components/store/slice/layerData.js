import { createSlice } from "@reduxjs/toolkit"

export const LayerDateSlice = createSlice({
  name: "Layer",
  initialState: {
    keyId: "0",
    move: "10",
    data: [],
  },
  reducers: {
    addId: (state, action) => {
      state.keyId = (parseInt(state.keyId) + 1).toString()
    },
    addData: (state, action) => {
      state.data.push(action.payload)
    },
    updateData: (state, action) => {
      const update = action.payload
      const dataIndex = state.data.findIndex((data) => data.Id === update.Id)
      if (dataIndex !== -1) {
        state.data[dataIndex] = update
      }
    },
    deleteData: (state, action) => {
      const deleteId = action.payload
      const deleteIndex = state.data.findIndex((item) => item.Id === deleteId)
      if (deleteIndex !== -1) {
        state.data.splice(deleteIndex, 1)
      }
    },
    changeMove: (state, action) => {
      state.move = action.payload
    },
    updateFarData: (state, action) => {
      const { Id, ConfigFar } = action.payload
      const indexId = state.data.findIndex((item) => item.Id === Id)
      if (indexId !== -1) {
        state.data[indexId].Far = ConfigFar
      }
    },
  },
})

export const {
  addData,
  updateData,
  addId,
  deleteData,
  changeMove,
  updateFarData,
} = LayerDateSlice.actions
export default LayerDateSlice.reducer
