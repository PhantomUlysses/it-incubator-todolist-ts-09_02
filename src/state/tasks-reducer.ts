import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    taskId: string;
    todolistId: string;
}
export type AddTaskActionType = {
    type: 'ADD-TASK';
    title: string;
    todolistId: string;
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS';
    taskId: string;
    todolistId: string;
    isDone: boolean;
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE';
    title: string;
    taskId: string;
    todolistId: string;
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state,
                [action.todolistId]: [{id: action.todolistId, title: action.title, isDone: false}, ...state[action.todolistId]]};
        }
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId] : state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)};
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId] : []};
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state};
            delete newState[action.id];
            return newState;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string ,todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}
}
export const changeTaskTitleAC = (title: string, taskId: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, taskId, todolistId}
}


