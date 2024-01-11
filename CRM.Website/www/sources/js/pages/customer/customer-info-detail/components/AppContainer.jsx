import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
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
            updateHeadlineInfoPolicy: null
        };
    }

    componentDidMount() {
        getPermission(FunctionKey.UpdateHeadlineInfo, true).then(response => {
            this.setState({ updateHeadlineInfoPolicy: response });
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    componentWillUnmount() {
        this.props.resetState();
    }

    render() {
        const { updateHeadlineInfoPolicy } = this.state;
        const hasReadSitePermission = document.getElementById('hasReadSitePermission').checked;
        if (!hasReadSitePermission) {
            return null;
        }

        return (
            <div>
                <EditForm id={this.props.id} updateHeadlineInfoPolicy={updateHeadlineInfoPolicy} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);