import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import ListInput from '../common/ListInput/ListInput';
import YouTubeVideoInput from '../common/YouTubeVideoInput/YouTubeVideoInput';
import {Labels} from '../../constants';

const LessonForm = ({lesson, onSave, onChange, saving, errors}) => {

  return (
    <form>
      <h1>{Labels.teacher.lesson_form.manage_lesson.title}</h1>
      <TextInput
        name="BookTitle"
        label={Labels.teacher.lesson_form.manage_lesson.book_title}
        value={lesson.BookTitle}
        onChange={onChange}
        error={errors.BookTitle}/>

      <TextInput
        name="BookAmazonUrl"
        label={Labels.teacher.lesson_form.manage_lesson.book_amazon_url}
        value={lesson.BookAmazonUrl}
        onChange={onChange}
        error={errors.BookAmazonUrl}/>

      <YouTubeVideoInput
        name="TheHookYouTubeVideo"
        label={Labels.teacher.lesson_form.manage_lesson.the_hook}
        value={lesson.TheHookYouTubeVideo}
        onChange={onChange}
        error={errors.TheHookYouTubeVideo} />

      <YouTubeVideoInput
        name="TheTwoVocabularyWordsYouTubeVideo"
        label={Labels.teacher.lesson_form.manage_lesson.the_two_vocabulary_words_you_tube_video}
        value={lesson.TheTwoVocabularyWordsYouTubeVideo}
        onChange={onChange}
        error={errors.TheTwoVocabularyWordsYouTubeVideo} />

      <TextInput
        name="MainIdea"
        label={Labels.teacher.lesson_form.manage_lesson.main_idea}
        value={lesson.MainIdea}
        onChange={onChange}
        error={errors.MainIdea}/>

      <TextInput
        name="SupportingIdea"
        label={Labels.teacher.lesson_form.manage_lesson.supporting_idea}
        value={lesson.SupportingIdea}
        onChange={onChange}
        error={errors.SupportingIdea} />

      <ListInput
        name="StoryDetails"
        label={Labels.teacher.lesson_form.manage_lesson.story_details}
        data={lesson.StoryDetails}
        onChange={onChange}
        error={errors.StoryDetails} />

      <ListInput
        name="StoryQuestions"
        label={Labels.teacher.lesson_form.manage_lesson.story_questions}
        data={lesson.StoryQuestions}
        onChange={onChange}
        error={errors.StoryQuestions} />

      <ListInput
        name="ImportantSentencesForWordScramble"
        label={Labels.teacher.lesson_form.manage_lesson.important_sentences_for_word_scramble}
        data={lesson.ImportantSentencesForWordScramble}
        onChange={onChange}
        error={errors.ImportantSentencesForWordScramble} />

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
