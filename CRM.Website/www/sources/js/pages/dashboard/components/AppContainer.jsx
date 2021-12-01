import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGridRemark from './DataGridRemark';

export class AppContainer extends Component {

    render() {
        return (
            <div>
                <DataGridRemark />
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarks } = state;
    return { remarks };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
