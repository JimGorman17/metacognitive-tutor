import LoginModel from './Login';

export default class Lesson {
  constructor(params) {
    if (params) {
      if (params.lessonId <= 0) {
        throw `Invalid lessonId: ${params.lessonId}.`;
      }
      if (params.questionType.trim() === "") {
        throw `Invalid questionType: ${params.questionType}.`;
      }
    }

    this.id = params ? params.id : 0;
    this.lessonId = params ? params.lessonId : 0;
    this.questionType = params ? params.questionType : "";
    this.questionId = params ? params.questionId : 0;
    this.question = params ? params.question : "";
    this.answer = params ? params.answer : "";

    this.student = params && params.student ? new LoginModel(params.student) : new LoginModel();
    this.provider = this.student ? this.student.provider : null;
    this.providerId = this.student ? this.student.providerId : null;
  }
}