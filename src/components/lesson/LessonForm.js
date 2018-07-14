import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import ListInput from '../common/ListInput/ListInput';
import YouTubeVideoInput from '../common/YouTubeVideoInput/YouTubeVideoInput';
import {Labels} from '../../constants';

const LessonForm = ({lesson, onSave, onChange, saving, errors}) => {

  const dummyData = ["First", "Second", "Third"];

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

      <YouTubeVideoInput
        name="theHookYouTubeVideo"
        label={Labels.teacher.lesson_form.manage_lesson.the_hook}
        value={lesson.TheHookYouTubeVideo}
        onChange={onChange}
        error={errors.TheHookYouTubeVideo} />

      <ListInput
        name="storyDetails"
        data={dummyData}
        label={Labels.teacher.lesson_form.manage_lesson.story_details}
        value={lesson.StoryDetails}
        onChange={onChange}
        error={errors.StoryDetails} />

      <TextInput
        name="mainIdea"
        label={Labels.teacher.lesson_form.manage_lesson.main_idea}
        value={lesson.MainIdea}
        onChange={onChange}
        error={errors.MainIdea}/>

      <TextInput
        name="supportingIdea"
        label={Labels.teacher.lesson_form.manage_lesson.supporting_idea}
        value={lesson.SupportingIdea}
        onChange={onChange}
        error={errors.SupportingIdea}/>

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
