import LessonModel from '../models/Lesson';
import {post} from '../apiWrapper';

class LessonApi {
  static getAllLessons(loggedInUser) {
    return post(`lesson/getall`, {provider: loggedInUser.provider, providerId: loggedInUser.providerId});
  }

  static saveLesson(lessonModel) {
    if (!(lessonModel instanceof LessonModel)) {
      throw 'payload is not of type LessonModel.';
    }

    return post(`lesson/upsert`, lessonModel);
  }

  // TODO: Implement
  // static deleteLesson(lessonId) {
  //   return new Promise((resolve/*, reject*/) => {
  //     setTimeout(() => {
  //       const indexOfLessonToDelete = lessons.findIndex(lesson => {
  //         return lesson.lessonId == lessonId;
  //       });
  //       lessons.splice(indexOfLessonToDelete, 1);
  //       resolve();
  //     }, delay);
  //   });
  // }
}

export default LessonApi;
