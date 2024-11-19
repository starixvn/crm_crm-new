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

    componentDidUpdate = () => {
        if(window.assignPIC !== undefined && document.getElementById('plus-icon-assign-pic') !== null){
            document.getElementById('plus-icon-assign-pic').click();
            window.assignPIC = undefined;
        }
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params.pageIndex = pageIndex;
        params.pageSize = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData(params, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
    };

    buildPicManagementHeader = (isHost, isRenderCommunication, uniqueCommunication) => {
        return [
            <HeaderRow key='header1'>
                <HeaderCell colWidth={50} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('TextNo')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('HeadlineType')}</HeaderCell>
                <HeaderCell colWidth={130} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('DefaultPIC')}</HeaderCell>
                <HeaderCell colWidth={135} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('PIC')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={130} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={this.rowSpanHeader(isRenderCommunication)}>{LangHelper.getResource('Position')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={80} rowSpan={isRenderCommunication ? 2 : 0}>
                        <div className='d-flex justify-content-center'>
                            <input className='d-block mx-auto' type='button'
                                value={LangHelper.getResource('Remove')}
                                disabled={this.props.removeOptions.isDisabledRemove}
                                onClick={() => this.handleOpenRemovePopup()}
                            />
                        </div>
                        {
                            this.props.removeOptions.isHadAll &&
                            <input className='d-block cursor-pointer mx-auto margin-top-5px' type='checkbox'
                                checked={this.props.removeOptions.isCheckedAll}
                                onChange={() => this.handleChangeRemoveCheckboxAll()}
                            />
                        }
                    </HeaderCell>
                }
                {
                    isRenderCommunication && <HeaderCell colSpan={uniqueCommunication.length + 1}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                }
            </HeaderRow>,
            <HeaderRow key='header2'>
                {isRenderCommunication && this.renderHeaderCommunicationTools(uniqueCommunication)}
            </HeaderRow>
        ];
    };

    rowSpanHeader = isRenderCommunication => isRenderCommunication ? 2 : 0;


    renderHeaderCommunicationTools = uniqueCommunication => {
        const header = [];
        header.push(<HeaderCell key='PICName' colWidth={100}>{LangHelper.getResource('PICName')}</HeaderCell>);
        uniqueCommunication.forEach((item, index) => {
            const maxLengthComm = this.findLongestWordLength(item.settingValue);
            const calWidthCommByPixel = this.measureText(maxLengthComm);
            header.push(
                <HeaderCell
                    className='header-comm'
                    colWidth={calWidthCommByPixel > 100 ? calWidthCommByPixel + 50 : 100}
                    key={`comm-header-${item.settingValue}-${index}`}>{item.settingValue}
                </HeaderCell>);
        });
        return header;
    };

    findLongestWordLength = str => {
        const arr = str.split(' ');
        let strArr = '';
        for (let i = 0; i < arr.length; i++) {
            if (strArr.length < arr[i].length) {
                strArr = arr[i];
            }
        }
        return strArr;
    };

    buildPicManagementBody = (isHost, isRenderCommunication) => {
        const { pageIndex, pageSize } = this.props.gridParams;
        this.startIndex = (pageIndex - 1) * pageSize + 1;

        if (this.props.picAssignmentGridData.data.length > 0) {
            {
                return this.buildPicManagementBodyHasData(isHost, isRenderCommunication);
            }
        }

        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell className='text-center' colSpan={isHost ? 11 : 10}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    buildPicManagementBodyHasData = (isHost, isRenderCommunication) => {
        const body = [];
            let mergeHeadline = 0;
            let mergePIC = 0;
            let countComm = 0;
            let rowIndex = 0;
            for (let index = 0; index < this.props.picAssignmentGridData.data.length; index++) {
                rowIndex++;
                let row;
                const assignment = this.props.picAssignmentGridData.data[index];
                let comm = [];
                const communicationTools = this.props.picAssignmentGridData.communicationTools;
                const picForMappingSplit = this.picForMappingItem(assignment);
                const uniquePicMapping = picForMappingSplit.filter((v, i, a) => a.findIndex(t => t === v) === i);
                comm = communicationTools.filter(item => uniquePicMapping.indexOf(item.picId.toString()) > -1);
                if (mergeHeadline === 0) {
                    mergeHeadline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID).length;
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    countComm = 0;
                    row = this.renderRowMergeHeadline(index, rowIndex, pics, assignment,comm, mergeHeadline, mergePIC);
                } else if (mergePIC === 0) {
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    row = this.renderRowMerPic(index, rowIndex, pics, assignment,comm, countComm, mergePIC);
                } else {
                    row = this.renderRowCommunication(index, rowIndex, assignment, countComm, comm);
                }
                body.push(row);
                countComm++;
                mergeHeadline--;
                mergePIC--;
                if (mergeHeadline === 0 && countComm < comm.length && isRenderCommunication) {
                    const remainRowComm = comm.length - countComm;
                    for (let indexExtra = 0; indexExtra < remainRowComm; indexExtra++) {
                        row = this.renderRowCommEmpty(isHost, rowIndex, comm[countComm]);
                        body.push(row);
                        countComm++;
                    }
                }
            }
            return body;
    };

    picForMappingItem = assignment => {
        const picForMappingSplit = [];
        const headline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID);
        headline.map(item => {
            if (item.picForMapping) {
                const splitPic = item.picForMapping.split(',');
                splitPic.map(item1 => {
                    picForMappingSplit.push(item1);
                });
            }
        });
        return picForMappingSplit;
    };

    renderRowMergeHeadline = (index, rowIndex, pics, assignment,comm, mergeHeadline, mergePIC) => {
        const isHost = this.props.isHost;
        const isRenderCommunication = this.isHostCommunication();
        const accounts = pics.map(pic => pic.directAccount);
        const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);
        if (comm.length > mergeHeadline && isRenderCommunication) {
            const countExtraComm = comm.length - mergeHeadline;
            const mergeHeadlineExtraComm = mergeHeadline + countExtraComm;
           return this.renderRow(index, rowIndex, assignment, mergeHeadlineExtraComm, mergePIC, picCell, comm[0]);
        } else {
            return this.renderRow(index, rowIndex, assignment, mergeHeadline, mergePIC, picCell, comm[0]);
        }
    };

    renderRowMerPic = (index, rowIndex, pics, assignment,comm, countComm, mergePIC) => {
        const isHost = this.props.isHost;
        const isRenderCommunication = this.isHostCommunication();
        const accounts = pics.map(pic => pic.directAccount);
        const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);
        if (countComm < comm.length && isRenderCommunication) {
            const commRenderPicMerge = comm[countComm];
            return this.renderRow(index, rowIndex, assignment, 0, mergePIC, picCell, commRenderPicMerge);
        } else {
            return this.renderRow(index, rowIndex, assignment, 0, mergePIC, picCell, 0);
        }
    };

    renderRowCommunication = (index, rowIndex, assignment, countComm, comm) =>{
        const isRenderCommunication = this.isHostCommunication();
        if (countComm < comm.length && isRenderCommunication) {
            const commRender = comm[countComm];
            return this.renderRow(index, rowIndex, assignment, 0, 0, 0, commRender);
        } else {
            return this.renderRow(index, rowIndex, assignment, 0, 0, 0, 0);
        }
    };

    isHostCommunication = () =>{
        const isReadPicManagement  = this.props.isReadPicManagement;
        const communicationTools = this.props.picAssignmentGridData.communicationTools;
        return isReadPicManagement && communicationTools.length > 0;
    };

    renderRowCommEmpty = (isHost, index, comm) => {
        return <Row>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            {isHost && <Cell ></Cell>}
            {
                comm ? this.renderCommunicationToolsValue(comm) : this.renderCommunicationToolsNullValue()
            }
        </Row>;
    };

    renderRow = (index, rowIndex, item, mergeHeadline, mergePIC, picCell, comm) => {
        const listComm = this.props.picAssignmentGridData.listComm;
        const isHost = this.props.isHost;
        const isRenderCommunication = this.isHostCommunication();
        const defaultPicList = item.defaultPicList ?
            item.defaultPicList.map(pic => {
                return {
                    value: pic.picId,
                    label: `${pic.picName} (${pic.role})`
                };
            }) : [];
        return <Row key={rowIndex}>
            <Cell className='text-center'>{rowIndex}</Cell>
            {
                this.renderMergeHeadlineCells(mergeHeadline, item, defaultPicList, isHost)
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
            {
                comm ? isRenderCommunication && this.renderCommunicationToolsValue(comm) : isRenderCommunication && this.renderCommunicationToolsNullValue(listComm)
            }
        </Row>;
    };

    renderCommunicationToolsNullValue = listComm => {
        const bodyCommunicationNullValue = [];
        for (let indexComm = 0; indexComm < listComm.length + 1; indexComm++) {
            bodyCommunicationNullValue.push(<Cell key={`comm-${indexComm}`}></Cell>);
        }
        return bodyCommunicationNullValue;
    };

    renderCommunicationToolsValue = comm => {
        const listComm = this.props.picAssignmentGridData.listComm;
        const bodyCommunication = [];
        bodyCommunication.push(<Cell key='picName'>{comm.picName}</Cell>);
        for (let indexCommRender = 0; indexCommRender < listComm.length; indexCommRender++) {
            const renderValueComm = comm.listComm.filter(item => item.communicationTool.toString() === listComm[indexCommRender].settingValue);
            bodyCommunication.push(
                <Cell key={indexCommRender} className='text-center'>{renderValueComm.length > 0 ? renderValueComm[0].communicationValue : renderValueComm}</Cell>
            );
        }
        return bodyCommunication;
    };

    renderMergeHeadlineCells = (mergeHeadline, item, defaultPicList, isHost) => {
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
                    }, defaultPicList, isHost)}</Cell>
            </Fragment>;
        }

        return null;
    };

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
    };

    handleOpenAssignPicPopup = (headlineId, accountNames) =>
        this.props.setAssignPicPopup({
            show: true,
            data: {
                headlineId,
                accountNames
            }
        });

    renderPic = (pics, headlineId, accountNames, isHost) => {
        if (pics === null || pics.length === 0) {
            if (isHost) {
                return <span
                    id='plus-icon-assign-pic'
                    className='plus-icon'
                    onClick={() => this.handleOpenAssignPicPopup(headlineId, accountNames)
                    }>+</span>;
            }

            return <span>-</span>;
        }

        return pics.map(item => <p key={item.picId} className='pic-name'>{`${item.picName} (${item.role})`}</p>);
    };

    renderDefaultPic = (headline, pics, isHost) => {
        if (pics.length > 0) {
            return <div className='cursor-pointer link-color'
                onClick={() => this.handleOpenDefaultPicPopup(headline, pics, isHost)}
            >
                {
                    pics.map(item => <p key={item.value} className='pic-name default-pic-class'>{item.label}</p>)
                }
            </div>;
        }
        return <span className='plus-icon' onClick={() => this.handleOpenDefaultPicPopup(headline, pics, isHost)}>+</span>;
    };

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
    };

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
    };

    handleOpenRemovePopup = () => this.props.setRemovePicAssignmentPopup({ show: true });

    measureText = (str, fontSize = 13) => {
        const widths1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const widths2 = [0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625];
        const widths3 = [0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875];
        const widths4 = [0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625];
        const widths5 = [0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625];
        const widths6 = [0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875];
        const widths7 = [0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125];
        const widths8 = [0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
        const widths = widths1.concat(widths2).concat(widths3).concat(widths4).concat(widths5).concat(widths6).concat(widths7).concat(widths8);
        const avg = 0.5279276315789471;
        return str
            .split('')
            .map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg)
            .reduce((cur, acc) => acc + cur) * fontSize;
    };

    handleOpenDefaultPicPopup = (headline, pics, isHost) =>
        isHost && this.props.setDefaultPicPopup({
            show: true,
            headline,
            pics
        });

    renderTitle = (isRenderCommunication, totalUnassignedDirectAccount) =>{
        return(
            <div className={`table-title-v2 d-flex justify-content-between ${!isRenderCommunication ? 'header-pic-max-width' : ''}`}>
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
        );
    };

    render() {
        if (!this.props.picAssignmentGridData || !this.props.picAssignmentGridData.data) {
            return null;
        }

        const { totalItems, totalUnassignedDirectAccount, listComm } = this.props.picAssignmentGridData;
        const uniqueCommunication = listComm;
        const { pageIndex, pageSize } = this.props.gridParams;
        const isHost= this.props.isHost;
        const isRenderCommunication = this.isHostCommunication();
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };
        let totalWidthComm = 0;

        uniqueCommunication.forEach(item => {
            const maxLengthComm = this.findLongestWordLength(item.settingValue);
            const calWidthCommByPixel = this.measureText(maxLengthComm);
            if (calWidthCommByPixel > 100) {
                totalWidthComm += calWidthCommByPixel + 50;
            } else {
                totalWidthComm += 100;
            }
        });
        const totalAssignmentWidth = 1225;

        const calMaxWidth = totalAssignmentWidth + totalWidthComm;
        const title = this.renderTitle(isRenderCommunication, totalUnassignedDirectAccount);
        return (
            <div className='pic-assignment-container'>
                <Table
                    maxWidth={isRenderCommunication ? calMaxWidth : 1350}
                    shouldUseMaxWidth
                    width={isRenderCommunication ? document.getElementById('right-row-container').clientWidth : 1350}
                    autoWidth={false}
                    title={title}
                    isFixColumn
                    header={this.buildPicManagementHeader(isHost, isRenderCommunication, uniqueCommunication)}
                    body={this.buildPicManagementBody(isHost, isRenderCommunication)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    shouldResetScrollPosition={this.props.removeOptions.shouldResetScrollPosition}
                />
            </div>
        );
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