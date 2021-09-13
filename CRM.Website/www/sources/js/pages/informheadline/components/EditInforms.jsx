import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { remarkEncode, renderButtonSave } from '../common.functions';
import DataGridEdit from './DataGridEdit';
import FilterEditInforms from './FilterEditInforms';

export class EditInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveResult: null
        };
        this.includeCurrencies = null;
        this.includeSites = null;
    }

    async componentDidMount() {
        await this.props.getTitleDetail({titleId: this.props.titleId});

        const { titleDetail, allSettings } = this.props;
        const includeCurrencies = this.getIncludeInSetting(titleDetail.currencies, allSettings.currencies);
        const includeSites = this.getIncludeInSetting(titleDetail.sites, allSettings.sites[0].childSites);
        const params = {
            titleId: this.props.titleId, typeAccount: titleDetail.typeAccount,
            currencies: includeCurrencies, levels: titleDetail.positions,
            sites: includeSites, isVip: titleDetail.isVip,
            excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
        };
        this.includeCurrencies = includeCurrencies;
        this.includeSites = includeSites;
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

    handleSubmit = async () => {
        const { dataEditInforms, editedInforms } = this.props;
        const replaceDataEdit = dataEditInforms.map(element => editedInforms.find(item => item.headlineId === element.headlineId) || element);
        const editedData = remarkEncode(replaceDataEdit);

        await this.props.editInforms({...this.props.filterData.values, informs: editedData});
        this.setAlert();
    };

    render() {
        const { titleDetail, allSettings, dataEditInforms, exportEditInforms, filterData } = this.props;
        if (!titleDetail || !allSettings || !dataEditInforms) {
            return null;
        }

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

                    <FilterEditInforms
                        detail={titleDetail}
                        includeCurrencies={this.includeCurrencies}
                        includeSites={this.includeSites}
                        informData={dataEditInforms}
                        exportExcel={exportEditInforms}
                        isNewInform={false}
                    />

                    <DataGridEdit
                        informData={dataEditInforms}
                        informSettings={allSettings}
                        totalItem={dataEditInforms.length}
                        setAlert={this.setAlert}
                        handleSubmit={this.handleSubmit}
                    />
                </Modal.Body>

                <Modal.Footer>
                    {renderButtonSave(filterData.errors,this.handleSubmit)}
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, dataEditInforms, resultEditInforms, editedInforms, filterData } = state;
    return { titleDetail, allSettings, dataEditInforms, resultEditInforms, editedInforms, filterData };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInforms);
