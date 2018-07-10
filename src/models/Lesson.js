import YouTubeVideoModel from '../models/YouTubeVideo';
import PersonModel from '../models/Person';

export default class Lesson {
  constructor(params) {
    this.BookTitle = params ? params.BookTitle : null;
    this.BookAmazonUrl = params ? params.BookAmazonUrl : null;
    this.TheHookYouTubeVideo = params && params.TheHookYouTubeVideo && params.TheHookYouTubeVideo instanceof YouTubeVideoModel ? params.TheHookYouTubeVideo : null;
    this.TheTwoVocabularyWordsYouTubeVideo = params && params.TheTwoVocabularyWordsYouTubeVideo && params.TheTwoVocabularyWordsYouTubeVideo instanceof YouTubeVideoModel ? params.TheTwoVocabularyWordsYouTubeVideo : null;
    this.TheTwoVocabularyWordsEnunciationVideos = params && params.TheTwoVocabularyWordsEnunciationVideos && params.TheTwoVocabularyWordsEnunciationVideos.constructor === Array && params.TheTwoVocabularyWordsEnunciationVideos.length === 2 && params.TheTwoVocabularyWordsEnunciationVideos.every(v => v instanceof YouTubeVideoModel) ? params.TheTwoVocabularyWordsYouTubeVideo : null;
    this.MainIdea = params ? params.MainIdea : null;
    this.SupportingIdea = params ? params.SupportingIdea : null;
    this.StoryDetails = params && params.StoryDetails && params.StoryDetails.constructor === Array ? params.StoryDetails : null;
    this.StoryQuestions = params && params.StoryQuestions && params.StoryQuestions.constructor === Array ? params.StoryQuestions : null;
    this.ImportantSentencesForWordScramble = params && params.ImportantSentencesForWordScramble && params.ImportantSentencesForWordScramble.constructor === Array ? params.ImportantSentencesForWordScramble : null;
    this.LessonAuthor = params && params.LessonAuthor && params.LessonAuthor instanceof PersonModel ? params.LessonAuthor : null;
  }
}