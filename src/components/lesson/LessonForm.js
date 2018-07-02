import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';
import {Labels} from '../../constants';

const LessonForm = ({lesson, allAuthors, onSave, onChange, saving, errors}) => {
  return (
    <form>
      <h1>{Labels.teacher.lesson_form.manage_lesson.title}</h1>
      <TextInput
        name="title"
        label="Title"
        value={lesson.title}
        onChange={onChange}
        error={errors.title}/>

      <SelectInput
        name="authorId"
        label="Author"
        value={lesson.authorId}
        defaultOption="Select Author"
        options={allAuthors}
        onChange={onChange} error={errors.authorId}/>

      <TextInput
        name="category"
        label="Category"
        value={lesson.category}
        onChange={onChange}
        error={errors.category}/>

      <TextInput
        name="length"
        label="Length"
        value={lesson.length}
        onChange={onChange}
        error={errors.length}/>

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
  allAuthors: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object
};

export default LessonForm;
