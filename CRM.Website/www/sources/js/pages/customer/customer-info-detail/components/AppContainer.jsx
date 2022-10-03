import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import EditForm from './EditForm';
import { FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {

    static propTypes = {
        getCustomerById: PropTypes.func
    };

    static defaultProps = {
        getCustomerById: function () {
            //nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            customerInfoPolicy: null,
            updateHeadlineInfoPolicy: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({customerInfoPolicy: response});
        });

        getPermission(FunctionKey.Updateheadlineinfo).then(response => {
            this.setState({updateHeadlineInfoPolicy: response});
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    render() {
        const {customerInfoPolicy, updateHeadlineInfoPolicy} = this.state;
        if(!customerInfoPolicy || !updateHeadlineInfoPolicy){
            return null;
        }

        return (
            <div>
                <EditForm id={this.props.id} customerInfoPolicy={customerInfoPolicy} updateHeadlineInfoPolicy={updateHeadlineInfoPolicy}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);
