import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Filter from './Filter';
import DataGrid from './DataGrid';
import NewRemark from './NewRemark';
import EditRemark from './EditRemark';


export class AppContainer extends Component {
    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        popupAdd: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        popupEdit: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        isHost: false,
        popupAdd: { show: false },
        popupEdit: { show: false }
    };

    componentDidMount(){
        this.props.getRemarkTitles();
    }

    handleCloseAddPopup = () => {
        this.props.setOpenCreatePopup({ show: false });
        this.props.setCreateResult(null);
        this.props.setValidateResult({isSuccessful: false});
        this.props.setInputAddUsername('');
        this.props.getNewRemarks(this.props.gridParams);
    };

    handleCloseEditPopup = () => {
        this.props.setOpenEditPopup({ show: false, data: null });
        this.props.setEditResult(null);
        this.props.getNewRemarks(this.props.gridParams);
    };
    
    render() {
        const { remarkTitles, popupAdd, popupEdit } = this.props;
        if(remarkTitles === null || !remarkTitles){
            return null;
        }
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost}/>
                {
                    popupAdd.show &&
                    <NewRemark onClose={this.handleCloseAddPopup}/>
                }
                {
                    popupEdit.show &&
                    <EditRemark onClose={this.handleCloseEditPopup}/>
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, remarkTitles, popupAdd, popupEdit } = state;
    return { gridParams, remarkTitles, popupAdd, popupEdit };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
