import * as types from '../actions/actionTypes';
import initialState from './initialState';
import StudentLessonAnswerModel from '../models/StudentLessonAnswer';

export default function lessonReducer(state = initialState.studentLessonAnswers, action) {
  switch (action.type) {
    case types.LOAD_STUDENT_LESSON_ANSWERS_FOR_A_STUDENT_SUCCESS:
      return action.studentLessonAnswers.map(sla => new StudentLessonAnswerModel(sla));

    case types.UPDATE_STUDENT_LESSON_ANSWER:
      return [
        ...state.filter(sla => sla.id !== action.studentLessonAnswer.id),
        new StudentLessonAnswerModel(Object.assign({}, action.studentLessonAnswer))
      ];

    default:
      return state;
  }
}
