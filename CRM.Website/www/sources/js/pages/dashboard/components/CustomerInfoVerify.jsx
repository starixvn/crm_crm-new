import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, ProgressBar } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export class CustomerInfoVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            energy: 0,
            numberVerified: 0
        };
    }

    componentDidMount() {
        this.props.getCustomerInfoVerify({ customerId: this.props.id });
    }

    componentDidUpdate(prevProps) {
        const { customerInfoVerify } = this.props;
        const listVerify = [];
        let countVerified = 0;
        if (customerInfoVerify !== prevProps.customerInfoVerify) {
            listVerify.push(customerInfoVerify.isVerifyEmail);
            listVerify.push(customerInfoVerify.isVerifyPassport);
            listVerify.push(customerInfoVerify.isVerifyBirthday);
            listVerify.push(customerInfoVerify.isVerifySecretCode);
            listVerify.push(customerInfoVerify.isVerifyBetCredit);
            listVerify.push(customerInfoVerify.isVerifyGivenCredit);

            listVerify.forEach(item => {
                if (item === true) {
                    ++countVerified;
                }
            });
            this.setState({
                numberVerified: countVerified,
                energy: Math.round(16.6667*countVerified)
            });
        }
    }

    handleEditCustomerVerifyDialog = () => {
        this.props.setEditCustomerVerifyDialog({ show: true });
    };

    render() {
        const { customerInfoVerify } = this.props;
        const { energy, numberVerified } = this.state;
        if (!customerInfoVerify) {
            return null;
        }

        return (
            <div className="customer-verify">
                <div className="process">
                    <span className="percent-process">{energy}%</span>
                    <ProgressBar now={energy} />
                </div>
                <div className="info-text">{numberVerified}/6 Information Verified</div>
                <Button variant="primary" size="sm" onClick={() => this.handleEditCustomerVerifyDialog()}>
                    {LangHelper.getResource('Verify')}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerInfoVerify } = state;
    return { customerInfoVerify };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoVerify);
