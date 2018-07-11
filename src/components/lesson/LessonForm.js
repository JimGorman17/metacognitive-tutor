import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import {Labels} from '../../constants';

const LessonForm = ({lesson, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>{Labels.teacher.lesson_form.manage_lesson.title}</h1>
      <TextInput
        name="bookTitle"
        label={Labels.teacher.lesson_form.manage_lesson.book_title}
        value={lesson.BookTitle}
        onChange={onChange}
        error={errors.BookTitle}/>

      <TextInput
        name="bookAmazonUrl"
        label={Labels.teacher.lesson_form.manage_lesson.book_amazon_url}
        value={lesson.BookAmazonUrl}
        onChange={onChange}
        error={errors.BookAmazonUrl}/>

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Saving...' : 'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

LessonForm.propTypes = {
  lesson: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default LessonForm;
