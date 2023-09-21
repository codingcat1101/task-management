import { REDUX_ACTIONS } from "../utils/constants"



export const setTasks = (response) => {
    return {
        type : REDUX_ACTIONS.TASK_DATA,
        taskData : response
    }
}

export const clearTasks = () => {
    return {
        type : REDUX_ACTIONS.TASK_DATA,
        taskData : []
    }
}

export const setTaskFilters = (response) => {
    return {
        type : REDUX_ACTIONS.TASK_FILTER,
        taskData : response
    }
}

export const clearFilters = () => {
    return {
        type : REDUX_ACTIONS.TASK_FILTER,
        taskData : undefined
    }
}