import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DataGridEdit from './DataGridEdit';
import FilterInformHeadlines from './FilterInformHeadlines';

export class EditInformHeadlines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStatusId: this.props.selectedStatuses
        };
    };

    handleChangeStatus = (selectedItemsKey) => {
        this.setState({
            selectedStatusId: selectedItemsKey
        });
        console.log(selectedItemsKey);
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    handleSearch = () => {
        this.props.setGridParams({
            pageIndex: 1,
            pageSize: 100
        });
        this.props.getContactInforms({
            titleId: this.props.titleId,
            username: '',
            statusId: this.state.selectedStatusId,
            pageIndex: 1,
            pageSize: 100
        });
    };

    renderOptions = (name, item, key) => <option key={key} value={item}>{name}</option>;

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getContactInforms({
            titleId: this.props.titleId,
            username: '',
            statusId: this.state.selectedStatusId,
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    };

    handleSubmit = informs => {
        this.props.getUpdateContentInforms({
            titleId: 723,
            informs: informs
        });
    };

    renderForm = () => {
        const { titleDetail, contactInforms, contactInformSettings, gridParams } = this.props;
        const filterStatuses = contactInformSettings.filterStatuses.map(item => {
            return {
                settingId: item.settingId,
                settingValue: item.settingValue,
                checked: this.state.selectedStatusId.includes(item.settingId)
            };
        });

        return(
            <>
                <Modal.Body>

                    <FilterInformHeadlines
                        titleDetail={titleDetail}
                        onChange={this.handleChange}
                        filterStatuses={filterStatuses}
                        onChangeStatus={this.handleChangeStatus}
                        onSearch ={this.handleSearch}
                    />

                    <DataGridEdit
                        contactInforms={contactInforms}
                        contactInformSettings={contactInformSettings}
                        gridParams={gridParams}
                        onPaging={this.onPaging}
                        onSubmit={this.handleSubmit}
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
                    backdrop="static" keyboard={false} size="xl" centered
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
    };
}

export default EditInformHeadlines;
