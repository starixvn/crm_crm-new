import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DataGridEdit from './DataGridEdit';
import FilterContactInforms from './FilterContactInforms';

export class EditContactInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            selectedStatusId: '',
            informs: [],
            saveResult: null,
            totalContactInform: 0
        };
    }

    async componentDidMount() {
        await this.props.getTitleDetail({
            titleId: this.props.titleId
        });
        await this.props.getContactInformSettings();
        const selectedStatuses = this.props.contactInformSettings.filterStatuses.map(item =>
            item.settingId
        ).join();
        await this.props.getContactInforms({
            titleId: this.props.titleId,
            username: '',
            statusId: selectedStatuses,
            pageIndex: 1,
            pageSize: 10000
        });
        this.props.setGridParams({
            pageIndex: 1,
            pageSize: 100
        });
        this.setState({
            totalContactInform: this.props.contactInforms.length,
            selectedStatusId : selectedStatuses
        });
    }

    handleChangeStatus = selectedItemsKey => {
        this.setState({
            selectedStatusId: selectedItemsKey
        });
    };

    handleChangeFilter = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    handleSearch = async () => {
        this.props.setGridParams({
            pageIndex: 1,
            pageSize: 100
        });
        await this.props.getContactInforms({
            titleId: this.props.titleId,
            username: this.state.username,
            statusId: this.state.selectedStatusId,
            pageIndex: 1,
            pageSize: 10000
        });
        this.setState({
            totalContactInform: this.props.contactInforms.length
        });
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getContactInforms({
            titleId: this.props.titleId,
            username: this.state.username,
            statusId: this.state.selectedStatusId,
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    };

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultUpdateContactInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
        }, 3000);
    };

    handleSubmit = async () => {
        const informs = this.state.informs.map(item => {
            if(item.remark){
                return {...item, remark: this.htmlDecode(item.remark)};
            }
            return item;
        });
        await this.props.updateContactInforms({
            titleId: this.props.titleId,
            informs: informs
        });
        this.setAlert();
    };

    htmlDecode = value => {
        const remark = value.replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
        return remark;
    };

    handleChangeDataGrid = (event, headlineId) => {
        const name = event.target.name;
        const value = event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value;

        const item = {...this.props.contactInforms.find(element => element.headlineId === headlineId), [name]: value};

        this.setState(prevState =>{
            const oldInforms = prevState.informs;
            const element  = oldInforms.find(value => value.headlineId === item.headlineId);

            if(element){
                Object.assign(element, {[name]: value});
                return({informs: oldInforms});
            }else{
                return({informs: [...oldInforms, item]});
            }
        });
    };

    handleExportExcel = () => {
        const params = {
            titleId: this.props.titleId,
            username: this.state.username,
            statusId: this.state.selectedStatusId,
            pageIndex: 1,
            pageSize: 10000
        };
        this.props.exportContactInforms(params);
    };

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel}/>
            </OverlayTrigger>
        );
    };

    renderForm = () => {
        const { titleDetail, contactInforms, contactInformSettings, gridParams } = this.props;
        const filterStatuses = contactInformSettings.filterStatuses.map(item => {
            return {
                settingId: item.settingId,
                settingValue: item.settingValue,
                checked: this.state.selectedStatusId.split(',').includes(item.settingId.toString())
            };
        });

        return(
            <>
                <Modal.Body>
                    {
                        this.state.saveResult &&
                        <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                            message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                        />
                    }
                    <FilterContactInforms
                        titleDetail={titleDetail}
                        onChange={this.handleChangeFilter}
                        filterStatuses={filterStatuses}
                        onChangeStatus={this.handleChangeStatus}
                        onSearch={this.handleSearch}
                        renderExportExcelText={this.renderExportExcelText}
                    />

                    <DataGridEdit
                        Informs={contactInforms}
                        InformSettings={contactInformSettings}
                        gridParams={gridParams}
                        totalItem={this.state.totalContactInform}
                        onPaging={this.onPaging}
                        onChange={this.handleChangeDataGrid}
                        handleSubmit={this.handleSubmit}
                    />
                </Modal.Body>
            </>
        );
    };

    render() {
        const {titleDetail, contactInformSettings, contactInforms} = this.props;
        if(!titleDetail || !contactInformSettings || !contactInforms){
            return null;
        }

        return (
            <>
                <Modal show className="edit-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl"
                    className="modal-edit"
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('UpdateInformHeadlines')}</Modal.Title>
                    </Modal.Header>

                    {
                        this.renderForm()
                    }
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, contactInformSettings, contactInforms, gridParams, resultUpdateContactInforms } = state;
    return { titleDetail, contactInformSettings, contactInforms, gridParams, resultUpdateContactInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactInforms);
