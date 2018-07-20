import LessonModel from '../models/Lesson';
import DeleteLessonModel from '../models/DeleteLesson';
import {post, delete_command} from '../apiWrapper';

class LessonApi {
  static getAllLessons(loggedInUser) {
    return post(`lesson/getall`, {provider: loggedInUser.provider, providerId: loggedInUser.providerId});
  }

  static getAllStudentLessonAnswersForAStudent(loggedInUser) {
    return post(`studentlessonanswer/for-student/getall`, {provider: loggedInUser.provider, providerId: loggedInUser.providerId});
  }

  static saveLesson(lessonModel) {
    if (!(lessonModel instanceof LessonModel)) {
      throw 'payload is not of type LessonModel.';
    }

    return post(`lesson/upsert`, lessonModel.convertToApiReady());
  }

  static deleteLesson(deleteLessonModel) {
    if (!(deleteLessonModel instanceof DeleteLessonModel)) {
      throw 'payload is not of type DeleteLessonModel.';
    }

    return delete_command(`lesson/delete`, deleteLessonModel);
  }
}

export default LessonApi;
