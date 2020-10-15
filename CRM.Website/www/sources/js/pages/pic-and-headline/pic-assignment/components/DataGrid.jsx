import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import functions from '../common.functions';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData(params, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
    }

    buildPicManagementHeader = isHost =>
        <HeaderRow>
            <HeaderCell colWidth={70}>{LangHelper.getResource('TextNo')}</HeaderCell>
            <HeaderCell colWidth={150}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
            <HeaderCell colWidth={100}>{LangHelper.getResource('HeadlineType')}</HeaderCell>
            <HeaderCell colWidth={150}>{LangHelper.getResource('DefaultPIC')}</HeaderCell>
            <HeaderCell colWidth={150}>{LangHelper.getResource('PIC')}</HeaderCell>
            <HeaderCell colWidth={150}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
            <HeaderCell colWidth={100}>{LangHelper.getResource('Status')}</HeaderCell>
            <HeaderCell colWidth={150}>{LangHelper.getResource('Site')}</HeaderCell>
            <HeaderCell colWidth={100}>{LangHelper.getResource('Currency')}</HeaderCell>
            <HeaderCell colWidth={100}>{LangHelper.getResource('Position')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={85}>
                    <input className='d-block mx-auto' type='button'
                        value={LangHelper.getResource('Remove')}
                        disabled={this.props.removeOptions.isDisabledRemove}
                        onClick={() => this.handleOpenRemovePopup()}
                    />
                    {
                        this.props.removeOptions.isHadAll &&
                            <input className='d-block cursor-pointer mx-auto margin-top-5px' type='checkbox'
                                checked={this.props.removeOptions.isCheckedAll}
                                onChange={() => this.handleChangeRemoveCheckboxAll()}
                            />
                    }
                </HeaderCell>
            }
        </HeaderRow>

    buildPicManagementBody = isHost => {
        const { pageIndex, pageSize } = this.props.gridParams;
        this.startIndex = (pageIndex - 1) * pageSize + 1;

        if (this.props.picAssignmentGridData.data.length > 0) {
            const body = [];
            let mergeHeadline = 0;
            let mergePIC = 0;

            for (let index = 0; index < this.props.picAssignmentGridData.data.length; index++) {
                let row;
                const assignment = this.props.picAssignmentGridData.data[index];

                if (mergeHeadline === 0) {
                    mergeHeadline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID).length;
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    const accounts = pics.map(pic => pic.directAccount);
                    const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);
                    row = this.renderRow(index, isHost, assignment, mergeHeadline, mergePIC, picCell);
                }
                else if(mergePIC === 0) {
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    const accounts = pics.map(pic => pic.directAccount);
                    const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);
                    row = this.renderRow(index, isHost, assignment, 0, mergePIC, picCell);
                }
                else {
                    row = this.renderRow(index, isHost, assignment, 0, 0);
                }

                body.push(row);
                mergeHeadline--;
                mergePIC--;
            }

            return body;
        }

        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell colSpan={isHost ? 11 : 10}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    }

    renderRow = (index, isHost, item, mergeHeadline, mergePIC, picCell) => {
        const defaultPicList = item.defaultPicList ?
            item.defaultPicList.map(pic => {
                return {
                    value: pic.picId,
                    label: `${pic.picName} (${pic.role})`
                };
            }) : [];

        return <Row key={index}>
            <Cell className='text-center'>{index + this.startIndex}</Cell>
            {
                this.renderMergeHeadlineCells(mergeHeadline, item, defaultPicList)
            }
            {
                mergePIC > 0 &&
                    <Cell className={item.picList ? '' : 'text-center'} rowSpan={mergePIC}>{picCell}</Cell>
            }
            <Cell className={`${item.status.toLowerCase()}-color`}>{item.directAccount}</Cell>
            <Cell className={`${item.status.toLowerCase()}-color`}>{item.status}</Cell>
            <Cell className={`${item.status.toLowerCase()}-color`}>{item.site}</Cell>
            <Cell className={`${item.status.toLowerCase()}-color`}>{item.currency}</Cell>
            <Cell className={`${item.status.toLowerCase()}-color`}>{item.position}</Cell>
            {
                isHost && this.renderIsHost(item, index)
            }
        </Row>;
    }

    renderMergeHeadlineCells = (mergeHeadline, item, defaultPicList) => {
        if (mergeHeadline > 0) {
            return <Fragment>
                <OverlayTrigger placement='top' overlay={
                    <Tooltip>{`${LangHelper.getResource('GroupHeadline')}: ${item.headlineName}`}</Tooltip>
                }>
                    <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineName}</Cell>
                </OverlayTrigger>
                <Cell className='text-center' rowSpan={mergeHeadline}>{item.headlineType}</Cell>
                <Cell className={defaultPicList.length > 0 ? '' : 'text-center'}
                    rowSpan={mergeHeadline}>{this.renderDefaultPic({
                    id: item.headlineID,
                    name: item.headlineName
                }, defaultPicList)}</Cell>
            </Fragment>;
        }

        return null;
    }

    renderIsHost = (item, index) => {
        const checked = this.props.removeOptions.dataList
            && this.props.removeOptions.dataList[index]
            && this.props.removeOptions.dataList[index].isRemoved;

        return <Cell className={`${item.status.toLowerCase()}-color text-center`}>
            <input type='checkbox' className='cursor-pointer'
                checked={
                    item.picList && item.picList.length > 0 && checked
                }
                disabled={!item.picList || item.picList.length === 0}
                onChange={() => this.handleChangeRemoveCheckbox(index)}
            />
        </Cell>;
    }

    handleOpenAssignPicPopup = (headlineId, accountNames) =>
        this.props.setAssignPicPopup({
            show: true,
            data: {
                headlineId,
                accountNames
            }
        })

    renderPic = (pics, headlineId, accountNames, isHost) => {
        if (pics === null || pics.length === 0) {
            if (isHost) {
                return <span
                    className='plus-icon'
                    onClick={() => this.handleOpenAssignPicPopup(headlineId, accountNames)
                }>+</span>;
            }

            return <span>-</span>;
        }

        return pics.map(item => <p key={item.picId} className='pic-name'>{`${item.picName} (${item.role})`}</p>);
    }

    renderDefaultPic = (headline, pics) => {
        if (pics.length > 0) {
            return <div className='cursor-pointer link-color'
                onClick={() => this.handleOpenDefaultPicPopup(headline, pics)}
            >
                {
                    pics.map(item => <p key={item.value} className='pic-name default-pic-class'>{item.label}</p>)
                }
            </div>;
        }

        return <span className='plus-icon'
            onClick={() => this.handleOpenDefaultPicPopup(headline)}
        >+</span>;
    }

    handleChangeRemoveCheckboxAll = () => {
        const checked = !this.props.removeOptions.isCheckedAll;
        const dataList = this.props.removeOptions.dataList.map(item => {
            return { ...item };
        });

        dataList.forEach(item => {
            if (item.picList && item.picList.length > 0) {
                item.isRemoved = checked;
            }
        });

        this.props.setRemoveOptions({
            isCheckedAll: checked,
            isDisabledRemove: !checked,
            isHadAll: this.props.removeOptions.isHadAll,
            shouldResetScrollPosition: false,
            dataList
        });
    }

    handleChangeRemoveCheckbox = index => {
        const dataList = this.props.removeOptions.dataList.map(item => {
            return { ...item };
        });

        dataList[index].isRemoved = !this.props.removeOptions.dataList[index].isRemoved;
        const removeList = dataList.filter(item => item.picList && item.picList.length > 0 && item.isRemoved);
        const notCheckedDataList = dataList.filter(item => item.picList && item.picList.length > 0 && !item.isRemoved);
        this.props.setRemoveOptions({
            isCheckedAll: notCheckedDataList.length <= 0,
            isDisabledRemove: removeList.length <= 0,
            isHadAll: this.props.removeOptions.isHadAll,
            shouldResetScrollPosition: false,
            dataList
        });
    }

    handleOpenRemovePopup = () => this.props.setRemovePicAssignmentPopup({ show: true })

    handleOpenDefaultPicPopup = (headline, pics) =>
        this.props.setDefaultPicPopup({
            show: true,
            headline,
            pics
        })

    render() {
        if (!this.props.picAssignmentGridData || !this.props.picAssignmentGridData.data) {
            return null;
        }

        const { totalItems, totalUnassignedDirectAccount } = this.props.picAssignmentGridData;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost } = this.props;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };

        return <Fragment>
            <div className='table-title d-flex justify-content-between'>
                <div>{LangHelper.getResource('PICAssignment')}</div>
                <div>
                    {
                        LangHelper.formatString(LangHelper.getResource('ThereAreUnassignedDirectAccounts'), totalUnassignedDirectAccount)
                    }
                    <span
                        className='fa fa-file-excel-o ml-3 icon-excel'
                        onClick={() => functions.exportExcel(this.props.gridParams)}
                    />
                </div>
            </div>
            <Table
                maxWidth={document.getElementById('app-container').clientWidth}
                autoWidth
                header={this.buildPicManagementHeader(isHost)}
                body={this.buildPicManagementBody(isHost)}
                isPaging
                pageOption={pagingOption}
                onPaging={this.onPaging}
                containerPadding={0}
                shouldResetScrollPosition={this.props.removeOptions.shouldResetScrollPosition}
            />
        </Fragment>;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        picAssignmentGridData,
        gridParams,
        removeOptions
    } = state;

    return {
        picAssignmentGridData,
        gridParams,
        removeOptions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);