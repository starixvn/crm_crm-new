import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';

export class LastFiveRemarkDataGrid extends Component {
    constructor(props) {
        super(props);
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

    buildBody = isHost => {
        if (this.props.lastFiveRemarks.length > 0) {
            return this.props.lastFiveRemarks.map((item, index) => this.renderRow(item, index, isHost));
        }

        return [<Row key='new-remark-body' className="no-data" ><Cell colSpan={6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index, isHost) => {
        const userNameFormat = `${item.isGroupHeadLine ? item.userName + ' (Headline)' : item.userName}`;
        return (
            <Row key={index}>
                <Cell className={`text-center ${isHost ? 'link-click' : ''}`} onClick={() =>this.handleOpenEdit(item)}>{item.remarkID}</Cell>
                <Cell>{item.remarkName}</Cell>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip id="tooltip-remark-content">
                            <span dangerouslySetInnerHTML={{__html: item.remark.substring(0, 550)}} />
                        </Tooltip>
                    }
                >
                    <Cell className={`remark-content ${isHost ? 'link-click' : ''}`} 
                        onClick={() =>this.handleOpenEdit(item)}
                        dangerouslySetInnerHTML={{__html: item.remark}}
                    />
                </OverlayTrigger>
                <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createdDate)}</Cell>
                <Cell>{item.creator}</Cell>
                <Cell>{userNameFormat}</Cell>
            </Row>
        );
    };

    handleOpenEdit = item =>{
        this.props.setOpenEditPopup({show: true, data: item, isViewHistory: false});
    };

    render() {
        const { isHost} = this.props;
        return (
            <div className="table-last-five-remarks">
                <Table
                    width={985}
                    header={this.buildHeader()}
                    body={this.buildBody(isHost)}
                    autoWidth={false}
                    containerPadding={0}
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

export default connect(mapStateToProps, mapDispatchToProps)(LastFiveRemarkDataGrid);