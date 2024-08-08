import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { isEitherExitsFromToId, isFromIdOverToId, isExceedMaxInt } from '../common.functions';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           policy: null
        };
        this.isLoadGrid = this.props.isLoadGrid;
    }

    componentDidMount() {
        getPermission(FunctionKey.NotificationCenter).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('NotificationCenter');

        const { filterParams } = this.props;
        if (this.isLoadGrid) {
            if (this.isMeetRequired(filterParams)) {
                this.props.getGridData(filterParams);
            }
            window.history.replaceState(null, '');
        }
        if (this.props.gridParams.fromDate) {
            this.isLoadGrid = true;
            if (this.isMeetRequired(this.props.gridParams)) {
                this.props.getGridData(this.props.gridParams);
            }
        }
        this.props.setAutoRefresh({
            ...this.props.autoRefresh,
            isSubmit: true,
            countDown: this.props.autoRefresh.value
        });
    };

    componentWillUnmount() {
        this.props.setGridData(null);
    };

    isMeetRequired = filter => !isEitherExitsFromToId(filter) && !isFromIdOverToId(filter) && !isExceedMaxInt(filter);

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
                <Filter isLoadGrid={this.isLoadGrid} filterParams={this.props.filterParams || this.props.gridParams}/>
                <DataGrid isHost={isHost}/>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        autoRefresh
    } = state;

    return {
        gridParams,
        autoRefresh
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);