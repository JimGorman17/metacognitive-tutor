import UpsertGradeModel from '../models/UpsertGrade';
import DeleteGradeModel from '../models/DeleteGrade';
import {post, delete_command} from '../apiWrapper';

class GradeApi {
  static saveGrade(upsertGradeModel) {
    if (!(upsertGradeModel instanceof UpsertGradeModel)) {
      throw 'payload is not of type UpsertGradeModel.';
    }

    return post(`grade/upsert`, upsertGradeModel);
  }

  static deleteGrade(deleteGradeModel) {
    if (!(deleteGradeModel instanceof DeleteGradeModel)) {
      throw 'payload is not of type DeleteGradeModel.';
    }

    return delete_command(`grade/delete`, deleteGradeModel);
  }
}

export default GradeApi;
