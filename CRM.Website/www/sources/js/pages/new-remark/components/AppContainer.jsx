import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Filter from './Filter';
import DataGrid from './DataGrid';
import NewRemark from './NewRemark';

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
        this.props.getRemarksTitle();
    }

    handleCloseAddPopup = () => {
        this.props.setOpenAddPopup({ show: false });
        this.props.setAddResult(null);
        this.props.setValidateResult(null);
        this.props.setInputAddUsername('');
    };

    handleCloseEditPopup = () => {
        this.props.setOpenEditPopup({ show: false });
        this.props.setEditResult(null);
    };
    
    render() {
        const { remarkTitle, popupAdd, popupEdit } = this.props;
        if(remarkTitle === null || !remarkTitle){
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
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarkTitle, popupAdd, popupEdit } = state;
    return { remarkTitle, popupAdd, popupEdit };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
