import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import ListInput from '../common/ListInput/ListInput';
import YouTubeVideoInput from '../common/YouTubeVideoInput/YouTubeVideoInput';
import {Labels} from '../../constants';

const LessonForm = ({lesson, onSave, onChange, saving, errors}) => {

  return (
    <form>
      <h1>{lesson.id ? Labels.teacher.lesson_form.manage_lesson.title : Labels.teacher.create_lesson_page.title}</h1>
      <TextInput
        name="bookTitle"
        label={Labels.teacher.lesson_form.manage_lesson.book_title}
        value={lesson.bookTitle}
        onChange={onChange}
        error={errors.bookTitle}/>

      <TextInput
        name="bookAmazonUrl"
        label={Labels.teacher.lesson_form.manage_lesson.book_amazon_url}
        value={lesson.bookAmazonUrl}
        onChange={onChange}
        error={errors.bookAmazonUrl}/>

      <YouTubeVideoInput
        name="theHookYouTubeVideo"
        label={Labels.teacher.lesson_form.manage_lesson.the_hook}
        value={lesson.theHookYouTubeVideo}
        onChange={onChange}
        error={errors.theHookYouTubeVideo} />

      <YouTubeVideoInput
        name="theTwoVocabularyWordsYouTubeVideo"
        label={Labels.teacher.lesson_form.manage_lesson.the_two_vocabulary_words_you_tube_video}
        value={lesson.theTwoVocabularyWordsYouTubeVideo}
        onChange={onChange}
        error={errors.theTwoVocabularyWordsYouTubeVideo} />

      <TextInput
        name="mainIdea"
        label={Labels.teacher.lesson_form.manage_lesson.main_idea}
        value={lesson.mainIdea}
        onChange={onChange}
        error={errors.mainIdea}/>

      <TextInput
        name="supportingIdea"
        label={Labels.teacher.lesson_form.manage_lesson.supporting_idea}
        value={lesson.supportingIdea}
        onChange={onChange}
        error={errors.supportingIdea} />

      <ListInput
        name="storyDetails"
        label={Labels.teacher.lesson_form.manage_lesson.story_details}
        data={lesson.storyDetails}
        onChange={onChange}
        error={errors.storyDetails} />

      <ListInput
        name="storyQuestions"
        label={Labels.teacher.lesson_form.manage_lesson.story_questions}
        data={lesson.storyQuestions}
        onChange={onChange}
        error={errors.storyQuestions} />

      <ListInput
        name="importantSentencesForWordScramble"
        label={Labels.teacher.lesson_form.manage_lesson.important_sentences_for_word_scramble}
        data={lesson.importantSentencesForWordScramble}
        onChange={onChange}
        error={errors.importantSentencesForWordScramble} />

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
