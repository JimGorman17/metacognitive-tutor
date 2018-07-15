import * as types from '../actions/actionTypes';
import initialState from './initialState';
import LessonModel from '../models/Lesson';

export default function lessonReducer(state = initialState.lessons, action) {
  switch (action.type) {
    case types.LOAD_LESSONS_SUCCESS:
      return action.lessons;

    case types.CREATE_LESSON_SUCCESS:
      return [
        ...state,
        new LessonModel(Object.assign({}, action.lesson))
      ];

    case types.UPDATE_LESSON_SUCCESS:
      return [
        ...state.filter(lesson => lesson.id !== action.lesson.id),
        new LessonModel(Object.assign({}, action.lesson))
      ];

    case types.DELETE_LESSON_SUCCESS:
      return [
        ...state.filter(lesson => lesson.id !== action.lessonId)
      ];

    default:
      return state;
  }
}
