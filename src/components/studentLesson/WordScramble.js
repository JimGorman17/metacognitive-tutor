import React, { Component } from "react";
import PropTypes from 'prop-types';
// import { Container, Draggable } from "react-smooth-dnd";
// import { applyDrag } from '../../dragAndDropUtils'
import StudentLessonAnswerModel from '../../models/StudentLessonAnswer';
// import {Labels, QuestionTypeEnum} from '../../constants';
import '../../styles/word-scramble.css';

class WordScramble extends Component {
  constructor(props, context) {
    super(props, context);

    /*
    const shuffleArray = arr => arr // https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4, 07/27/2018
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
    */
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

  render() {
    const {sentences, answers} = this.props;
    return (
      <React.Fragment>
        <div>
          {sentences}
        </div>
        <div>
          {answers}
        </div>
      </React.Fragment>
    );
  }
}

WordScramble.propTypes = {
  sentences: PropTypes.arrayOf(PropTypes.instanceOf(PropTypes.string)).isRequired,
  answers: PropTypes.arrayOf(PropTypes.instanceOf(StudentLessonAnswerModel)).isRequired,
  onChange: PropTypes.func.isRequired
};

export default WordScramble;