import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import functions from '../common.functions';
import ConfirmAssignedDirectAccount from './ConfirmAssignedDirectAccount';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Select from '@jsroot/components/CustomReactSelect';

export class AssignPic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxUsername: 10000,
            headlineOptions: [],
            picOptions: [],
            isShowConfirmPopup: false,
            oldAssignPicFilter: {
                headline: null,
                pics: [],
                directAccount: []
            },
            validate: {
                show: false,
                errMsg: []
            }
        };
    }

    componentDidMount = () => {
        const headlineOptions = this.props.settings.headlineList.map(item => {
            return {
                value: item.id,
                label: item.name
            };
        });

        const picOptions = this.props.settings.picList.map(item => {
            return {
                value: item.picId,
                label: `${item.username} (${item.roleName})`
            };
        });

        this.setState({
            headlineOptions,
            picOptions
        });

        this.props.setAssignPicResult({ show: false });
        if (this.props.data && this.props.data.headlineId) {
            const { headlineId, accountNames } = this.props.data;
            const headline = headlineOptions.filter(item => item.value === headlineId)[0];
            const assignPicFilter = {
                headline,
                pics: [],
                directAccount: accountNames.map(item => this.handleIsValidItem(item, true)),
                isSelectedAll: false
            };

            this.props.setAssignPicFilter(assignPicFilter);
            this.setState({ oldAssignPicFilter: assignPicFilter });
        }
    };

    handleHeadlineChange = value =>
        this.props.setAssignPicFilter({
            ...this.props.assignPicFilter,
            headline: value
        });

    handlePicChange = value =>
        this.props.setAssignPicFilter({
            ...this.props.assignPicFilter,
            pics: value
        });

    renderRelatedCustomerItem = (item, index) =>
        <div key={index} className={this.getRelatedCustomerItemClassName(item.isValid)}>
            <span>{item.username}</span>
            <span className='fa fa-close' onClick={() => this.handleRemoveDirectAccount(index)} />
        </div>;

    getRelatedCustomerItemClassName = isValid => {
        let className = 'related-customer-item';
        if (!isValid) {
            className += ' invalid';
        }

        if (this.props.assignPicFilter.isSelectedAll) {
            className += ' selected';
        }

        return className;
    };

    handleRemoveDirectAccount = index => {
        const directAccount = [ ...this.props.assignPicFilter.directAccount ];
        directAccount.splice(index, 1);
        this.props.setAssignPicFilter({
            ...this.props.assignPicFilter,
            directAccount
        });
    };

    handleKeyDownRelatedCustomerInput = event => {
        if (event.keyCode !== 8) {
            this.props.setAssignPicFilter({
                ...this.props.assignPicFilter,
                isSelectedAll: false
            });
        }

        if (event.ctrlKey && event.keyCode === 65 && this.inputRef.value === '') {
            this.props.setAssignPicFilter({
                ...this.props.assignPicFilter,
                isSelectedAll: true
            });
        } else {
            this.switchKeyCode(event);
        }
    }

    switchKeyCode = event => {
        switch (event.keyCode) {
            case 8:
                this.handleBackSpaceKeyCode();
                break;
            case 32:
            case 188:
            case 13:
                event.preventDefault();
                this.handleAddCustomerKeyCode();
                break;
            default:
                break;
        }
    };

    handleBackSpaceKeyCode = () => {
        if (this.inputRef.value === '') {
            if (this.props.assignPicFilter.isSelectedAll) {
                this.props.setAssignPicFilter({
                    ...this.props.assignPicFilter,
                    directAccount: [],
                    isSelectedAll: false
                });
            } else {
                const directAccount = [ ...this.props.assignPicFilter.directAccount ];
                directAccount.pop();
                this.props.setAssignPicFilter({
                    ...this.props.assignPicFilter,
                    directAccount
                });
            }
        }
    };

    handleAddCustomerKeyCode = () => {
        const username = this.inputRef.value;
        this.inputRef.value = '';
        if (this.props.assignPicFilter.directAccount.length < this.state.maxUsername) {
            if (username.trim() && !username.includes(',')) {
                const directAccount = [ ...this.props.assignPicFilter.directAccount ];
                directAccount.push({ username, isValid: true });
                this.props.setAssignPicFilter({
                    ...this.props.assignPicFilter,
                    directAccount
                });
            }
        } else {
            this.setOverMaxUnernameWhenAssignPic();
        }
    };

    handleKeyUpRelatedCustomerInput = event => {
        const addKeyCode = [13, 32, 188];
        if (addKeyCode.includes(event.keyCode)) {
            this.inputRef.value = '';
        }
    };

    handlePasteRelatedCustomerInput = event => {
        const newDirectAccount = event.clipboardData.getData('text/plain')
            .replace(/ /g, ',')
            .replace(/\r\n/g, ',')
            .replace(/\n/g, ',')
            .replace(/\t/g, ',')
            .split(',').filter(item => item !== '');

        setTimeout(() => this.inputRef.value = '', 10);
        if (this.props.assignPicFilter.directAccount.length + newDirectAccount.length <= this.state.maxUsername) {
            const directAccount = [
                ...this.props.assignPicFilter.directAccount,
                ...newDirectAccount.map(item => this.handleIsValidItem(item, true))
            ];

            this.props.setAssignPicFilter({
                ...this.props.assignPicFilter,
                directAccount
            });
        } else {
            this.setOverMaxUnernameWhenAssignPic();
        }
    };

    handleIsValidItem = (username, isValid) => {
        return {
            isValid,
            username
        };
    };

    setOverMaxUnernameWhenAssignPic = () =>
        this.props.setAssignPicResult({
            show: true,
            isSuccessful: false,
            message: LangHelper.formatString(LangHelper.getResource('OverMaxUnernameWhenAssignPic'), this.state.maxUsername)
        });

    handleBlurRelatedCustomerInput = () => {
        const directAccount = [ ...this.props.assignPicFilter.directAccount ];
        if (directAccount.length < this.state.maxUsername) {
            if (this.inputRef.value.trim() !== '') {
                directAccount.push({
                    isValid: true,
                    username: this.inputRef.value
                });

                this.props.setAssignPicFilter({
                    ...this.props.assignPicFilter,
                    isSelectedAll: false,
                    directAccount
                });
            } else {
                this.props.setAssignPicFilter({
                    ...this.props.assignPicFilter,
                    isSelectedAll: false
                });
            }
        } else {
            this.setOverMaxUnernameWhenAssignPic();
            this.props.setAssignPicFilter({
                ...this.props.assignPicFilter,
                isSelectedAll: false
            });
        }

        this.inputRef.value = '';
    };

    validateForm = () => {
        const errMsg = [];
        if (!this.props.assignPicFilter.headline) {
            errMsg.push(LangHelper.getResource('GroupHeadlineRequired'));
        }

        if (this.props.assignPicFilter.pics.length === 0) {
            errMsg.push(LangHelper.getResource('PICRequired'));
        }

        if(this.props.assignPicFilter.directAccount.length === 0) {
            errMsg.push(LangHelper.getResource('DirectAccountRequired'));
        }

        if (errMsg.length > 0) {
            this.setState({
                validate: {
                    show: true,
                    errMsg
                }
            });

            return false;
        }

        return true;
    }

    handleSubmit = () => {
        this.setState({
            validate: {
                show: false
            }
        });

        this.props.setAssignPicPopup({
            ...this.props.assignPicPopup,
            isSubmitting: true
        });

        this.props.setAssignPicResult({ show: false });
        if (this.validateForm()) {
            this.props.validateAssignPic({
                headlineId: this.props.assignPicFilter.headline.value,
                picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
                directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
            }).then(this.handleAssignPic);
        } else {
            this.props.setAssignPicPopup({
                ...this.props.assignPicPopup,
                isSubmitting: false
            });
        }
    }

    handleAssignPic = () => {
        const { isSuccessful, errorAccounts, assignedDirectAccounts } = this.props.validateAssignPicResult;
        if (isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length === 0) {
            functions.assignPic({
                headlineId: this.props.assignPicFilter.headline.value,
                picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
                isKeepAssign: true,
                directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
            }, this.callbackAssignPic);
        }

        if (isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length > 0) {
            this.props.setConfirmAssignedDirectAccountPopup({
                show: true,
                data: assignedDirectAccounts
            });
        }

        if (!isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length === 0) {
            this.handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);
        }
    };

    handleNotSuccessfulAndEmptyAssignDirectAccounts = errorAccounts => {
        const messages = [];
        let invalidAccounts = [];
        if (errorAccounts.invalidUsername) {
            invalidAccounts = invalidAccounts.concat(errorAccounts.invalidUsername.split(',').map(item => item.trim()));
            messages.push(
                LangHelper.formatString(
                    LangHelper.getResource('InvalidUsernames'),
                    errorAccounts.invalidUsername
                )
            );
        }

        if (errorAccounts.notDirectAccount) {
            invalidAccounts = invalidAccounts.concat(errorAccounts.notDirectAccount.split(',').map(item => item.trim()));
            messages.push(
                LangHelper.formatString(
                    LangHelper.getResource('TheseAccountsAreNotDirectAccounts'),
                    errorAccounts.notDirectAccount
                )
            );
        }

        if (errorAccounts.noBelongHeadlineAccount) {
            invalidAccounts = invalidAccounts.concat(errorAccounts.noBelongHeadlineAccount.split(',').map(item => item.trim()));
            messages.push(
                LangHelper.formatString(
                    LangHelper.getResource('TheseDirectAccountsDoNotBelongToGroupHeadline'),
                    errorAccounts.noBelongHeadlineAccount
                )
            );
        }

        if (invalidAccounts.length > 0) {
            const directAccount = this.props.assignPicFilter.directAccount
                .map(item => this.handleIsValidItem(item.username, !invalidAccounts.includes(item.username)));

            this.props.setAssignPicFilter({
                ...this.props.assignPicFilter,
                directAccount
            });
        }

        this.props.setAssignPicPopup({
            ...this.props.assignPicPopup,
            isSubmitting: false
        });

        this.props.setAssignPicResult({
            show: true,
            isSuccessful: false,
            messages
        });
    };

    callbackAssignPic = data => {
        const { isSuccessful, message } = data;
        this.props.setAssignPicResult({
            isSuccessful,
            message: isSuccessful ? LangHelper.getResource('AssignPICSuccessfully') : message,
            show: true
        });

        if (data.isSuccessful) {
            setTimeout(this.refreshGrid, 2000);
        } else {
            this.props.setAssignPicPopup({
                ...this.props.assignPicPopup,
                isSubmitting: false
            });
        }
    };

    refreshGrid = () => {
        this.props.setAssignPicPopup({ show: false });
        this.props.setAssignPicFilter({
            headline: null,
            pics: [],
            directAccount: [],
            isSelectedAll: false
        });

        this.props.getGridData(this.props.gridParams, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
    };

    handleCancel = () => {
        if (this.isFilterNotChange()) {
            this.onClose();
        } else {
            this.setState({ isShowConfirmPopup: true });
        }
    };

    isFilterNotChange = () => {
        const assignPicFilter = { ...this.props.assignPicFilter };
        const oldAssignPicFilter = { ...this.state.oldAssignPicFilter };
        return this.isEqualDirectAccountArray(assignPicFilter.directAccount, oldAssignPicFilter.directAccount)
            && assignPicFilter.headline === oldAssignPicFilter.headline
            && assignPicFilter.pics.length === 0;
    };

    isEqualDirectAccountArray = (firstArray, secondArray) => {
        if (firstArray.length !== secondArray.length) {
            return false;
        }

        for (let index = 0; index < firstArray.length; index++) {
            if (firstArray[index].username !== secondArray[index].username) {
                return false;
            }
        }

        return true;
    };

    onClose = () => {
        this.props.setAssignPicPopup({ show: false });
        this.props.setAssignPicFilter({
            headline: null,
            pics: [],
            directAccount: [],
            isSelectedAll: false
        });
    };

    closeAll = () => {
        this.closeConfirmPopup();
        this.onClose();
    };

    closeConfirmPopup = () => this.setState({ isShowConfirmPopup: false });

    render() {
        return (
            <Fragment>
            <Modal
                show backdrop='static' keyboard={false} size='lg' centered
                onHide={() => this.handleCancel()} dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>
                        {LangHelper.getResource('AssignPIC')}
                    </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        {
                            this.state.validate.show &&
                            <Alert variant='danger'>
                                <ul className='list-message-error'>
                                    {
                                        this.state.validate.errMsg.map((message, index) => <li key={index}>{message}</li>)
                                    }
                                </ul>
                            </Alert>
                        }
                        {
                            this.props.assignPicResult.show &&
                            <ResponseMessage isSuccessful={this.props.assignPicResult.isSuccessful}
                                message={this.props.assignPicResult.message}
                                messages={this.props.assignPicResult.messages}
                            />
                        }
                        <Form.Group as={Row}>
                            <Form.Label column sm='4' md='3' className='required'>
                                {LangHelper.getResource('GroupHeadline')}
                            </Form.Label>
                            <Col sm='8' md='9'>
                                <Select
                                    isClearable
                                    onChange={value => this.handleHeadlineChange(value)}
                                    options={this.state.headlineOptions}
                                    value={this.props.assignPicFilter.headline}
                                    placeholder={LangHelper.getResource('PleaseSelect')}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm='4' md='3' className='required'>
                                {LangHelper.getResource('PIC')}
                            </Form.Label>
                            <Col sm='8' md='9'>
                                <Select
                                    isMulti
                                    isClearable
                                    onChange={value => this.handlePicChange(value)}
                                    options={this.state.picOptions}
                                    value={this.props.assignPicFilter.pics}
                                    placeholder={LangHelper.getResource('PleaseSelect')}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm='4' md='3' className='required'>
                                {LangHelper.getResource('DirectAccount')}
                            </Form.Label>
                            <Col sm='8' md='9'>
                                <div className='col-xs-12 related-customer-container' onClick={() => this.inputRef.focus()}>
                                    {
                                        this.props.assignPicFilter.directAccount.map(this.renderRelatedCustomerItem)
                                    }
                                    <input ref={input => this.inputRef = input}
                                        type='text'
                                        onKeyDown={e => this.handleKeyDownRelatedCustomerInput(e)}
                                        onKeyUp={e => this.handleKeyUpRelatedCustomerInput(e)}
                                        onPaste={e => this.handlePasteRelatedCustomerInput(e)}
                                        onBlur={() => this.handleBlurRelatedCustomerInput()}
                                    />
                                </div>
                                <div className='col-xs-12'>
                                    Maximum usernames: {this.state.maxUsername - this.props.assignPicFilter.directAccount.length}
                                </div>
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' size='sm'
                            disabled={this.props.assignPicPopup.isSubmitting}
                            onClick={() => this.handleSubmit()}
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
                this.props.confirmAssignedDirectAccountPopup.show &&
                    <ConfirmAssignedDirectAccount
                        data={this.props.confirmAssignedDirectAccountPopup.data}
                        closeAssignPicPopup={() => this.onClose()}
                    />
            }
            {
                this.state.isShowConfirmPopup &&
                    <ConfirmPopup
                        size='lg'
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ThereAreSomeChangesConfirmMessage')}</div>
                        }
                        onSubmit={() => this.closeAll()}
                        onClose={() => this.closeConfirmPopup()}
                    />
            }
        </Fragment>);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        settings,
        assignPicResult,
        validateAssignPicResult,
        gridParams,
        assignPicFilter,
        confirmAssignedDirectAccountPopup,
        assignPicPopup
    } = state;

    return {
        settings,
        assignPicResult,
        validateAssignPicResult,
        gridParams,
        assignPicFilter,
        confirmAssignedDirectAccountPopup,
        assignPicPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignPic);