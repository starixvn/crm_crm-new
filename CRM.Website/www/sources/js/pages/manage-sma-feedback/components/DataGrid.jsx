import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandAllPanel: false
        };
        this.panelComment = [];
        this.panelDisCuss = [];

        this.data = [
            {
                createdDate: '2025-03-09',
                username: 'John Doe',
                level: '1',
                site: 'Site 1',
                function: 'Function 1',
                reviewStatus: 'Review Status 1',
                comment: 'Comment 1 Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1',
                discussionSolution: 'Discussion Solution 1 Discussion Solution 1 Discussion Solution 1 Discussion Solution 1',
            },
            {
                createdDate: '2025-03-09',
                username: 'John Doe rrr',
                level: '2',
                site: 'Site 2',
                function: 'Function 2',
                reviewStatus: 'Review Status 2',
                comment: 'Comment 2 Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1Comment 1',
                discussionSolution: 'Discussion Solution 2 Discussion Solution 1 Discussion Solution 1 Discussion Solution 1',
            }
        ];
    }

    toggleAllPanel = () => {
        this.setState(prevState => ({ expandAllPanel: !prevState.expandAllPanel }), () => {
            // if (this.props.gridData.data.length) {
            //     this.panels.filter(x => x && (x.state.isOpen !== this.state.expandAllPanel)).forEach(panel => {
            //         panel.set(this.state.expandAllPanel);
            //     });
            // }
            if (this.data.length) {
                this.panelComment.filter(x => x && (x.state.isOpen !== this.state.expandAllPanel)).forEach(panel => {
                    panel.set(this.state.expandAllPanel);
                });
                this.panelDisCuss.filter(x => x && (x.state.isOpen !== this.state.expandAllPanel)).forEach(panel => {
                    panel.set(this.state.expandAllPanel);
                });
            }
        });
    };

    handleEdit = item => {
        this.props.setEditSmaFeedbackDialog({
            show: true,
            statusId: item.reviewStatus,
            discussion: item.discussionSolution
        })
    };

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={13}>{LangHelper.getResource('CreatedDateGM8')}</HeaderCell>
                <HeaderCell colWidth={22}>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Level')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Function')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('ReviewStatus')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Comment')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('DiscussionSolution')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={12}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        )
    };

    buildBody = isHost => {
        //if (this.props.gridData.data.length > 0) {
            //return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
            return this.data.map((item, index) => this.renderRow(item, index, isHost));
        //}
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 7 : 6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderPanelItem = (item, index, panels) => (
        item.length > 10 ?
        <Panel ref={panel => panels[index] = panel}>
            <PanelHeader>
                <div>{item.slice(0, 10)}</div>
            </PanelHeader>
            <div>{item}</div>
        </Panel> :
        item
    );

    renderRow = (item, index, isHost) => {
        return (
            <Row key={`row${index}`}>
                <Cell>{item.createdDate}</Cell> 
                <Cell>{item.username}</Cell>
                <Cell className='text-center'>{item.level}</Cell>
                <Cell className='text-center'>{item.site}</Cell>
                <Cell className='text-center'>{item.function}</Cell>
                <Cell className='text-center'>{item.reviewStatus}</Cell>
                <Cell>{this.renderPanelItem(item.comment, index, this.panelComment)}</Cell>
                <Cell>{this.renderPanelItem(item.discussionSolution, index, this.panelDisCuss)}</Cell>
                {
                    isHost && <Cell className="text-center">
                        <span className="rounded-circle fa fa-pencil icon-edit"
                            onClick={() => this.handleEdit(item)}
                        />
                    </Cell>
                }
            </Row>
        )
    };

    render() {
        // if (!this.props.gridData || !this.props.gridData.data) {
        //     return null;
        // }
        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: 5,
            PageList: PAGING_SIZES
        };
        //console.log('panel', this.panels);
        return (
            <Fragment>
                <div className='d-flex table-title-v2 justify-content-between align-items-center'>
                    <div>{LangHelper.getResource('ManageSMAFeedback')}</div>
                    <div>
                        {
                            <div className="has-icons">
                                <span className={this.state.expandAllPanel ? 'fa fa-expand' : 'fa fa-compress'} onClick={this.toggleAllPanel} />
                            </div>
                        }
                        <span
                            className='fa fa-file-excel-o ml-3 icon-excel'
                           // onClick={() => functions.exportExcel(this.props.gridParams)}
                        />
                    </div>
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    // header={this.buildHeader(isHost)}
                    // body={this.buildBody(isHost)}
                    header={this.buildHeader(true)}
                    body={this.buildBody(true)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    adjustedHeight={10}
                    shouldResetScrollPosition={false}
                />
            </Fragment>    
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData
    } = state;

    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);