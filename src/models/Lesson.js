import YouTubeVideoModel from '../models/YouTubeVideo';
import LoginModel from '../models/Login';

export default class Lesson {
  constructor(params) {
    this.id = params ? params.id : 0;
    this.BookTitle = params ? params.BookTitle : '';
    this.BookAmazonUrl = params ? params.BookAmazonUrl : '';
    this.TheHookYouTubeVideo = params && params.TheHookYouTubeVideo && params.TheHookYouTubeVideo instanceof YouTubeVideoModel ? params.TheHookYouTubeVideo : new YouTubeVideoModel();
    this.TheTwoVocabularyWordsYouTubeVideo = params && params.TheTwoVocabularyWordsYouTubeVideo && params.TheTwoVocabularyWordsYouTubeVideo instanceof YouTubeVideoModel ? params.TheTwoVocabularyWordsYouTubeVideo : new YouTubeVideoModel();
    // TODO: Out-of-scope for now
    // this.TheTwoVocabularyWordsEnunciationVideos = params && params.TheTwoVocabularyWordsEnunciationVideos && params.TheTwoVocabularyWordsEnunciationVideos.constructor === Array && params.TheTwoVocabularyWordsEnunciationVideos.length === 2 && params.TheTwoVocabularyWordsEnunciationVideos.every(v => v instanceof YouTubeVideoModel) ? params.TheTwoVocabularyWordsYouTubeVideo : [];
    this.MainIdea = params ? params.MainIdea : '';
    this.SupportingIdea = params ? params.SupportingIdea : '';
    this.StoryDetails = params && params.StoryDetails && params.StoryDetails.constructor === Array ? params.StoryDetails : [];
    this.StoryQuestions = params && params.StoryQuestions && params.StoryQuestions.constructor === Array ? params.StoryQuestions : [];
    this.ImportantSentencesForWordScramble = params && params.ImportantSentencesForWordScramble && params.ImportantSentencesForWordScramble.constructor === Array ? params.ImportantSentencesForWordScramble : [];
    this.LessonAuthor = params && params.LessonAuthor && params.LessonAuthor instanceof LoginModel ? params.LessonAuthor : new LoginModel();

    this.Provider = this.LessonAuthor ? this.LessonAuthor.Provider : null;
    this.ProviderId = this.LessonAuthor ? this.LessonAuthor.ProviderId : null;
  }
}