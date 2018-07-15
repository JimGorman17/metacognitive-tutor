import LessonModel from '../models/Lesson';
import {post} from '../apiWrapper';
import delay from './delay';

class LessonApi {
  static getAllLessons() {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        resolve(Object.assign([], lessons));
      }, delay);
    });
  }

  static saveLesson(lessonModel) {
    if (!(lessonModel instanceof LessonModel)) {
      throw 'payload is not of type LessonModel.';
    }

    return post(`lesson/upsert`, lessonModel);
  }

  static deleteLesson(lessonId) {
    return new Promise((resolve/*, reject*/) => {
      setTimeout(() => {
        const indexOfLessonToDelete = lessons.findIndex(lesson => {
          return lesson.lessonId == lessonId;
        });
        lessons.splice(indexOfLessonToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default LessonApi;
