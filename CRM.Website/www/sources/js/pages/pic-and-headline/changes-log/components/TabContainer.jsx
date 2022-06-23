import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import AppContainer from './AppContainer';
import LangHelper from '@jsroot/common/langHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class TabContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'headlineDA'
        };
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    render() {
        return (
            <Tabs
                id="controlled-tab"
                activeKey={this.state.tab}
                onSelect={k => this.setState({tab: k})}
            >
                <Tab eventKey="headlineDA" title={LangHelper.getResource('HeadlineDirectAccount')}>
                    <AppContainer tab={1}/>
                </Tab>
                <Tab eventKey="pic" title="PIC">
                    <AppContainer tab={2}/>
                </Tab>
            </Tabs>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
export default connect(null, mapDispatchToProps)(TabContainer);
