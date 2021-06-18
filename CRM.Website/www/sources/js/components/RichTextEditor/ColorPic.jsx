import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TwitterPicker } from 'react-color';

class ColorPic extends Component {
  static propTypes = {
    expanded: PropTypes.bool,
    onExpandEvent: PropTypes.func,
    onChange: PropTypes.func,
    currentState: PropTypes.object
  };

  stopPropagation = (event) => {
    event.stopPropagation();
  };

  onChange = (color) => {
    const { onChange } = this.props;
    onChange('color', color.hex);
  }

  renderModal = () => {
    const color  = "rgb(255,224,178)";
    const colors = ['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8', '#FFD54F'];
    
    return (
      <div className="twitter-color-modal"
          onClick={this.stopPropagation}
      >
        <TwitterPicker  color={color} colors ={colors} onChangeComplete={this.onChange} width="206px" />
      </div>
    );
  };

  render() {
    const { expanded, onExpandEvent } = this.props;
    return (
      <div
          className="twitter-color-wrapper"
          aria-haspopup="true"
          aria-expanded={expanded}
          aria-label="rdw-color-picker"
      >
        <div
            className="twitter-icon-wrapper"
            onClick={onExpandEvent}
        >
          <img
              className="twitter-icon"
              src="./css/images/color/color.svg"
              alt=""
          />
        </div>
        {expanded ? this.renderModal() : undefined}
      </div>
    );
  }
}

export default ColorPic;