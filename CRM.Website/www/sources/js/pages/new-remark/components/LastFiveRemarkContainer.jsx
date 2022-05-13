import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LastFiveRemarkDataGrid from './LastFiveRemarkDataGrid';
import EditRemark from './EditRemark';

export class LastFiveRemarkContainer extends Component {
    componentDidMount() {
        const param = {custId: this.props.custId};
        this.props.getLastFiveRemark(param);
        this.props.getRemarkTitles();
    }

    handleQuickEditSuccess = () => {
        this.handleCloseEditPopup();
        const param = {custId: this.props.custId};
        this.props.getLastFiveRemark(param);
    };

    handleQuickCloseEditPopup = () => {
        this.props.setOpenEditPopup({ show: false, data: null, isViewHistory: false });
        this.props.setEditResult(null);
    };

    render() {
        const {lastFiveRemarks, popupEdit} = this.props;
        if(!lastFiveRemarks){
            return null;
        }
        return (
            <Fragment>
                <LastFiveRemarkDataGrid isHost={this.props.isHost}/>
                {
                    popupEdit.show &&
                    <EditRemark
                        onClose={this.handleQuickCloseEditPopup}
                        onSuccess={this.handleQuickEditSuccess}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { lastFiveRemarks, popupEdit } = state;
    return { lastFiveRemarks, popupEdit };
};

export default connect(mapStateToProps, mapDispatchToProps)(LastFiveRemarkContainer);
