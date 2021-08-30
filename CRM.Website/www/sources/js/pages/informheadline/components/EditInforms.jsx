import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DataGridEdit from './DataGridEdit';
import FilterEditInforms from './FilterEditInforms';

export class EditInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveResult: null
        };
    }

    async componentDidMount() {
        await this.props.getTitleDetail({
            titleId: this.props.titleId
        });
        await this.props.getAllSettings();

        const { titleDetail, allSettings } = this.props;
        const includeCurrencies = this.getIncludeInSetting(titleDetail.currencies, allSettings.currencies);
        const includeSites = this.getIncludeInSetting(titleDetail.sites, allSettings.sites[0].childSites);
        const params = {
            titleId: this.props.titleId,
            typeAccount: titleDetail.typeAccount,
            currencies: includeCurrencies,
            levels: titleDetail.positions,
            sites: includeSites,
            isVip: titleDetail.isVip,
            excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
        };
        this.props.setGridParams({...params, pageIndex: 1, pageSize: 100});
        this.props.setResultEditInforms(null);
        this.props.setGridData([]);
        this.props.setFilterData({...this.props.filterData, values: {...params, title: titleDetail.title, changeFilter: false}});
        await this.props.getEditInforms(params);
    }

    getIncludeInSetting = (detail, setting) => {
        const includes = [];
        setting.map(item => {
            if (detail.split(',').includes(item.id.toString())) {
                includes.push(item.id);
            }
        });
        return includes.join(',');
    };

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultEditInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
        }, 3000);
    };

    render() {
        const { titleDetail, allSettings, editDataInforms, gridData, gridParams } = this.props;
        if ( !titleDetail || !allSettings || !editDataInforms || !gridParams.currencies ) {
            return null;
        }
        const gridDataEdit = editDataInforms.map(element => gridData.find(item => item.headlineId === element.headlineId) || element);

        return (
            <Modal show className="edit-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                className="modal-edit"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{`${LangHelper.getResource('UpdateInformHeadlines')} - ${LangHelper.getResource('EditNumberOfAccounts')}`}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        this.state.saveResult &&
                        <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                            message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                        />
                    }

                    <FilterEditInforms/>

                    <DataGridEdit
                        informData={editDataInforms}
                        informSettings={allSettings}
                        totalItem={editDataInforms.length}
                        setAlert={this.setAlert}
                        gridDataEdit={gridDataEdit}
                        dataEdit={null}
                        edit={this.props.editInforms}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, editDataInforms, resultEditInforms, gridData, gridParams, filterData } = state;
    return { titleDetail, allSettings, editDataInforms, resultEditInforms, gridData, gridParams, filterData };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInforms);
