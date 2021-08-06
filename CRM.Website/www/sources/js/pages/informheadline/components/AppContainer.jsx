import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    static propTypes = {
        getInformHeadline: PropTypes.func
    };

    static defaultProps = {
        getInformHeadline: function (){
            // nothing
        }
    };

    componentDidMount() {
        this.props.getInformHeadline();
    }

    render() {
        return (
            <>
                <DataGrid/>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
