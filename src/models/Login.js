export default class Login {
    constructor(params) {
        this.name = params ? params.name : null;
        this.token = params ? params.token : null;
        this.email = params ? params.email : null;
        this.provider = params ? params.provider : null;
        this.providerId = params ? params.providerId : null;
        this.providerPic = params ? params.providerPic : null;
        this.isTeacher = params ? params.isTeacher : null;
        this.isStudent = params ? params.isStudent : null;
    }
}