import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, ProgressBar } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { RoleIds } from '@jsroot/common/constants';

export class CustomerInfoVerify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            energy: 0,
            numberVerified: 0,
            listVerify: []
        };
    }

    componentDidMount() {
        this.props.getCustomerInfoVerify({ customerId: this.props.id });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.id !==  this.props.id) {
            this.props.getCustomerInfoVerify({ customerId: this.props.id }).then(() =>{
                this.handleInitData();
            });
        }

        if(JSON.stringify(prevProps.customerInfoVerify) !== JSON.stringify(this.props.customerInfoVerify)){
            this.handleInitData();
        }
    }

    handleInitData = () =>{
        const { customerInfoVerify } = this.props;
        const listVerify = [];
        let countVerified = 0;
        listVerify.push(customerInfoVerify.isVerifyEmail);
        listVerify.push(customerInfoVerify.isVerifyPassport);
        listVerify.push(customerInfoVerify.isVerifyBirthday);
        listVerify.push(customerInfoVerify.isVerifySecretCode);
        if(this.props.id > 0 && (customerInfoVerify.roleId === RoleIds.Member || customerInfoVerify.roleId === RoleIds.CRMMember)){
            listVerify.push(customerInfoVerify.isVerifyBetCredit);
        }
        if(this.props.id > 0 && (customerInfoVerify.roleId === RoleIds.Member || customerInfoVerify.roleId === RoleIds.CRMMember) && customerInfoVerify.isCredit){
            listVerify.push(customerInfoVerify.isVerifyGivenCredit);
        }

        listVerify.forEach(item => {
            if (item === true) {
                ++countVerified;
            }
        });
        this.setState({
            listVerify,
            numberVerified: countVerified,
            energy: Math.round((countVerified/listVerify.length)*100)
        });
    };

    handleEditCustomerVerifyDialog = () => {
        this.props.setEditCustomerVerifyDialog({ show: true });
    };

    render() {
        const { customerInfoVerify } = this.props;
        const { energy, numberVerified, listVerify } = this.state;
        if (!customerInfoVerify) {
            return null;
        }

        return (
            <div className="customer-verify">
                <div className="process">
                    <span className="percent-process">{energy}%</span>
                    <ProgressBar now={energy} />
                </div>
                <div className="info-text">{numberVerified}/{listVerify.length} Information Verified</div>
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
