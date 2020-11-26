import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import functions from '../common.functions';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Select from '@jsroot/components/CustomReactSelect';
import ResponseMessage from '@jsroot/components/ResponseMessage';

export class DefaultPic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picOptions: [],
            pics: [],
            oldPics: [],
            isShowConfirmPopup: false,
            isSubmitting: false,
            responseMesssage: {
                show: false
            }
        };
    }

    componentDidMount = () => {
        const picOptions = this.props.settings.picList.map(item => {
            return {
                value: item.picId,
                label: `${item.username} (${item.roleName})`
            };
        });

        this.setState({ picOptions });
        if (this.props.defaultPicPopup.pics) {
            this.setState({
                pics: this.props.defaultPicPopup.pics,
                oldPics: this.props.defaultPicPopup.pics
            });
        }
    };

    handlePicChange = pics => this.setState({ pics });

    handleCancel = () => {
        if (this.isEqualPicArray(this.state.pics, this.state.oldPics)) {
            this.props.setDefaultPicPopup({ show: false });
        }

        this.toggleConfirmPopup();
    };

    isEqualPicArray = (firstArray, secondArray) => {
        if (firstArray.length !== secondArray.length) {
            return false;
        }

        for (let index = 0; index < firstArray.length; index++) {
            if (firstArray[index].value !== secondArray[index].value) {
                return false;
            }
        }

        return true;
    };

    toggleConfirmPopup = () => this.setState({ isShowConfirmPopup: !this.state.isShowConfirmPopup });

    handleRemoveDefaultPic = headlineId => {
        this.setState({ isSubmitting: true });
        functions.removeDefaultPic({ headlineId }, data => this.callback(data, LangHelper.getResource('RemoveDefaultPICSuccessfully')));
    };

    callback = (data, defaultMessage) => {
        const { isSuccessful, message } = data;
        this.setState({
            responseMesssage: {
                isSuccessful,
                message: message ? message : defaultMessage,
                show: true
            }
        });

        if (data.isSuccessful) {
            setTimeout(this.refreshGrid, 2000);
        } else {
            this.setState({ isSubmitting: false });
        }
    }

    refreshGrid = () => {
        this.props.setDefaultPicPopup({ show: false });
        this.props.getGridData(this.props.gridParams, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
    };

    handleSubmitSetDefaultPIC = headlineId => {
        this.setState({ isSubmitting: true });
        if (this.state.pics.length === 0) {
            this.setState({
                isSubmitting: false,
                responseMesssage: {
                    show: true,
                    isSuccessful: false,
                    message: LangHelper.getResource('DefaultPICRequired')
                }
            });
        } else {
            const params = {
                headlineId,
                defaultPicIDs: this.state.pics.map(item => item.value).toString()
            };

            functions.setDefaultPic(params, data => this.callback(data, LangHelper.getResource('SetDefaultPICSuccessfully')));
        }
    };

    closeAll = () => {
        this.props.setDefaultPicPopup({ show: false });
        this.toggleConfirmPopup();
    };

    render() {
        const { headline, pics } = this.props.defaultPicPopup;

        return <Fragment>
            <Modal
                show backdrop='static' keyboard={false} size='lg' centered
                onHide={() => this.handleCancel()} dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>
                        {LangHelper.getResource(pics && pics.length > 0 ? 'UpdateDefaultPIC' : 'SetDefaultPIC')}
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        {
                            this.state.responseMesssage.show &&
                            <ResponseMessage
                                isSuccessful={this.state.responseMesssage.isSuccessful}
                                message={this.state.responseMesssage.message}
                            />
                        }
                        <Form.Group as={Row}>
                            <Form.Label column sm='4' md='3' className='required'>
                                {LangHelper.getResource('GroupHeadline')}
                            </Form.Label>
                            <Form.Label column sm='8' md='9'>
                                {headline.name}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm='4' md='3' className='required'>
                                {LangHelper.getResource('DefaultPIC')}
                            </Form.Label>
                            <Col sm='8' md='9'>
                                <Select
                                    isMulti
                                    onChange={value => this.handlePicChange(value)}
                                    options={this.state.picOptions}
                                    value={this.state.pics}
                                    placeholder={LangHelper.getResource('PleaseSelect')}
                                />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            this.props.defaultPicPopup.pics && this.props.defaultPicPopup.pics.length > 0 &&
                            <Button variant='primary' size='sm'
                                disabled={this.state.isSubmitting}
                                onClick={() => this.handleRemoveDefaultPic(headline.id)}
                            >
                                {LangHelper.getResource('Remove')}
                            </Button>
                        }
                        <Button variant='primary' size='sm'
                            disabled={this.state.isSubmitting}
                            onClick={() => this.handleSubmitSetDefaultPIC(headline.id)}
                        >
                            {LangHelper.getResource('Save')}
                        </Button>
                        <Button variant='primary' size='sm' onClick={() => this.handleCancel()}>
                            {LangHelper.getResource('Cancel')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {
                this.state.isShowConfirmPopup &&
                <ConfirmPopup
                    size='lg'
                    title={LangHelper.getResource('Confirmation')}
                    content={
                        <div>{LangHelper.getResource('ThereAreSomeChangesConfirmMessage')}</div>
                    }
                    onSubmit={() => this.closeAll()}
                    onClose={() => this.toggleConfirmPopup()}
                />
            }
        </Fragment>;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        settings,
        defaultPicPopup,
        gridParams
    } = state;

    return {
        settings,
        defaultPicPopup,
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPic);