import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { remarkEncode, renderButtonSave } from '../common.functions';
import DataGridEdit from './DataGridEdit';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import FilterEditInforms from './FilterEditInforms';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

export class NewInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            saveResult: null
        };
        this.saveNew = React.createRef();
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

    handleSubmit = async () => {
        const { editedInforms } = this.props;
        const newData = remarkEncode(editedInforms);

        if (this.props.filterData.errors.title === 'err') {
            this.saveNew.current.handleValidate();
        } else {
            await this.props.insertInforms({...this.props.filterData.values, informs: newData});
            this.setAlert();
        }
    };

    render() {
        const { allSettings, newInforms, exportNewInforms } = this.props;
        if (!allSettings) {
            return null;
        }

        return (
            <Modal show className="new-inform-modal-dialog modal-edit" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
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
                        ref={this.saveNew}
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
                                handleSubmit={this.handleSubmit}
                            />
                        )
                    }
                </Modal.Body>

                <Modal.Footer>
                    {renderButtonSave(false, true, this.handleSubmit)}
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, newInforms, editedInforms, filterData, resultInsertInforms } = state;
    return { allSettings, newInforms, editedInforms, filterData, resultInsertInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInforms);
