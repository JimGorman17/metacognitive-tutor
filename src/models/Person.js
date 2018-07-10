export default class Person {
  constructor(params) {
      this.Name = params ? params.Name : null;
      this.Email = params ? params.Email : null;
      this.Provider = params ? params.Provider : null;
      this.ProviderId = params ? params.ProviderId : null;
      this.ProviderPic = params ? params.ProviderPic : null;
  }
}