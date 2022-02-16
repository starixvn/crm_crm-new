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
import FilterContactInforms from './FilterContactInforms';

export class EditContactInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveResult: null
        };
        this.selectedStatuses = null;
    }

    async componentDidMount() {
        await this.props.getTitleDetail({titleId: this.props.titleId});
        const selectedStatuses = this.props.contactInformSettings.filterStatuses.map(item =>
            item.settingId
        ).join();
        const params = {titleId: this.props.titleId, username: '', statusId: selectedStatuses};
        this.selectedStatuses = selectedStatuses;
        await this.props.getContactInforms(params);
    }

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultEditContactInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
        }, 3000);
    };

    handleSubmit = async () => {
        const { editedInforms, titleDetail } = this.props;
        const editedContactInforms = remarkEncode(editedInforms);
        if (editedContactInforms.length > 0) {
            await this.props.editContactInforms({ titleId: titleDetail.titleId, informs: editedContactInforms });
            this.setAlert();
        }
    };

    renderForm = () => {
        const { contactInforms, contactInformSettings } = this.props;

        return(
            <Modal.Body>
                {
                    this.state.saveResult &&
                    <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                        message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                    />
                }

                <FilterContactInforms
                    selectedStatuses={this.selectedStatuses}
                />

                <DataGridEdit
                    informData={contactInforms}
                    informSettings={contactInformSettings}
                    totalItem={contactInforms.length}
                    setAlert={this.setAlert}
                    handleSubmit={this.handleSubmit}
                />
            </Modal.Body>
        );
    };

    render() {
        const { titleDetail, contactInformSettings, contactInforms } = this.props;
        if (!titleDetail || !contactInformSettings || !contactInforms) {
            return null;
        }

        return (
            <Modal show className="edit-inform-modal-dialog" dialogAs={DraggableModalDialog}
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
                <Modal.Footer>
                    {renderButtonSave({},this.handleSubmit)}
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, contactInformSettings, contactInforms, editedInforms, resultEditContactInforms } = state;
    return { titleDetail, contactInformSettings, contactInforms, editedInforms, resultEditContactInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactInforms);
