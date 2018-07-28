import LoginModel from './Login';
import {QuestionTypeEnum} from '../constants';

export default class StudentLessonAnswer {
  constructor(params) {
    if (params) {
      if (params.lessonId <= 0) {
        throw `Invalid lessonId: ${params.lessonId}.`;
      }
      if (!params.questionType || params.questionType.trim() === "") {
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

  convertToApiReady(){
    return Object.assign({}, this, {
      answer: this.answer && 0 <= [QuestionTypeEnum.card_pyramid, QuestionTypeEnum.word_scramble].indexOf(this.questionType) ? JSON.stringify(this.answer) : this.answer
    });
  }
}