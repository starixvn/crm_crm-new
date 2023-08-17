import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import WithNavigation from '@jsroot/components/WithNavigation';

export class LastFiveRemarkDataGrid extends Component {
    componentDidMount() {
        const param = {custId: this.props.custId};
        this.props.getLastFiveRemark(param);
    }


    componentDidUpdate(prevProps , prevState) {
        if ( this.props.custId !== prevProps.custId ) {
            this.props.getLastFiveRemark({ custId: this.props.custId });
        }
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={8}>{LangHelper.getResource('ID')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('RemarkTitle')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('RemarkContent')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('CreatedDateGM8')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Creator')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('LoggedOn')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        if (this.props.lastFiveRemarks.length > 0) {
            return this.props.lastFiveRemarks.map((item, index) => this.renderRow(item, index));
        }

        return [<Row key='new-remark-body' className="no-data" ><Cell colSpan={6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index) => {
        const userNameFormat = `${item.isGroupHeadLine ? item.userName + ' (Headline)' : item.userName}`;
        return (
            <Row key={index}>
                <Cell className='text-center'>{item.remarkID}</Cell>
                <Cell>{item.remarkName}</Cell>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip id="tooltip-remark-content">
                            <span dangerouslySetInnerHTML={{__html: item.remark.substring(0, 550)}} />
                        </Tooltip>
                    }
                >
                    <Cell className='remark-content'
                        dangerouslySetInnerHTML={{__html: item.remark}}
                    />
                </OverlayTrigger>
                <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createdDate)}</Cell>
                <Cell>{item.creator}</Cell>
                <Cell>{userNameFormat}</Cell>
            </Row>
        );
    };

    handleViewNewRemark = event =>{
        event.preventDefault();
        this.props.navigate(Site.resolveClientUrl('Remark'),
                {state: this.props.currentCustomer}
        );
    };
    

    render() {
        const {lastFiveRemarks} = this.props;
        if(!lastFiveRemarks){
            return null;
        }
        return (
            <div className="table-last-five-remarks mb-5">
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('LastRemark')}</span>
                    <u onClick={this.handleViewNewRemark}>{LangHelper.getResource('ViewAllRemarks')}</u>
                </div>
                <Table
                    minWidth={960}
                    width={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    adjustedHeight={10}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        lastFiveRemarks
    } = state;
    return {
        lastFiveRemarks
    };
};

const FunctionBarWithNavigation = WithNavigation(LastFiveRemarkDataGrid);
export default connect(mapStateToProps, mapDispatchToProps)(FunctionBarWithNavigation);