import {
    CREATE_TEACHER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    UPDATE_TEACHER_SUCCESS } from '../constants/teacher';

const initialState = {};

const teacher = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_TEACHER_SUCCESS:
            return { ...state, ...action.teacher }
        case LOGIN_SUCCESS:
            return { ...state, ...action.teacher }
        case LOGOUT_SUCCESS:
            return {}
        case UPDATE_TEACHER_SUCCESS:
            return {...state, ...action.teacher }
    }
    return state
}


export default teacher;
