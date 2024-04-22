import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import DataGrid from './DataGrid';
import ActionNotification from './ActionNotification';
import AffectedTicket from './AffectedTicket';
import DateTimeService from '@jsroot/common/dateTimeService';
import { isEitherExitsFromToId, isFromIdOverToId } from '../common.functions';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
           policy: null
        };
    }

    componentDidMount() {
        const { isLoadGrid, filterParams } = this.props;
        if (isLoadGrid) {
            if (!isEitherExitsFromToId(filterParams) && !isFromIdOverToId(filterParams)) {
                console.log('container true', filterParams);

                this.props.getGridData(filterParams);
            } else {
                console.log('container fali', filterParams);
            }
            window.history.replaceState(null, '');
        }
    };

    // componentWillUnmount(){
    //     this.props.setGridData(null);
    // }

    render() {
        console.log('this.props.isLoadGrid', this.props.isLoadGrid);
        console.log('this.props.filterParams', this.props.filterParams);
        return (
            <Fragment>
                <Filter isLoadGrid={this.props.isLoadGrid} filterParams={this.props.filterParams}/>
                <DataGrid isHost={true}/>
                {/* <AffectedTicket isCredit/> */}
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