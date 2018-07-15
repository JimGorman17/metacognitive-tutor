// Originated from https://raw.githubusercontent.com/hackingbeauty/react-youtube-autocomplete/master/src/index.js on 07/14/2018

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Typeahead from 'react-typeahead-component2';
import JSONP from 'jsonp';
import OptionsTemplate from './OptionsTemplate';
import YoutubeFinder from 'youtube-finder';

const googleAutoSuggestURL = '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=';

class YoutubeAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  handleChange(event) {
    const
      self = this,
      query = event.target.value,
      url = googleAutoSuggestURL + query;

    this.setState({
      inputValue: query
    });

    JSONP(url, function(error, data){
      if (error) {
        throw(error);
      } else {
        const searchResults = data[1];
        self.setState({
          options: searchResults
        });
      }
    });
  }

  onClick(event, optionData) {
    const searchTerm = optionData[0];

    this.setState({
      inputValue: searchTerm
    });
  }

  onOptionChange(event, optionData/*, index*/) {
    const searchTerm  = optionData[0]

    this.setState({
      inputValue: searchTerm
    });
  }

  onDropDownClose(/*event*/) {
    if (!this.state.inputValue.trim()) {
      return;
    }

    const
      self          = this,
      searchTerm    = this.state.inputValue,
      maxResults    = this.props.maxResults <= 50 ? this.props.maxResults : '50',
      YoutubeClient = YoutubeFinder.createClient({ key: this.props.apiKey }),
        params        = {
        part        : 'id,snippet',
        type        : 'video',
        q           : searchTerm,
        maxResults  : maxResults
      };

    YoutubeClient.search(params, function(error,results){
      if (error) {
        throw(error);
      }
      self.props.callback(results.items);
    });

  }

  render() {
    const {placeHolder, className, disabled} = this.props;
    const {inputValue, options} = this.state;

    return disabled ? <div /> :
      <Typeahead
        inputValue={inputValue}
        placeholder={placeHolder}
        className={className}
        onChange={this.handleChange.bind(this)}
        optionTemplate={OptionsTemplate}
        options={options}
        onOptionClick={this.onClick.bind(this)}
        onOptionChange={this.onOptionChange.bind(this)}
        onDropdownClose={this.onDropDownClose.bind(this)}
      />
  }
}

YoutubeAutocomplete.propTypes = {
  apiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  className: PropTypes.string,
  maxResults: PropTypes.number,
  disabled: PropTypes.bool
};

export default YoutubeAutocomplete;