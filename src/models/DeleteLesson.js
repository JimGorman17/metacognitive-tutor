import LoginModel from './Login';

export default class DeleteLesson {
  constructor(params) {
    this.id = params ? params.id : 0;
    this.lessonAuthor = params && params.lessonAuthor ? new LoginModel(params.lessonAuthor) : new LoginModel();

    this.provider = this.lessonAuthor ? this.lessonAuthor.provider : null;
    this.providerId = this.lessonAuthor ? this.lessonAuthor.providerId : null;
  }
}