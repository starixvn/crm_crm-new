import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { isEitherExitsFromToId, isFromIdOverToId } from '../common.functions';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           policy: null
        };
    }

    componentDidMount() {
        getPermission(FunctionKey.MessageNotificationCenter).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('MessageNotificationCenter');

        const { isLoadGrid, filterParams } = this.props;
        if (isLoadGrid) {
            if (!isEitherExitsFromToId(filterParams) && !isFromIdOverToId(filterParams)) {
                this.props.getGridData(filterParams);
            }
            window.history.replaceState(null, '');
        }
    };

    componentWillUnmount() {
        console.log('ooooo');
        this.props.setGridData(null);
    };

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
                <Filter isLoadGrid={this.props.isLoadGrid} filterParams={this.props.filterParams}/>
                <DataGrid isHost={isHost}/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        cancelAnnouncementPopup,
        contentPopup,
        gridParams
    } = state;

    return {
        cancelAnnouncementPopup,
        contentPopup,
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);