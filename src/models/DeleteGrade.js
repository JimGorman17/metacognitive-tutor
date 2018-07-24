import LoginModel from './Login';

export default class DeleteGrade {
  constructor(params) {
    this.lessonId = params ? params.lessonId : 0;
    this.lessonAuthor = params && params.lessonAuthor ? new LoginModel(params.lessonAuthor) : new LoginModel();
    this.student = params && params.student ? new LoginModel(params.student) : new LoginModel();

    this.studentProvider = this.student ? this.student.provider : null;
    this.studentProviderId = this.student ? this.student.providerId : null;
    this.provider = this.lessonAuthor ? this.lessonAuthor.provider : null;
    this.providerId = this.lessonAuthor ? this.lessonAuthor.providerId : null;
  }
}