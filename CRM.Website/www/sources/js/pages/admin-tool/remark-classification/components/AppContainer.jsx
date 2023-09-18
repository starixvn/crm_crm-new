import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';


export class AppContainer extends Component {
    static propTypes = {
        editRemarkPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        editRemarkPopup: { show: false },
        getAllSettings: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    };

    componentDidMount() {
        getPermission(FunctionKey.RemarkClassification).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('RemarkClassification');
    };

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
            </Fragment>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);