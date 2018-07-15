import YouTubeVideoModel from '../models/YouTubeVideo';
import LoginModel from '../models/Login';

export default class Lesson {
  constructor(params) {
    this.id = params ? params.id : 0;
    this.bookTitle = params ? params.BookTitle : '';
    this.bookAmazonUrl = params ? params.BookAmazonUrl : '';
    this.theHookYouTubeVideo = params && params.TheHookYouTubeVideo && params.TheHookYouTubeVideo instanceof YouTubeVideoModel ? params.TheHookYouTubeVideo : new YouTubeVideoModel();
    this.theTwoVocabularyWordsYouTubeVideo = params && params.TheTwoVocabularyWordsYouTubeVideo && params.TheTwoVocabularyWordsYouTubeVideo instanceof YouTubeVideoModel ? params.TheTwoVocabularyWordsYouTubeVideo : new YouTubeVideoModel();
    // TODO: Out-of-scope for now
    // this.theTwoVocabularyWordsEnunciationVideos = params && params.theTwoVocabularyWordsEnunciationVideos && params.theTwoVocabularyWordsEnunciationVideos.constructor === Array && params.theTwoVocabularyWordsEnunciationVideos.length === 2 && params.theTwoVocabularyWordsEnunciationVideos.every(v => v instanceof YouTubeVideoModel) ? params.theTwoVocabularyWordsEnunciationVideos : [];
    this.mainIdea = params ? params.MainIdea : '';
    this.supportingIdea = params ? params.SupportingIdea : '';
    this.storyDetails = params && params.StoryDetails && params.StoryDetails.constructor === Array ? params.StoryDetails : [];
    this.storyQuestions = params && params.StoryQuestions && params.StoryQuestions.constructor === Array ? params.StoryQuestions : [];
    this.importantSentencesForWordScramble = params && params.ImportantSentencesForWordScramble && params.ImportantSentencesForWordScramble.constructor === Array ? params.ImportantSentencesForWordScramble : [];
    this.lessonAuthor = params && params.LessonAuthor && params.LessonAuthor instanceof LoginModel ? params.LessonAuthor : new LoginModel();

    this.provider = this.lessonAuthor ? this.lessonAuthor.Provider : null;
    this.providerId = this.lessonAuthor ? this.lessonAuthor.ProviderId : null;
  }
}