import { ADD_DATA_TO_STORE } from '../typeConstants'

const initialState = []

export const dataCollection = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_TO_STORE:
        const y = action.data.value
        const x = action.data.timestamp
      return [...state, {x, y}]
    default:
        return state
  }
}
