import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { remarkEncode, renderButtonSave } from '../common.functions';
import DataGridEdit from './DataGridEdit';
import FilterContactInforms from './FilterContactInforms';
import Site from '@jsroot/common/site';

export class EditContactInforms extends Component {

    static propTypes = {
        titleId: PropTypes.number.isRequired
    };

    static defaultProps = {
        titleId: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            saveResult: null,
            selectedStatuses: '',
            contactInformSettings: null
        };
    }

    componentDidMount() {
        Site.blockUI();
        this.props.getContactInformSettings().then(response =>{
            Site.unblockUI();
            if(response !== undefined && response.data !== null){
                this.props.getTitleDetail({ titleId: this.props.titleId });
                const selectedStatuses = response.data.filterStatuses.map(item =>
                    item.settingId
                ).join();
                const params = { titleId: this.props.titleId, username: '', statusId: selectedStatuses };
                this.setState({ selectedStatuses: selectedStatuses, contactInformSettings: response.data });
                this.props.getContactInforms(params);
            }
        });
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

    handleSubmit = () => {
        const { editedInforms, titleDetail } = this.props;
        const editedContactInforms = remarkEncode(editedInforms);
        if (editedContactInforms.length > 0) {
            this.props.editContactInforms({ titleId: titleDetail.titleId, informs: editedContactInforms }).then(() => {
                this.setAlert();
            });
        }
    };

    renderForm = () => {
        const { contactInforms } = this.props;
        const { selectedStatuses, contactInformSettings } = this.state;

        return(
            <Modal.Body>
                {
                    this.state.saveResult &&
                    <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                        message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                    />
                }

                {
                    selectedStatuses &&
                    (
                        <FilterContactInforms
                            selectedStatuses={selectedStatuses} contactInformSettings={contactInformSettings}
                        />
                    )
                }

                <DataGridEdit
                    status={this.props.status}
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
        const { titleDetail, contactInforms, status, permissions } = this.props;
        const isClosed = status === 'Closed' ? true : false;
        if (!titleDetail || !this.state.contactInformSettings || !contactInforms) {
            return null;
        }

        return (
            <Modal show className="edit-inform-modal-dialog modal-edit" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('UpdateInformHeadlines')}</Modal.Title>
                </Modal.Header>
                {
                    this.renderForm()
                }
                <Modal.Footer>
                    {renderButtonSave(isClosed, permissions.hasHostPermission ,this.handleSubmit)}
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, contactInforms, editedInforms, resultEditContactInforms, permissions } = state;
    return { titleDetail, contactInforms, editedInforms, resultEditContactInforms, permissions };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContactInforms);
