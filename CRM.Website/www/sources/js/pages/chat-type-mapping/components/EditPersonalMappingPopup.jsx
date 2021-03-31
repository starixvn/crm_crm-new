import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import MultipleSelect from '../../../components/multiple-select/index';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import CustomReactSelect from '@jsroot/components/CustomReactSelect';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Loading from '@jsroot/components/Loading';
const AccountingPIC = 'Accounting PIC';

export class EditPersonalMappingPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                botId: this.props.updatePersonalMappingData.data.botId,
                name: this.props.updatePersonalMappingData.data.conversationGroupName,
                conversationId: this.props.updatePersonalMappingData.data.conversationId,
                recipientType: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeId : '',
                recipientName: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeName : '',
                groupHeadlines: this.props.updatePersonalMappingData.data.headlines.map(v => v.headlineId).toString(),
                recipient: {
                    value: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientId : '',
                    label: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientName : ''
                },
                letstalkId: this.props.updatePersonalMappingData.data.conversationId,
                languageId: this.props.updatePersonalMappingData.data.languageId,
                remark: this.props.updatePersonalMappingData.data.remark,
                isTest: this.props.updatePersonalMappingData.data.isTest === 1 ? true : false
            },
            groupHeadlineDefault: [{ id: '', name: LangHelper.getResource('AllGroupHeadlineAndNotAssignedGroup'), checked: true }],
            isSubmitting: false,
            settings: {
                letstalkIds: '',
                recipientOptions: [],
                headlineOptions: []
            },
            validate: {
                isShow: false,
                errMsgs: []
            },
            isShowConfirmDirtyForm: false,
            isLoading: false
        };

        this.conversationGroupId = this.props.updatePersonalMappingData.data.conversationGroupId;
        this.initEditPersonalMappingState = null;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.updatePersonalMappingData.data !== null) {
            const recipientId = prevState.form.recipient.value;
            const headlineIds = prevState.form.groupHeadlines.split(',');
            let letstalkIds = '';
            if (nextProps.recipients.length > 0) {
                const selectRecipient = nextProps.recipients.filter(r => r.id === recipientId);
                letstalkIds = selectRecipient.length > 0 ? selectRecipient[0].letstalkIds : '';
            }
            const recipientOptions = nextProps.recipients.map(item => {
                return {
                    value: item.id, label: item.name,
                    letstalkIds: item.letstalkIds
                };
            });
            const headlineOptions = nextProps.groupHeadline;
            headlineOptions.map(headline => {
                const checkedId = headlineIds.some(v => parseInt(v, 10) === headline.id);
                headline['checked'] = checkedId;
            });
            const state = {
                settings: {
                    letstalkIds: letstalkIds,
                    recipientOptions: recipientOptions,
                    headlineOptions: headlineOptions
                }
            };
            return state;
        }

        return null;
    }

    componentDidMount() {
        this.initEditPersonalMappingState = Object.assign({}, this.state.form);
        const initData = this.props.updatePersonalMappingData.data;
        const recipientTypeId = initData.recipients.length > 0 ? initData.recipients[0].recipientTypeId : '';
        const selectedRecipientId = initData.recipients.length > 0 ? initData.recipients[0].recipientId : '';

        this.props.getRecipientByRecipientType(recipientTypeId);
        this.props.getGroupHeadlineByRecipient(selectedRecipientId);
    }

    handleChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            form: { ...prevState.form, ...{ [fieldName]: fieldValue } }
        }));
    };

    handleGroupHeadlineChange = (currentItem, selectedItemsKey) => {
        this.handleChange('groupHeadlines', selectedItemsKey);
    };

    handleRecipientTypeChange = e => {
        const index = e.nativeEvent.target.selectedIndex;
        const label = e.nativeEvent.target[index].text;
        this.handleChange('recipientType', e.target.value);
        this.handleChange('recipientName', label);
        this.handleChange('recipient', { value: '' });
        this.handleChange('groupHeadlines', '');
        this.handleChange('conversationId', '');
        this.handleChange('name', '');
        this.props.getRecipientByRecipientType(e.target.value);
        if (label !== AccountingPIC) {
            this.handleChange('isTest', false);
        }
    };

    handleRecipientChange = option => {
        this.handleChange('recipient', option || '');
        this.handleChange('groupHeadlines', '');
        this.handleChange('conversationId', '');
        this.handleChange('name', '');
        this.setState({
            settings: {
                letstalkIds: option ? option.letstalkIds : []
            }
        });
        const optionValue = option ? option.value : '';
        this.props.getGroupHeadlineByRecipient(optionValue);
    };

    handleLetstalkIdSelect = e => {
        this.setState({ isLoading: true });
        this.handleChange('conversationId', e.target.value);
        this.props.getLetstalkDisplayName(this.state.form.botId, e.target.value).then(() => {
            this.handleChange('name', this.props.letstalkName);
            this.setState({ isLoading: false });
        });
    };

    renderEditPersonalSelectOptions = (item, key) => {
        return (
            <option key={`${key}-${item.name}`} value={item.id}>
                {item.name}
            </option>
        );
    };

    renderLetstalkIdsRadioButton = () => {
        let result = null;
        if (this.state.settings.letstalkIds) {
            const letstalkList = this.state.settings.letstalkIds.split(',');
            result = letstalkList.map((letstalkId, key) => {
                return (
                    <Form.Check key={key} inline label={letstalkId}
                        name='conversationId' type="radio" id={`letstalkId-${key}`}
                        value={letstalkId}
                        onChange={this.handleLetstalkIdSelect}
                        checked={this.state.form.conversationId === letstalkId}
                    />
                );
            });
        }
        return result;
    };

    isValidParams = () => {
        const validateData = this.state.form;
        const errMsg = [];
        let isValid = true;

        if (!validateData.botId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('BotRequired'));
        }

        if (!validateData.recipientType) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientTypeRequired'));
        }

        if (!validateData.recipient) {
            isValid = false;
            errMsg.push(LangHelper.getResource('RecipientRequired'));
        }

        if (!validateData.conversationId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LetstalkIdRequired'));
        }

        if (!validateData.groupHeadlines && validateData.recipientName !== AccountingPIC) {
            isValid = false;
            errMsg.push(LangHelper.getResource('GroupHeadlineRequired'));
        }

        if (!validateData.languageId) {
            isValid = false;
            errMsg.push(LangHelper.getResource('LanguageRequired'));
        }

        this.setState({
            isSubmitting: isValid,
            validate: {
                isShow: !isValid,
                errMsgs: errMsg
            }
        });

        return isValid;
    };

    isDirtyForm = () => JSON.stringify(this.initEditPersonalMappingState) !== JSON.stringify(this.state.form);

    onCloseEditPersonalPopup = () => {
        if (this.isDirtyForm()) {
            this.setState({ isShowConfirmDirtyForm: true });
        } else {
            this.props.closeUpdatePersonalMappingPopup();
        }
    };

    closeConfirmDirtyForm = () => {
        this.setState({
            isShowConfirmDirtyForm: false
        });
    };

    getParams = () => {
        const isTest = this.state.form.isTest ? 1 : 0;
        return {
            conversationGroupId: this.conversationGroupId,
            botId: this.state.form.botId,
            recipientTypeId: this.state.form.recipientType,
            letstalkId: this.state.form.conversationId,
            groupHeadlineIds: this.state.form.recipientName === AccountingPIC ? '' : this.state.form.groupHeadlines,
            recipientIds: this.state.form.recipient.value,
            languageId: this.state.form.languageId,
            remark: this.state.form.remark,
            isTest: this.state.form.recipientName !== AccountingPIC ? null : isTest
        };
    };

    handleEditPersonalSubmitForm = e => {
        this.props.setUpdatePersonalMappingResult(null);
        this.setState({ isSubmitting: true });
        e.preventDefault();

        if (this.isValidParams()) {
            const params = this.getParams();
            this.props.updatePersonalMapping(params).then(() => {
                if (this.props.updatePersonalMappingResult.isSuccessful) {
                    setTimeout(() => {
                        this.props.closeUpdatePersonalMappingPopup();
                        this.props.getGridData(this.props.gridParams);
                    }, 3000);
                } else {
                    this.setState({ isSubmitting: false });
                }
            });
        }
    };

    renderForm = () => {
        const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.state.settings.headlineOptions;

        return (
            <Form onSubmit={this.handleEditPersonalSubmitForm}>
                <Modal.Body>
                    {
                        this.state.validate.isShow &&
                        <Alert variant="danger">
                            <ul className="list-message-error">
                                {
                                    this.state.validate.errMsgs.map((msg, key) => <li key={key}>{msg}</li>)
                                }
                            </ul>
                        </Alert>
                    }
                    {
                        this.props.updatePersonalMappingResult &&
                        <ResponseMessage isSuccessful={this.props.updatePersonalMappingResult.isSuccessful}
                            message={this.props.updatePersonalMappingResult.message || LangHelper.getResource('UpdatePersonalMappingSuccess')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" className="required">
                            {LangHelper.getResource('BotName')}
                        </Form.Label>
                        <Col sm="9" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name='botId'
                                onChange={e => this.handleChange('botId', e.target.value)}
                                value={this.state.form.botId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.bots.map(this.renderEditPersonalSelectOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3">
                            {LangHelper.getResource('LetstalkName')}
                        </Form.Label>
                        <Form.Label column sm="9" md="9">
                            {
                                this.state.isLoading &&
                                <Loading />
                            }
                            {
                                !this.state.isLoading &&
                                this.state.form.name
                            }
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" name="edit-personal">
                            {LangHelper.getResource('ChatType')}
                        </Form.Label>
                        <Form.Label sm="9" md="9" column>
                            {LangHelper.getResource('Personal')}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="3" className="required" sm="3">
                            {LangHelper.getResource('RecipientType')}
                        </Form.Label>
                        <Col sm="9" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                name="recipientTypeId"
                                onChange={e => this.handleRecipientTypeChange(e)}
                                value={this.state.form.recipientType}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.recipientTypes.map(this.renderEditPersonalSelectOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" className="required">
                            {LangHelper.getResource('Recipient')}
                        </Form.Label>
                        <Col sm="9" md="9">
                            <CustomReactSelect
                                className='basic-single'
                                name='recipient'
                                onChange={this.handleRecipientChange}
                                options={this.state.settings.recipientOptions}
                                value={this.state.form.recipient}
                                isSearchable
                                isClearable
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" className="required">
                            {LangHelper.getResource('LetstalkID')}
                        </Form.Label>
                        <Col sm="9" md="9" >
                            {
                                this.renderLetstalkIdsRadioButton(this.selectedLetstalkIds)
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" className="required">
                            {LangHelper.getResource('GroupHeadline')}
                        </Form.Label>
                        <Col sm="9" md="10" className={`${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`}>
                            <MultipleSelect
                                width={'100%'}
                                name="headlineIds"
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                dataSource={groupHeadlinesOption}
                                onChange={this.handleGroupHeadlineChange}
                                isSummited={false}
                                hasSearchBox
                                isDisable={this.state.form.recipientName === AccountingPIC}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" className="required" name="insert-personal-language-label">
                            {LangHelper.getResource('Language')}
                        </Form.Label>
                        <Col sm="9" md="9">
                            <Form.Control size="sm" className="shadow-none" as="select"
                                name="languageId"
                                onChange={e => this.handleChange('languageId', e.target.value)}
                                value={this.state.form.languageId}
                            >
                                <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.settings.languages.map(this.renderEditPersonalSelectOptions)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="3" md="3" >
                            {LangHelper.getResource('Remark')}
                        </Form.Label>
                        <Col sm="9" md="9" name="personal-edit">
                            <Form.Control as="textarea" size="sm" className="shadow-none"
                                name="remark"
                                value={this.state.form.remark}
                                rows={5}
                                onChange={e => this.handleChange('remark', e.target.value)}

                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column md="2" sm="3" />
                        <Col sm="9" md="10" name="checkbox-isTest">
                            <Form.Group className={this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : ''} controlId="isTest-edit-personal">
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('IsTest')}
                                    onChange={event => this.handleChange('isTest', event.target.checked)}
                                    checked={this.state.form.isTest}
                                />
                            </Form.Group>
                        </Col>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={this.state.isSubmitting} id="edit-personal-mapping-submit-btn">
                        {LangHelper.getResource('Submit')}
                    </Button>
                    <Button type="button" variant="primary" size="sm" onClick={this.onCloseEditPersonalPopup}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        return (
            <Fragment>
                <Modal show className="chat-type-mapping-modal edit-personal-mapping" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="lg" centered
                    onHide={this.props.closeUpdatePersonalMappingPopup}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditPersonalMapping')}</Modal.Title>
                    </Modal.Header>
                    {
                        this.renderForm()
                    }

                </Modal>
                {
                    this.state.isShowConfirmDirtyForm &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        onSubmit={this.props.closeUpdatePersonalMappingPopup}
                        onClose={this.closeConfirmDirtyForm}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, recipients, groupHeadline, gridParams, updatePersonalMappingData, updatePersonalMappingResult, letstalkName } = state;
    return {
        settings,
        recipients,
        groupHeadline,
        gridParams,
        letstalkName,
        updatePersonalMappingData,
        updatePersonalMappingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPersonalMappingPopup);