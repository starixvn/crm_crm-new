import React, { Component, Fragment } from 'react';
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
    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    };

    componentDidMount() {
        getPermission(FunctionKey.CategoryClassification, true).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('CategoryClassification');
        document.body.style.overflow = 'hidden';
    };

    handleCloseEditPopup = () => {
        this.props.setEditCategoryClassPopup({ show: false });
        this.props.setCategoryClassId(null);
        this.props.setEditCategoryClassResult(null);
    };

    handleCloseDeletePopup = () => {
        this.props.setDeleteCategoryClassPopup({ show: false });
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getGridData(this.props.gridParams);
    };

    handleDeleteSuccess = () => {
        this.props.setCategoryClassId(null);
        this.props.setEditCategoryClassResult(null);
        this.props.getGridData(this.props.gridParams);
    };

    handleDelete = () => {
        const { selectCategoryClass } = this.props;
        const params = {
            mainCategoryID: selectCategoryClass.mainCategoryID,
            subCategoryID: selectCategoryClass.subCategoryID,
            remarkNewValue: null,
            actionType: 2
        };

        this.props.editCategoryClass(params).then(() => {
            if (this.props.editCategoryClassResult.isSuccessful) {
                toast.success(LangHelper.getResource('RemoveRemarkSuccessfully'));
            } else {
                toast.error(LangHelper.getResource('RemoveRemarkFailed'));
            }
            this.handleCloseDeletePopup();
            this.handleDeleteSuccess();
        });
    };

    render() {
        const isHost = this.state.policy === Policy.Host;
        const { selectCategoryClass } = this.props;

        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost} />
                {
                    this.props.editCategoryClassPopup.show &&
                    <EditCategoryClassification
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
                {
                    this.props.deleteCategoryClassPopup.show &&
                    <SweetModalDialog size='md'
                        title={LangHelper.getResource('RemoveRemark')}
                        contents={
                            <div>Are you sure you want to remove the remark of <strong>{selectCategoryClass?.mainCategory}/{selectCategoryClass?.subCategory}</strong>?</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleDelete}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseDeletePopup}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseDeletePopup}
                    />
                }
            </Fragment>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData, gridParams, editCategoryClassPopup, editCategoryClassResult, selectCategoryClass, deleteCategoryClassPopup } = state;
    return { gridData, gridParams, editCategoryClassPopup, editCategoryClassResult, selectCategoryClass, deleteCategoryClassPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);