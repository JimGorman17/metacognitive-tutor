import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../dragAndDropUtils'
import StudentLessonAnswerModel from '../../models/StudentLessonAnswer';
import WordScrambleItemModel from '../../models/WordScrambleItem';
import {QuestionTypeEnum} from '../../constants';
import '../../styles/word-scramble.css';

class WordScramble extends Component {
  constructor(props, context) {
    super(props, context);

    const shuffleArray = arr => arr // https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4, 07/27/2018
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    const shuffleSentence = s => {
      const sentenceAsString = s.replace(/\.+$/, ""); // Delete trailing periods. https://stackoverflow.com/a/20925205/109941, 07/27/2017
      const sentenceAsArray = sentenceAsString.match(/\S+/g) || []; // Split on whitespace. https://stackoverflow.com/a/14912552/109941, 07/27/2018
      return shuffleArray(sentenceAsArray.map((w, index) => new WordScrambleItemModel({id: index + 1, data: w, style: { backgroundColor: this.pickColor() } })));
    };

    const {answers, sentences} = this.props;
    this.state = {sentences: answers.length ? answers : Object.assign({}, sentences.map(s => shuffleSentence(s)))};
  }

  cardColors = [ // https://raw.githubusercontent.com/kutlugsahin/smooth-dnd-demo/master/src/demo/pages/cards.js, 07/27/2018
    "azure",
    "beige",
    "bisque",
    "blanchedalmond",
    "burlywood",
    "cornsilk",
    "gainsboro",
    "ghostwhite",
    "ivory",
    "khaki"
  ]

  pickColor = () => {
    let rand = Math.floor(Math.random() * 10);
    return this.cardColors[rand];
  }

  onChange = () => {
    const {onChange} = this.props;
    const {sentences} = this.state;
    onChange(QuestionTypeEnum.word_scramble, 0, sentences);
  };

  render() {
    const {sentences} = this.state;
    return (
      <div>
        {Object.keys(sentences).map((key) => { return (
          <div key={key}
          className="card-container"
          style={{width: "auto", backgroundColor: "rgba(243, 243, 243, .55)"}}
          >
            <Container
              groupName={key.toString()}
              orientation="horizontal"
              getChildPayload={i => this.state.sentences[key][i]}
              onDrop={e =>
                this.setState(previousState => {
                  return { sentences: Object.assign({}, previousState.sentences, {[key]: applyDrag(previousState.sentences[key], e)}) } }, () => this.onChange())
              }
            >
              {sentences[key].map(w => {
                return (
                  <Draggable key={w.id}>
                    <div
                      className="draggable-item"
                      style={w.style}
                    >
                      {w.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
          </div>
        );
      })}
      </div>
    );
  }
}

WordScramble.propTypes = {
  sentences: PropTypes.arrayOf(PropTypes.string).isRequired,
  answers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  onChange: PropTypes.func.isRequired
};

export default WordScramble;