import React, { Component, Fragment } from 'react';
import DataGrid from './DataGrid';
import Filter from './Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import RemovePicAssignment from './RemovePicAssignment';
import AssignPic from './AssignPic';
import DefaultPic from './DefaultPic';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isHost, isReadPicManagement } = this.props;

        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost}  isReadPicManagement={isReadPicManagement}/>
                {
                    this.props.removePicAssignmentPopup.show &&
                    <RemovePicAssignment
                        onClose={() => this.props.setRemovePicAssignmentPopup({ show: false })}
                    />
                }
                {
                    this.props.assignPicPopup.show &&
                    <AssignPic data={this.props.assignPicPopup.data} />
                }
                {
                    this.props.defaultPicPopup.show &&
                    <DefaultPic />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        removePicAssignmentPopup,
        assignPicPopup,
        defaultPicPopup
    } = state;

    return {
        removePicAssignmentPopup,
        assignPicPopup,
        defaultPicPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);