export default class YouTubeVideo {
  constructor(params) {
      this.VideoId = params ? params.VideoId : null;
      this.Title = params ? params.Title : null;
      this.Description = params ? params.Description : null;
      this.ImageUrl = params ? params.ImageUrl : null;
  }    
}