import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../dragAndDropUtils'
import '../../styles/card-pyramid.css';

class CardPyramid extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      items1: [
        {
          id: "main_idea",
          data: props.mainIdea
        },
        {
          id: "supporting_idea",
          data: props.supportingIdea
        },
        ...props.storyDetails.map((sd, index) => { return {
          id: `story_detail_${index}`,
          data: sd
        }})
      ],
      items2: [],
      items3: [],
      items4: []
    };

    this.pickColor = this.pickColor.bind(this);
  }

  cardColors = [
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
      this.state.items1,
      this.state.items2,
      this.state.items3,
      this.state.items4
    );*/
    return (
      <div className="container">
        <div className="row">
          <div className="card-container col-md-3">
            <Container
              groupName="1"
              getChildPayload={i => this.state.items1[i]}
              onDrop={e =>
                this.setState({ items1: applyDrag(this.state.items1, e) })
              }
            >
              {this.state.items1.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={{ backgroundColor: this.pickColor() }}
                    >
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
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.items2[i]}
              onDrop={e =>
                this.setState({ items2: applyDrag(this.state.items2, e) })
              }
            >
              {this.state.items2.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={{ backgroundColor: this.pickColor() }}
                    >
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
            <Container
              groupName="1"
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.items3[i]}
              onDrop={e =>
                this.setState({ items3: applyDrag(this.state.items3, e) })
              }
            >
              {this.state.items3.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={{ backgroundColor: this.pickColor() }}
                    >
                      {p.data}
                    </div>
                  </Draggable>
                );
              })}
            </Container>
            <Container
              groupName="1"
              style={{ minHeight: "54.4px" }}
              orientation="horizontal"
              getChildPayload={i => this.state.items4[i]}
              onDrop={e =>
                this.setState({ items4: applyDrag(this.state.items4, e) })
              }
            >
              {this.state.items4.map(p => {
                return (
                  <Draggable key={p.id}>
                    <div
                      className="draggable-item"
                      style={{ backgroundColor: this.pickColor() }}
                    >
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