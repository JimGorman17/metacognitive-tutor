import YouTubeVideoModel from '../models/YouTubeVideo';

export default class Lesson {
  constructor(params) {
    this.BookTitle = params ? params.BookTitle : null;
    this.BookAmazonUrl = params ? params.BookTitle : null;
    this.TheHookYouTubeVideo = params && params.TheHookYouTubeVideo instanceof YouTubeVideoModel ? params.TheHookYouTubeVideo : null;
    this.TheTwoVocabularyWordsYouTubeVideo = params && params.TheTwoVocabularyWordsYouTubeVideo instanceof YouTubeVideoModel ? params.TheTwoVocabularyWordsYouTubeVideo : null;
    this.TheTwoVocabularyWordsEnunciationVideos = params && params.TheTwoVocabularyWordsEnunciationVideos.constructor === Array && params.TheTwoVocabularyWordsEnunciationVideos.length === 2 && params.TheTwoVocabularyWordsEnunciationVideos.every(v => v instanceof YouTubeVideoModel) ? params.TheTwoVocabularyWordsYouTubeVideo : null;
    this.MainIdea = params ? params.MainIdea : null;
    this.SupportingIdea = params ? params.SupportingIdea : null;
    this.StoryDetails = params && params.StoryDetails.constructor === Array ? params.StoryDetails : null;
    this.StoryQuestions = params && params.StoryQuestions.constructor === Array ? params.StoryQuestions : null;
    this.ImportantSentencesForWordScramble = params && params.ImportantSentencesForWordScramble.constructor === Array ? params.ImportantSentencesForWordScramble : null;
  }
}