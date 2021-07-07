import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row, Alert } from 'react-bootstrap';
import RelatedCustomerGrid from './RelatedCustomerGrid';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';

export class AddRelatedCustomerDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            verified: false,
            relatedCustomers: [...this.props.addRelatedCustomerDialog.relatedCustomers],
            isSelectedAll: false,
            errMsgs: []
        };

        this.maximumRelatedCustomers = 10000;
    }

    renderRelatedCustomerItem = (customer, index) => {
        let className = 'related-customer-item';
        if (!customer.isValid) {
            className += ' invalid';
        }

        if (this.state.isSelectedAll) {
            className += ' selected';
        }

        return (
            <div key={index} className={className}>
                <span>{customer.username}</span>
                <span className='fa fa-times ml-2' onClick={() => this.removeRelatedCustomerItem(customer)} />
            </div>
        );
    };

    addRelatedCustomerItem = username => {
        const MAX_CHARS = 30;
        const relatedCustomers = [...this.state.relatedCustomers];
        const totalItems = relatedCustomers.length;
        if (username !== undefined && username !== '' && totalItems < this.maximumRelatedCustomers) {
            username = username.length > MAX_CHARS ? username.substring(0, MAX_CHARS) + '...' : username;

            this.setState(prevState => {
                return {
                    relatedCustomers: [...prevState.relatedCustomers, { index: totalItems + 1, username, isValid: true }]
                };
            });
        }

        setTimeout(() => this.inputRef.value = '', 10);
    };

    removeRelatedCustomerItem = customer => {
        const relatedCustomers = [...this.state.relatedCustomers];
        let errMsgs = [...this.state.errMsgs];
        const index = relatedCustomers.indexOf(customer);
        if (index > -1) {
            relatedCustomers.splice(index, 1);
        }

        if (relatedCustomers.length === 0) {
            errMsgs = [];
        }

        this.setState({
            relatedCustomers,
            errMsgs
        });
    };

    handleKeyDownRelatedCustomer = event => {
        // ctrl + a
        if (event.ctrlKey && event.keyCode === 65 && this.inputRef.value === '') {
            this.setState({ isSelectedAll: true });
            return;
        }

        let { relatedCustomers, isSelectedAll, errMsgs } = this.state;
        switch (event.keyCode) {
            case 8: // backspace
                if (this.inputRef.value === '') {
                    if (isSelectedAll) {
                        relatedCustomers = [];
                        isSelectedAll = false;
                    } else {
                        relatedCustomers.pop();
                    }

                    if (relatedCustomers.length === 0) {
                        errMsgs = [];
                    }

                    this.setState({
                        relatedCustomers,
                        isSelectedAll,
                        errMsgs
                    });

                    return;
                }
                break;
            case 13: // enter
            case 32: // space
            case 188: // semicolon
                event.preventDefault();
                this.inputRef.value = this.inputRef.value.replace(',', '');
                this.addRelatedCustomerItem(this.inputRef.value);
                break;
            default:
                break;
        }
    };

    handlePasteRelatedCustomer = event => {
        const items = (event.clipboardData || window.clipboardData).getData('text/plain')
            .replace(/ /g, ',')
            .replace(/\r\n/g, ',')
            .replace(/\n/g, ',')
            .replace(/\t/g, ',')
            .split(',').filter(item => item !== '');

        const totalItems = this.state.relatedCustomers.length + items.length;
        const errMsgs = [];
        if (totalItems > this.maximumRelatedCustomers) {
            errMsgs.push(`You are not allowed to input over ${this.maximumRelatedCustomers} usernames. Please check it!`);

            setTimeout(() => this.inputRef.value = '', 10);
            this.setState({ errMsgs });

            return;
        }

        items.forEach(item => {
            this.addRelatedCustomerItem(item);
        });
    };

    handleBlurRelatedCustomer = () => {
        this.setState({ isSelectedAll: false });
        this.addRelatedCustomerItem(this.inputRef.value);
    };

    handleCloseAddRelatedCustomerDialog = () => {
        this.props.setRelatedCustomerResults([...this.props.addRelatedCustomerDialog.relatedCustomerResults]);
        this.props.setAddRelatedCustomerDialog({ show: false });
    }

    verifyRelatedCustomers = () => {
        const errMsgs = [];
        this.setState({ verified: true });
        if (this.state.relatedCustomers.length === 0 && !this.props.addRelatedCustomerDialog.isEdit) {
            errMsgs.push(LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Username')));
            this.setState({ errMsgs });
            return;
        }

        const headlines = this.props.verifyCustomerResults.filter(item => item.isHeadline || item.isDirectAccount),
            headlineIds = headlines.map(x => x.custId).join(','),
            username = this.state.relatedCustomers.map(x => x.username)
                .filter((value, index, self) => self.indexOf(value) === index).join(',');

        Site.blockUI();
        this.props.verifyRelatedCustomers({ headlineIds, username }).then(response => {
            const relatedCustomers = [...this.state.relatedCustomers].map(item => {
                const index = response.data.findIndex(x => x.username.toLowerCase() === item.username.toLowerCase() && x.resultTypeId > 0);
                return {
                    ...item,
                    isValid: index > -1 ? false : true
                };
            });
            let relatedCustomerResults = headlines.map(item => {
                return {
                    ...item,
                    relatedCustomers: response.data.filter(x => x.headlineId === item.custId)
                };
            });

            let invalidRelatedCustomers = response.data.filter(item => item.resultTypeId === 1);
            if (invalidRelatedCustomers.length > 0) {
                errMsgs.push('Invalid usernames: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
            }

            invalidRelatedCustomers = response.data.filter(item => item.resultTypeId === 2 || item.resultTypeId === 3);
            if (invalidRelatedCustomers.length > 0) {
                errMsgs.push('The system does not support to add related customer for deposit and guest customer. Please check usernames: '
                    + invalidRelatedCustomers.map(x => x.username).join(', '));
            }

            invalidRelatedCustomers = response.data.filter(item => item.resultTypeId === 4);
            if (invalidRelatedCustomers.length > 0) {
                errMsgs.push('These usernames do not belong to any headline or direct accounts without group headline: '
                    + invalidRelatedCustomers.map(x => x.username).join(', '));
            }

            invalidRelatedCustomers = response.data.filter(item => item.resultTypeId === 5);
            if (invalidRelatedCustomers.length > 0) {
                errMsgs.push('You are not allowed to add related customers for itself. Please check usernames: '
                    + invalidRelatedCustomers.map(x => x.username).join(', '));
            }

            invalidRelatedCustomers = response.data.filter(item => item.resultTypeId === 6);
            if (invalidRelatedCustomers.length > 0) {
                errMsgs.push('The system does not support to add related customer for internal accounts. Please check usernames: '
                    + invalidRelatedCustomers.map(x => x.username).join(', '));
            }

            if (errMsgs.length > 0) {
                relatedCustomerResults = [];
            }

            this.setState({
                relatedCustomers,
                errMsgs
            });

            this.props.setRelatedCustomerResults(relatedCustomerResults);

            Site.unblockUI();
        });
    }

    handleSubmit = () => {
        this.props.setAddRelatedCustomerDialog({ show: false });
    }

    render() {
        const { relatedCustomers, errMsgs, verified } = this.state;
        const { addRelatedCustomerDialog, relatedCustomerResults } = this.props;
        return (
            <Modal show className="add-related-customer-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.handleCloseAddRelatedCustomerDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">
                        {LangHelper.getResource(addRelatedCustomerDialog.isEdit ? 'UpdateRelatedCustomers' : 'AddRelatedCustomers')}
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate>
                    <Modal.Body>
                        {
                            errMsgs.length > 0 &&
                            <Alert variant='danger'>
                                <ul className='list-message-error'>
                                    {
                                        errMsgs.map((message, index) => <li key={index}>{message}</li>)
                                    }
                                </ul>
                            </Alert>
                        }
                        <Form.Group as={Row}>
                            <Form.Label column sm="3" md="3" className={addRelatedCustomerDialog.isEdit ? '' : 'required'}>
                                {LangHelper.getResource('Username')}
                            </Form.Label>
                            <Col sm="3" md="9">
                                <div className="related-customer-container" onClick={() => this.inputRef.focus()}>
                                    {
                                        relatedCustomers.map(this.renderRelatedCustomerItem)
                                    }
                                    <input ref={input => this.inputRef = input} type="text"
                                        onKeyDown={this.handleKeyDownRelatedCustomer}
                                        onPaste={this.handlePasteRelatedCustomer}
                                        onBlur={this.handleBlurRelatedCustomer}
                                    />
                                </div>
                                <div className="maximum-related-customer">
                                    Maximum usernames: {this.maximumRelatedCustomers - relatedCustomers.length}
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col className="text-right">
                                <Button variant="primary" size="sm" onClick={this.verifyRelatedCustomers}>
                                    {LangHelper.getResource('Verify')}
                                </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col>
                                <RelatedCustomerGrid />
                            </Col>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}
                            disabled={relatedCustomerResults.length === 0 || !verified}
                        >
                            {LangHelper.getResource('Save')}
                        </Button>
                        <Button variant="primary" size="sm" onClick={this.handleCloseAddRelatedCustomerDialog}>
                            {LangHelper.getResource('Cancel')}
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        verifyCustomerResults, addRelatedCustomerDialog, relatedCustomerResults
    } = state;
    return {
        verifyCustomerResults, addRelatedCustomerDialog, relatedCustomerResults
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRelatedCustomerDialog);