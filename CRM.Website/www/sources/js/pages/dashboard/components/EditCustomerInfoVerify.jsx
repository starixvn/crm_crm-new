import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import DateTimeService from '@jsroot/common/dateTimeService';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import { Policy } from '@jsroot/common/constants';

export class EditCustomerInfoVerify extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isSubmitting: false,
            editResult: null
        };
    }

    componentDidMount() {
        const info = this.props.customerInfoVerify;
        const data = [];
        data.push({ name: 'Email', value: info.email, isChecked: info.isVerifyEmail });
        data.push({ name: 'Passport Number', value: info.passport, isChecked: info.isVerifyPassport });
        data.push({ name: 'BirthDay', value: DateTimeService.toShortDateFormat(info.birthDay), isChecked: info.isVerifyBirthday });
        data.push({ name: 'Secret Code', value: info.secretCode, isChecked: info.isVerifySecretCode });
        data.push({ name: 'Bet Credit', value: `${info.betCredit}.00`, isChecked: info.isVerifyBetCredit });
        data.push({ name: 'Given Credit', value: `${info.givenCredit}.00`, isChecked: info.isVerifyGivenCredit });
        this.setState({ data: data });
    }

    handleChange = index => {
        const data = [...this.state.data];
        data[index].isChecked = !data[index].isChecked;
        this.setState({ data: data });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { data } = this.state;
        const params = {
            customerId: this.props.id,
            isVerifyEmail: data[0].isChecked,
            isVerifyPassport: data[1].isChecked,
            isVerifyBirthday: data[2].isChecked,
            isVerifySecretCode: data[3].isChecked,
            isVerifyBetCredit: data[4].isChecked,
            isVerifyGivenCredit: data[5].isChecked
        };
        Site.blockUI();
        this.setState({ isSubmitting: true });
        this.props.editCustomerVerify(params).then(response => {
            Site.unblockUI();
            this.setState({ editResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose(true);
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        });
    };

    render() {
        const { customerInfoVerify } = this.props;
        const { data, isSubmitting, editResult } = this.state;
        if (!customerInfoVerify || !data) {
            return null;
        }

        return (
            <div>
                <Modal show className="customer-modal-dialog" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="md" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('VerifyCustomerInfo')}</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.handleSubmit}>
                        {
                            editResult &&
                            <ResponseMessage isSuccessful={editResult.isSuccessful}
                                message={editResult.message || LangHelper.getResource('UpdateVerifyFlagSuccessfully')}
                            />
                        }
                        <Modal.Body>
                            <Table bordered hover>
                                <tbody>
                                    {
                                        data.map((item, key) => (
                                            <tr key={key}>
                                                <td>
                                                    <div className="check-customer">
                                                        <input type="checkbox" checked={item.isChecked} onChange={() => this.handleChange(key)}/>
                                                        <span className="check-name">{item.name}</span>
                                                    </div>
                                                </td>
                                                <td className={item.name === 'Email' ? 'label-email' : ''}>{item.value}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Modal.Body>
                        {
                            window.createUpdateFeedbackPermission === Policy.Host &&
                            (
                                <Modal.Footer>
                                    <Button size="sm" variant="primary" type="submit" onClick={this.handleSubmit} disabled={isSubmitting}>
                                        {LangHelper.getResource('Save')}
                                    </Button>
                                </Modal.Footer>
                            )
                        }
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerInfoVerify } = state;
    return { customerInfoVerify };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomerInfoVerify);
