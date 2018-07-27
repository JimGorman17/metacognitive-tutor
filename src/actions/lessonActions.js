import * as types from './actionTypes';
import lessonApi from '../api/lessonApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import LessonModel from '../models/Lesson';
import StudentLessonAnswerModel from '../models/StudentLessonAnswer';
import YouTubeVideoModel from '../models/YouTubeVideo';
import {QuestionTypeEnum} from '../constants';

export function loadLessonsSuccess(lessons) {
  return { type: types.LOAD_LESSONS_SUCCESS, lessons};
}

export function createLessonSuccess(lesson) {
  return {type: types.CREATE_LESSON_SUCCESS, lesson};
}

export function updateLessonSuccess(lesson) {
  return {type: types.UPDATE_LESSON_SUCCESS, lesson};
}

export function deleteLessonSuccess(lessonId) {
  return {type: types.DELETE_LESSON_SUCCESS, lessonId};
}

export function loadStudentLessonAnswersForAStudentSuccess(studentLessonAnswers) {
  return { type: types.LOAD_STUDENT_LESSON_ANSWERS_FOR_A_STUDENT_SUCCESS, studentLessonAnswers }
}

export function updateStudentLessonAnswerSuccess(studentLessonAnswer) {
  return {type: types.UPDATE_STUDENT_LESSON_ANSWER_SUCCESS, studentLessonAnswer}
}

function jsonParseLesson(l) {
  const lesson = Object.assign({}, l);
  lesson.theHookYouTubeVideo = lesson.theHookYouTubeVideo ? new YouTubeVideoModel(JSON.parse(lesson.theHookYouTubeVideo)) : new YouTubeVideoModel();
  lesson.theTwoVocabularyWordsYouTubeVideo = lesson.theTwoVocabularyWordsYouTubeVideo ? new YouTubeVideoModel(JSON.parse(lesson.theTwoVocabularyWordsYouTubeVideo)) : new YouTubeVideoModel();
  lesson.storyDetails = lesson.storyDetails ? JSON.parse(lesson.storyDetails) : [];
  lesson.storyQuestions = lesson.storyQuestions ? JSON.parse(lesson.storyQuestions) : [];
  lesson.importantSentencesForWordScramble = lesson.importantSentencesForWordScramble ? JSON.parse(lesson.importantSentencesForWordScramble) : [];
  return new LessonModel(lesson);
}

export function loadLessons(loggedInUser) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return lessonApi.getAllLessons(loggedInUser)
    .then(response => dispatch(loadLessonsSuccess(response.data.map(l => jsonParseLesson(l)))))
    .catch(error => {
      throw(error);
    });
  };
}

export function saveLesson(lesson) {
  return function (dispatch/*, getState*/) {
    const isNew = !lesson.id;
    dispatch(beginAjaxCall());
    return lessonApi.saveLesson(lesson).then(response => {
      const lesson = jsonParseLesson(response.data);
      isNew ? dispatch(createLessonSuccess(lesson)) :
      dispatch(updateLessonSuccess(lesson));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function deleteLesson(deleteLessonModel) {
  return function (dispatch/*, getState*/) {
    dispatch(beginAjaxCall());
    return lessonApi.deleteLesson(deleteLessonModel).then(() => dispatch(deleteLessonSuccess(deleteLessonModel.id)))
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

function jsonParseStudentLessonAnswer(sla) {
  const studentLessonAnswer = Object.assign({}, sla);
  studentLessonAnswer.answer = studentLessonAnswer.answer && studentLessonAnswer.questionType == QuestionTypeEnum.card_pyramid ? JSON.parse(studentLessonAnswer.answer) : studentLessonAnswer.answer;
  return new StudentLessonAnswerModel(studentLessonAnswer);
}

export function loadStudentLessonAnswers(loggedInUser) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return lessonApi.getAllStudentLessonAnswersForAStudent(loggedInUser)
    .then(response => dispatch(loadStudentLessonAnswersForAStudentSuccess(response.data.map(sla => jsonParseStudentLessonAnswer(sla)))))
    .catch(error => {
      throw(error);
    });
  };
}

export function saveStudentLessonAction(studentLessonAnswer) {
  return function (dispatch/*, getState*/) {
    dispatch(beginAjaxCall());
    return lessonApi.saveStudentLessonAction(studentLessonAnswer).then(response => {
      const studentLessonAction = new StudentLessonAnswerModel(response.data);
      dispatch(updateStudentLessonAnswerSuccess(studentLessonAction));
    }).catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

