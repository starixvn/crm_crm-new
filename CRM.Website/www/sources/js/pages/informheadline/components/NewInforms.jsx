import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DataGridEdit from './DataGridEdit';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import FilterEditInforms from './FilterEditInforms';

export class NewInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveResult: null
        };
    }

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultInsertInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
            this.props.setNewInformDialog({show: false});
            this.props.getInforms();
        }, 3000);
    };

    render() {
        const { allSettings, newInforms, exportNewInforms, gridData } = this.props;
        if (!allSettings) {
            return null;
        }

        return (
            <Modal show className="edit-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                className="modal-edit"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('NewInformHeadlines')}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        this.state.saveResult &&
                        <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                            message={this.state.saveResult.message || LangHelper.getResource('AddNewCaseSuccessfully')}
                        />
                    }

                    <FilterEditInforms
                        detail=''
                        informData={newInforms}
                        exportExcel={exportNewInforms}
                        isNewInform={true}
                    />

                    {
                        newInforms && (
                            <DataGridEdit
                                informData={newInforms}
                                informSettings={allSettings}
                                totalItem={newInforms.length}
                                setAlert={this.setAlert}
                                gridDataEdit={gridData}
                                dataEdit={null}
                                edit={this.props.insertInforms}
                            />
                        )
                    }
                </Modal.Body>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, newInforms, gridParams, gridData, resultInsertInforms } = state;
    return { allSettings, newInforms, gridParams, gridData, resultInsertInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInforms);
