import * as types from '../actions/actionTypes';
import initialState from './initialState';
import StudentLessonAnswerModel from '../models/StudentLessonAnswer';

export default function lessonReducer(state = initialState.studentLessonAnswers, action) {
  switch (action.type) {
    case types.LOAD_STUDENT_LESSON_ANSWERS_FOR_A_STUDENT_SUCCESS:
      return action.studentLessonAnswers.map(sla => new StudentLessonAnswerModel(sla));

    default:
      return state;
  }
}
