import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import LangHelper from '@jsroot/common/langHelper';
import CkEditor from '@jsroot/components/ckeditor/index';

export class EditCategoryClassification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitting: false,
            remark: null
        }
    };

    getParams = () => {
        const { selectCategoryClass } = this.props;
        const { remark } = this.state;
        const actionEdit = 1, actionDelete = 2;
        const params = {
            mainCategoryID: selectCategoryClass.mainCategoryID,
            subCategoryID: selectCategoryClass.subCategoryID,
            remarkNewValue: remark,
            actionType: remark ? actionEdit : actionDelete
        };
        return params;
    };

    handleChangeCkEditor = value => {
        this.setState({
            remark: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const params = this.getParams();

        this.props.editCategoryClass(params).then(() => {
            if (this.props.editCategoryClassResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                this.setState({isSubmitting: true});
            }
        });
    };

    renderForm = () => {
        const { selectCategoryClass, editCategoryClassResult } = this.props;

        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Modal.Body>
                    {
                        editCategoryClassResult &&
                        <ResponseMessage isSuccessful={editCategoryClassResult.isSuccessful}
                            message={editCategoryClassResult.message || LangHelper.getResource('UpdateRemarkSuccessfully')}
                        />
                    }
                    <Form.Group>
                        <Form.Label column sm="8" md="8" htmlFor="mainCategoryID">
                            {LangHelper.getResource('Category')}
                            <div><b>{selectCategoryClass.mainCategory}</b></div>
                        </Form.Label>
                        <Form.Label column sm="4" md="4" htmlFor="subCategoryID">
                            {LangHelper.getResource('SubCategory')}
                            <div><b>{selectCategoryClass.subCategory}</b></div>
                        </Form.Label>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label column sm="12" md="12" htmlFor="remark">
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <CkEditor
                            className='col-md-12 col-sm-12'
                            name='remarkContent'
                            data={selectCategoryClass.remark}
                            username={window.currentUsername}
                            onChange={value => this.handleChangeCkEditor(value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.handleSubmit} disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Save')}
                    </Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        return (
            <Modal show className="category-classification-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('EditRemark')}</Modal.Title>
                </Modal.Header>
                {this.renderForm()}
            </Modal>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { selectCategoryClass, editCategoryClassResult } = state;
    return {
        selectCategoryClass,
        editCategoryClassResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryClassification);