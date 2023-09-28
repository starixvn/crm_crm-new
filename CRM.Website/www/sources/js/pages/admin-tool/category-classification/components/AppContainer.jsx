import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import Filter from './Filter';
import DataGrid from './DataGrid';
import EditCategoryClassification from './EditCategoryClassification';


export class AppContainer extends Component {
    static propTypes = {
        editRemarkPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        editRemarkPopup: { show: false },
        getAllSettings: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    };

    componentDidMount() {
        getPermission(FunctionKey.CategoryClassification).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('CategoryClassification');
    };

    handleCloseEditPopup = () => {
        this.props.setEditCategoryClassPopup({ show: false });
        this.props.setCategoryClassId(null);
        this.props.setEditCategoryClassResult(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getGridData(this.props.gridParams);
    };

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
                <Filter isHost={isHost} />
                <DataGrid isHost={isHost} />
                {
                    this.props.editCategoryClassPopup.show &&
                    <EditCategoryClassification
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
            </Fragment>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, gridParams, editCategoryClassPopup } = state;
    return { gridData, gridParams, editCategoryClassPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);