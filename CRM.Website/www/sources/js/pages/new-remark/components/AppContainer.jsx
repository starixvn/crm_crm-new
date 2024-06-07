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
import LangHelper from '@jsroot/common/langHelper';
import { getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';
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
    constructor(props) {
        super(props);
        this.state = {
            remarksPolicy: null
        };
    }

    componentDidMount(){
        this.props.getRemarkTitles();
        this.props.setIsSearchAll(this.props.isRemark)
        getPermission(FunctionKey.Remarks, true).then(response => {
            this.setState({ remarksPolicy: response });
        });
        document.title = LangHelper.getResource('Remarks');
    }

    componentWillUnmount(){
        this.props.resetState();
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
        const { remarkTitles, popupAdd, popupEdit, showHistory, customerName, custId, isGuestSearch } = this.props;
        const {remarksPolicy}= this.state;
        if(remarkTitles === null || !remarkTitles || !remarksPolicy){
            return null;
        }
        const isHost = remarksPolicy == Policy.Host;
        const isRead = remarksPolicy >= Policy.Read;

        return (
            <Fragment>
                <Filter isHost={isHost} customerName={customerName} isGuestSearch={isGuestSearch}  />
                {
                    showHistory.show ?
                    <History/> :
                    <DataGrid isHost={isHost} isRead={isRead} />
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
                        isHost={isHost}
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
