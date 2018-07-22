import StudentLessonAnswerModel from './StudentLessonAnswer';
import GradeModel from './Grade';

export default class GroupedStudentLessonAnswer {
  constructor(params) {
    this.lessonId = params ? params.lessonId : null;
    this.name = params ? params.name : null;
    this.provider = params ? params.provider : null;
    this.providerId = params ? params.providerId : null;
    this.providerPic = params ? params.providerPic : '';
    this.studentLessonAnswers = params ? params.studentLessonAnswers.map(sla => new StudentLessonAnswerModel(sla)) : [];
    this.gradeResponse = params ? new GradeModel(params.gradeResponse) : new GradeModel();
  }
}