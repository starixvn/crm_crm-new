import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DataGridEdit from './DataGridEdit';
import FilterContactInforms from './FilterContactInforms';

export class EditContactInforms extends Component {

    async componentDidMount() {
        await this.props.getTitleDetail({
            titleId: this.props.titleId
        });
        await this.props.getContactInformSettings();
        const selectedStatuses = this.props.contactInformSettings.filterStatuses.map(item =>
            item.settingId
        ).join();
        const params = {
            titleId: this.props.titleId,
            username: '',
            statusId: selectedStatuses,
            pageIndex: 1, pageSize: -1
        };
        this.props.setGridParams({...params, pageIndex: 1, pageSize: 100});
        this.props.setResultEditContactInforms(null);
        this.props.setGridData([]);
        await this.props.getContactInforms(params);
    }

    renderForm = () => {
        const { contactInforms, contactInformSettings, titleDetail, gridData, setResultEditContactInforms } = this.props;
        const dataEdit = {titleId: titleDetail.titleId};
        return(
            <>
                <Modal.Body>
                    {
                        this.props.resultEditContactInforms &&
                        <ResponseMessage isSuccessful={this.props.resultEditContactInforms.isSuccessful}
                            message={this.props.resultEditContactInforms.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                        />
                    }
                    <FilterContactInforms/>

                    <DataGridEdit
                        informData={contactInforms}
                        informSettings={contactInformSettings}
                        totalItem={contactInforms.length}
                        setResultEdit={setResultEditContactInforms}
                        filterData={gridData}
                        dataEdit={dataEdit}
                        edit={this.props.editContactInforms}
                    />
                </Modal.Body>
            </>
        );
    };

    render() {
        const {titleDetail, contactInformSettings, contactInforms} = this.props;
        if (!titleDetail || !contactInformSettings || !contactInforms) {
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
    const { titleDetail, contactInformSettings, contactInforms, gridData, resultEditContactInforms } = state;
    return { titleDetail, contactInformSettings, contactInforms, gridData, resultEditContactInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactInforms);
