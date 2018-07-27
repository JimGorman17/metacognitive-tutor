import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../dragAndDropUtils'
import '../../styles/card-pyramid.css';

class CardPyramid extends Component {
  constructor(props, context) {
    super(props, context);

    const shuffleArray = arr => arr // https://gist.github.com/guilhermepontes/17ae0cc71fa2b13ea8c20c94c5c35dc4, 07/27/2018
      .map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

    this.state = {
      shuffledItems: shuffleArray([
        {
          id: "main_idea",
          data: props.mainIdea,
          style: { backgroundColor: this.pickColor() }
        },
        {
          id: "supporting_idea",
          data: props.supportingIdea,
          style: { backgroundColor: this.pickColor() }
        },
        ...props.storyDetails.map((sd, index) => { return {
          id: `story_detail_${index}`,
          data: sd,
          style: { backgroundColor: this.pickColor() }
        }})
      ]),
      mainIdeas: [],
      supportingIdeas: [],
      storyDetails: []
    };

    this.pickColor = this.pickColor.bind(this);
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
  ];
  pickColor = () => {
    let rand = Math.floor(Math.random() * 10);
    return this.cardColors[rand];
  };

  render() {
    /*console.log(
      this.state.shuffledItems,
      this.state.mainIdeas,
      this.state.supportingIdeas,
      this.state.storyDetails
    );*/
    return (
      <div className="container">
        <div className="row">
          <div className="card-container col-md-3">
            <Container
              groupName="1"
              nonDragAreaSelector=".info-handle"
              getChildPayload={i => this.state.shuffledItems[i]}
              onDrop={e =>
                this.setState({ shuffledItems: applyDrag(this.state.shuffledItems, e) })
              }
            >
              {this.state.shuffledItems.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={p.style}
                    >
                      <i title={p.data} style={{marginRight: ".4em"}} className={`fa fa-info-circle fa-fw info-handle`} aria-hidden="true" />
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
          </div>
          <div
            style={{ maxHeight: "183.2px" }}
            className="col-md-7 card-container card-pyramid-master-container"
          >
            <Container
              groupName="1"
              nonDragAreaSelector=".info-handle"
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.mainIdeas[i]}
              onDrop={e =>
                this.setState({ mainIdeas: applyDrag(this.state.mainIdeas, e) })
              }
            >
              {this.state.mainIdeas.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={p.style}
                    >
                      <i title={p.data} style={{marginRight: ".4em"}} className={`fa fa-info-circle fa-fw info-handle`} aria-hidden="true" />
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
            <Container
              groupName="1"
              nonDragAreaSelector=".info-handle"
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.supportingIdeas[i]}
              onDrop={e =>
                this.setState({ supportingIdeas: applyDrag(this.state.supportingIdeas, e) })
              }
            >
              {this.state.supportingIdeas.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={p.style}
                    >
                      <i title={p.data} style={{marginRight: ".4em"}} className={`fa fa-info-circle fa-fw info-handle`} aria-hidden="true" />
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
            <Container
              groupName="1"
              nonDragAreaSelector=".info-handle"
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.storyDetails[i]}
              onDrop={e =>
                this.setState({ storyDetails: applyDrag(this.state.storyDetails, e) })
              }
            >
              {this.state.storyDetails.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={p.style}
                    >
                      <i title={p.data} style={{marginRight: ".4em"}} className={`fa fa-info-circle fa-fw info-handle`} aria-hidden="true" />
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

CardPyramid.propTypes = {
  mainIdea: PropTypes.string.isRequired,
  supportingIdea: PropTypes.string.isRequired,
  storyDetails: PropTypes.array.isRequired
};

export default CardPyramid;