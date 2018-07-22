export default class Grade {
  constructor(params) {
    this.isGraded = params ? params.isGraded : false;
    this.grade = params ? params.grade : '';
    this.comments = params ? params.comments : '';
  }
}