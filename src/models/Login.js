export default class Login {
    constructor(params) {
        this.Name = params ? params.Name : null;
        this.Token = params ? params.Token : null;
        this.Email = params ? params.Email : null;
        this.Provider = params ? params.Provider : null;
        this.ProviderId = params ? params.ProviderId : null;
        this.ProviderPic = params ? params.ProviderPic : null;
        this.IsTeacher = params ? params.IsTeacher : null;
        this.IsStudent = params ? params.IsStudent : null;
    }    
}