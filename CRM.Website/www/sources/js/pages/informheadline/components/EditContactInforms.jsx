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

export class EditContactInforms extends Component {

    static propTypes = {
        contactInformSettings: PropTypes.shape({ filterStatuses: PropTypes.arrayOf(PropTypes.object).isRequired }).isRequired,
        titleId: PropTypes.number.isRequired
    };

    static defaultProps = {
        contactInformSettings: { filterStatuses: [] },
        titleId: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            saveResult: null,
            selectedStatuses: ''
        };
    }

    componentDidMount() {
        const { contactInformSettings, titleId } = this.props;
        this.props.getTitleDetail({titleId: titleId});

        const selectedStatuses = contactInformSettings.filterStatuses.map(item =>
            item.settingId
        ).join();
        const params = {titleId: titleId, username: '', statusId: selectedStatuses};
        this.setState({ selectedStatuses: selectedStatuses });
        this.props.getContactInforms(params);
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
        const { contactInforms, contactInformSettings, hasHostPermission } = this.props;
        const { selectedStatuses } = this.state;

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
                            selectedStatuses={selectedStatuses}
                        />
                    )
                }

                <DataGridEdit
                    hasHostPermission={hasHostPermission}
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
        const { titleDetail, contactInformSettings, contactInforms, status } = this.props;
        const isClosed = status === 'Closed' ? true : false;
        if (!titleDetail || !contactInformSettings || !contactInforms) {
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
                    {renderButtonSave(isClosed, window.hasHostPermission ,this.handleSubmit)}
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
