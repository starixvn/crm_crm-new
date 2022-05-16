import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Filter from './Filter';
import DataGrid from './DataGrid';
import NewRemark from './NewRemark';
import EditRemark from './EditRemark';
import History from './History';

export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        popupAdd: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        popupEdit: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        showHistory: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        isHost: false,
        popupAdd: { show: false },
        popupEdit: { show: false },
        showHistory: { show: false },
        customerName : ''
    };
    componentDidMount(){
        this.props.getRemarkTitles();
    }

    handleCloseAddPopup = () => {
        this.props.setOpenCreatePopup({ show: false });
        this.props.setCreateResult(null);
        this.props.setValidateResult(null);
    };

    handleCreateSuccess = () => {
        this.handleCloseAddPopup();
        this.props.getNewRemarks(this.props.gridParams);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getNewRemarks(this.props.gridParams);
    };

    handleCloseEditPopup = () => {
        this.props.setOpenEditPopup({ show: false, data: null, isViewHistory: false });
        this.props.setEditResult(null);
    };
    render() {
        const { remarkTitles, popupAdd, popupEdit, showHistory, customerName, custId, isGuestSearch, isHost } = this.props;
        if(remarkTitles === null || !remarkTitles){
            return null;
        }
        return (
            <Fragment>
                <Filter isHost={isHost} customerName={customerName} isGuestSearch={isGuestSearch}/>
                {
                    showHistory.show ?
                    <History/> :
                    <DataGrid isHost={isHost}/>
                }
                {
                    popupAdd.show &&
                    <NewRemark
                        customerName={customerName}
                        custId={custId}
                        isGuestSearch={isGuestSearch}
                        onClose={this.handleCloseAddPopup}
                        onSuccess={this.handleCreateSuccess}
                    />
                }
                {
                    popupEdit.show &&
                    <EditRemark
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, remarkTitles, popupAdd, popupEdit, showHistory } = state;
    return { gridParams, remarkTitles, popupAdd, popupEdit, showHistory };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
