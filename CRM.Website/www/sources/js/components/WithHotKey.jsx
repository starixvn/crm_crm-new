import React from 'react';
import PropTypes from 'prop-types';
export default class WithHotKey extends React.Component  {
    static propTypes = {
        isDocumentHandle: PropTypes.bool
    };

    static defaultProps = {
        isDocumentHandle: false
    };

    componentDidMount() {
        if(this.props.isDocumentHandle){
            document.addEventListener("keydown", this.props.handleKeyDownFunc, false);
        }else{
            const rightContainer = document.getElementById('right-row-container');
            rightContainer.addEventListener("keydown", this.props.handleKeyDownFunc, false);
        }
    }

    componentWillUnmount(){
        if(this.props.isDocumentHandle){
            document.removeEventListener("keydown", this.props.handleKeyDownFunc, false);
        }else{
            const rightContainer = document.getElementById('right-row-container');
            if(rightContainer){
                rightContainer.removeEventListener("keydown", this.props.handleKeyDownFunc, false);
            }
        }
    }

    render() {
        return null;
    }
}