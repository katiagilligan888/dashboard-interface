import { ADD_DATA_TO_STORE } from '../typeConstants'

const initialState = []

export const dataCollection = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA_TO_STORE:
      return [...state, action.data]
    default:
        return state
  }
}
