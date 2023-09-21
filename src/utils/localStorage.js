import { isNull, isUndefined } from "./util";

export function saveTasks(tasks){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function getTasks(tasks){
    return !isNull(localStorage.getItem('tasks')) && !isUndefined(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : [];
}

export function clearTasks(tasks){
    return localStorage.removeItem('tasks');
}