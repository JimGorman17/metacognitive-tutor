export default class WordScrambleItem {
  constructor(params) {
    this.id = params ? params.id : '';
    this.data = params ? params.data : '';
    this.style = params ? params.style : '';
  }
}