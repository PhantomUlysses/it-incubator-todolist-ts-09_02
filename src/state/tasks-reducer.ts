import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    taskId: string;
    todolistId: string;
}
export type SecondActionType = {
    type: ''
}

type ActionsType = RemoveTaskActionType | SecondActionType;
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)}
        case '':


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
}
export const SecondAC = (title: string): SecondActionType => {
    return { type: ''}
}
