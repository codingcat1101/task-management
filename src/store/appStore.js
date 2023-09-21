import { legacy_createStore as createStore } from "redux"
import { REDUX_ACTIONS } from "../utils/constants"

const initialState = {
    taskData : [],
    taskFilter : undefined
}

function handleState(state = initialState, action) {
    switch (action.type) {
        case REDUX_ACTIONS.TASK_DATA:
            return {
                ...state,
                taskData: action.taskData
            }
        case REDUX_ACTIONS.TASK_FILTER:
            return {
                ...state,
                taskFilter: action.taskFilter
            }
        default:
            return { ...state }
    }
}

const store = createStore(handleState)

export default store;