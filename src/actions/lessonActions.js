import * as types from './actionTypes';
import lessonApi from '../api/lessonApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import LessonModel from '../models/Lesson';

export function loadLessonsSuccess(lessons) {
  return { type: types.LOAD_LESSONS_SUCCESS, lessons};
}

export function createLessonSuccess(lesson) {
  return {type: types.CREATE_LESSON_SUCCESS, lesson};
}

export function updateLessonSuccess(lesson) {
  return {type: types.UPDATE_LESSON_SUCCESS, lesson};
}

export function loadLessons(loggedInUser) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return lessonApi.getAllLessons(loggedInUser).then(response => {
      dispatch(loadLessonsSuccess(response.data.map(l => new LessonModel(l))));
    }).catch(error => {
      throw(error);
    });
  };
}

export function saveLesson(lesson) {
  return function (dispatch/*, getState*/) {
    const isNew = !lesson.id;
    dispatch(beginAjaxCall());
    return lessonApi.saveLesson(lesson).then(response => {
      const lesson = new LessonModel(response.data);
      isNew ? dispatch(updateLessonSuccess(lesson)) :
      dispatch(createLessonSuccess(lesson));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}
