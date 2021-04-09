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
    };

    buildPicManagementHeader = (isHost, isRenderCommunication, uniqueCommunication) => {
        return [
            <HeaderRow>
                <HeaderCell colWidth={50}  rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('TextNo')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('HeadlineType')}</HeaderCell>
                <HeaderCell colWidth={130} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('DefaultPIC')}</HeaderCell>
                <HeaderCell colWidth={135} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('PIC')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
                <HeaderCell colWidth={100} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={130} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={85} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={85} rowSpan={isRenderCommunication ? 2 : 0}>{LangHelper.getResource('Position')}</HeaderCell>
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
        ]
    };

    renderHeaderCommunicationTools = uniqueCommunication => {
        const header = [];
        header.push(<HeaderCell colWidth={100}>{LangHelper.getResource('PICName')}</HeaderCell>);
        uniqueCommunication.forEach((item, index) => {
            const countLengthComm = item.settingValue.split(" ");
            const maxLengthComm = Math.max.apply(Math, countLengthComm.map(function(comm) { return comm.length; }));
            const calWidthCommByPixel = maxLengthComm * 13;
            
            header.push(<HeaderCell className='header-comm' colWidth={calWidthCommByPixel > 100 ? calWidthCommByPixel : 100} key={`comm-header-${item.settingName}-${index}`}>{item.settingValue}</HeaderCell>);
        });
        return header;
    };

    buildPicManagementBody = (isHost,isRenderCommunication) => {
        const { pageIndex, pageSize } = this.props.gridParams;
        this.startIndex = (pageIndex - 1) * pageSize + 1;

        if (this.props.picAssignmentGridData.data.length > 0) {
            const body = [];
            let mergeHeadline = 0;
            let mergePIC = 0;
            let countComm = 0;
            let rowIndex = 0;
            for (let index = 0; index < this.props.picAssignmentGridData.data.length; index++) {
                rowIndex++;
                let row;
                const assignment = this.props.picAssignmentGridData.data[index];
                var headline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID);
                let comm = [];
                let picForMappingSplit = [];
                const communicationTools = this.props.picAssignmentGridData.communicationTools;
                headline.map(item =>{
                    if(item.picForMapping)
                    {
                        var splitPic = item.picForMapping.split(',');
                        splitPic.map(item1 =>{
                        picForMappingSplit.push(item1);
                        })
                    }
                })
                const uniquePicMapping = picForMappingSplit.filter((v, i, a) => a.findIndex(t => t === v) === i);
                comm = communicationTools.filter(item => uniquePicMapping.indexOf(item.picId.toString()) > -1);
                if (mergeHeadline === 0) {
                    mergeHeadline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID).length;
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    const accounts = pics.map(pic => pic.directAccount);
                    const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost, isRenderCommunication);
                    countComm = 0;
                    if(comm.length > mergeHeadline && isRenderCommunication)
                    {
                        const countExtraComm = comm.length - mergeHeadline;
                        const  mergeHeadlineExtraComm =  mergeHeadline + countExtraComm;
                        row = this.renderRow(index, rowIndex, isHost, assignment, mergeHeadlineExtraComm, mergePIC, picCell, comm[countComm], isRenderCommunication);
                    }
                    else
                    {
                        row = this.renderRow(index, rowIndex, isHost, assignment, mergeHeadline, mergePIC, picCell, comm[countComm], isRenderCommunication);
                    }
                } else if (mergePIC === 0) {
                    const pics = this.props.picAssignmentGridData.data.filter(item =>
                        item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
                    mergePIC = pics.length;
                    const accounts = pics.map(pic => pic.directAccount);
                    const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);
                    if(countComm < comm.length && isRenderCommunication)
                    {
                        var commRenderPicMerge = comm[countComm];
                        row = this.renderRow(index, rowIndex, isHost, assignment, 0, mergePIC, picCell, commRenderPicMerge , isRenderCommunication);
                    }
                    else
                    {
                        row = this.renderRow(index, rowIndex, isHost, assignment, 0, mergePIC, picCell, 0, isRenderCommunication);
                    }
                } else {
                    if(countComm < comm.length && isRenderCommunication)
                    {
                        var commRender = comm[countComm];
                        row = this.renderRow(index, rowIndex, isHost, assignment, 0, 0, 0, commRender, isRenderCommunication);
                    }
                    else
                    {
                        row = this.renderRow(index, rowIndex, isHost, assignment, 0, 0, 0, 0, isRenderCommunication);
                    }
                }
                body.push(row);
                countComm++;
                mergeHeadline--;
                mergePIC--;
                if(mergeHeadline == 0 && countComm < comm.length && isRenderCommunication)
                {
                    const remainRowComm =  comm.length - countComm;
                     for (let indexExtra = 0; indexExtra < remainRowComm; indexExtra++) {
                        row = this.renderRowCommEmpty(isHost, rowIndex, comm[countComm++]);
                        body.push(row);
                     }
                }
            }
            return body;
        }

        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell className='text-center' colSpan={isHost ? 11 : 10}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRowCommEmpty = (isHost, index, comm) => {
        return <Row key={`${index}-${comm.picName}`}>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            <Cell ></Cell>
            {isHost&&<Cell ></Cell>}
            {
                comm ? this.renderCommunicationToolsValue(comm) : this.renderCommunicationToolsNullValue()
            }
        </Row>;
    };


    renderRow = (index, rowIndex, isHost, item, mergeHeadline, mergePIC, picCell, comm, isRenderCommunication) => {
        const listComm = this.props.picAssignmentGridData.listComm;
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
               comm ? isRenderCommunication&&this.renderCommunicationToolsValue(comm) : isRenderCommunication&&this.renderCommunicationToolsNullValue(listComm)
            }
        </Row>;
    };

    renderCommunicationToolsNullValue = listComm =>{
        const bodyCommunicationNullValue = [];
        for(let indexComm=0; indexComm< listComm.length +1; indexComm++)
        {
            bodyCommunicationNullValue.push(<Cell key={`comm-${indexComm}`}></Cell>)
        }
        return bodyCommunicationNullValue;
    }

    renderCommunicationToolsValue = comm => {
        const listComm = this.props.picAssignmentGridData.listComm;
        const bodyCommunication = [];
        bodyCommunication.push( <Cell >{comm.picName}</Cell>);

        for(let indexCommRender = 0 ; indexCommRender < listComm.length; indexCommRender++)
        {
            var renderValueComm = comm.listComm.filter(item => item.communicationTool.toString()=== listComm[indexCommRender].settingValue);
            bodyCommunication.push(<Cell className='text-center'>{ renderValueComm.length > 0 ? renderValueComm[0].communicationValue : renderValueComm}</Cell>); 
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

        return 
        {
            <span className='plus-icon'
                onClick={() => this.handleOpenDefaultPicPopup(headline)}
            >+</span>;
        }
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

    handleOpenDefaultPicPopup = (headline, pics, isHost) =>
        isHost&&this.props.setDefaultPicPopup({
            show: true,
            headline,
            pics
        });

    render() {
        if (!this.props.picAssignmentGridData || !this.props.picAssignmentGridData.data) {
            return null;
        }

        const { totalItems, totalUnassignedDirectAccount, communicationTools, listComm } = this.props.picAssignmentGridData;
        const uniqueCommunication = listComm;
        const { pageIndex, pageSize } = this.props.gridParams;
        const { isHost, isReadPicManagement } = this.props;
        const isRenderCommunication = isReadPicManagement&&communicationTools.length > 0;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalItems,
            PageList: PAGING_SIZES
        };
        let totalWidthComm = 0;

        uniqueCommunication.forEach((item, index) => {
            const countLengthComm = item.settingValue.split(" ");
            const maxLengthComm = Math.max.apply(Math, countLengthComm.map(function(comm) { return comm.length; }));
            const calWidthCommByPixel = maxLengthComm * 13;
            if(calWidthCommByPixel > 100)
            {
                totalWidthComm += calWidthCommByPixel
            }
            else
            {
                totalWidthComm += 100
            }
        });
        const totalAssignmentWidth = 1195;

        const calMaxWidth = totalAssignmentWidth + totalWidthComm;

        return <Fragment>
            <div className={`table-title d-flex justify-content-between ${!isRenderCommunication ? 'header-pic-max-width' : ''}`}>
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
                maxWidth= { isRenderCommunication ? calMaxWidth : 1350}
                minWidth= {isRenderCommunication ? document.getElementById('app-container').clientWidth : null}
                width = {isRenderCommunication ? document.getElementById('app-container').clientWidth : 1350}
                autoWidth = {isRenderCommunication ? true : false}
                header={this.buildPicManagementHeader(isHost, isRenderCommunication, uniqueCommunication)}
                body={this.buildPicManagementBody(isHost, isRenderCommunication)}
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