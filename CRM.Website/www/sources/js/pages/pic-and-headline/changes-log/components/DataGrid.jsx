import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES, LogActions, BackGroundChange } from '@jsroot/common/constants';

export class DataGrid extends Component {
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={7}>{LangHelper.getResource('LogID')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('LogDate')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('EditBy')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('HeadlineDA')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Detail')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { headlineDA, gridParams } = this.props;
        const { pageIndex, pageSize } = gridParams;
        this.startIndex = (pageIndex - 1) * pageSize + 1;
        if ( headlineDA.logInfo.length > 0) {
            return headlineDA.logInfo.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell className='text-center' colSpan={7}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const detailValue = this.renderDetailsValue(item);
        return (
            <Row key={index}>
                <Cell className='text-center'>{index + this.startIndex}</Cell>
                <Cell className='text-center'>{item.logId}</Cell>
                <Cell className='text-center' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: item.logTime}} />
                <Cell>{item.editBy}</Cell>
                <Cell>{item.directAccount}</Cell>
                <Cell>{item.action}</Cell>
                <Cell>{detailValue}</Cell>
            </Row>
        );
    };

    renderDetailsValue = item =>{
        let detailValue = '';
        const isDetailPicAndGroupHl = item.actionId === LogActions.RemoveDirectAccountFromPic ||
                                    item.actionId === LogActions.AssignDirectAccountToPic || item.actionId === LogActions.RemoveDefaultPicForAGroupHeadline;
        if(isDetailPicAndGroupHl){
            detailValue = this.getDetailValuePicAndGroupHl(item, false);
        } else{
            detailValue = this.renderDetailsValuePicAndGroupHlBoth(item);
        }
        return detailValue;
    };

    renderDetailsValuePicAndGroupHlBoth = item =>{
        let detailValue = '';
        switch (item.actionId) {
            case LogActions.UpdateThePicOfAHeadline:
                detailValue = this.getDetailValueGroupHeadlineAndPicBoth(item, false);
                break;
            case LogActions.UpdateDefaultPicForAGroupHeadline:
                detailValue = this.getDetailValuePicBoth(item);
                break;
            case LogActions.AddCustomerToCreditTermGroup:
            case LogActions.RemoveCustomerFromCreditTermGroup:
            case LogActions.AddTheGeneralInformationForSuperFromExistingSuper:
                detailValue = this.getDetailValuePicAndGroupHl(item, true);
                break;
            case LogActions.UpdateCreditTerm:
                detailValue = this.getDetailValueGroupHeadlineAndPicBoth(item, true);
                break;
            case LogActions.SetCustomerToCreditTermGroup:
                detailValue = this.renderHtmlDetailValue(LangHelper.getResource('IsGroupHeadline'), null, '', true);
                break;
        }
        return detailValue;
    };

    getDetailValuePicAndGroupHl = (item, isGroupHl) =>{
        const picsValue = this.getStringPics(item.newDAInfo.pics);
        return (
            <div className='container-detail border-bottom-0 min-height-38px'>
                <div className='detail-child-col col-title-detail'>
                    <div className='p-2'>{isGroupHl ? LangHelper.getResource('GroupHeadline') : LangHelper.getResource('PIC')}</div>
                </div>
                <div className='detail-child-col border-right-0'>
                    <div className='p-2 pl-5'>{isGroupHl ? item.newDAInfo.groupHeadline : picsValue}</div>
                </div>
            </div>
        );
    };

    getDetailValueGroupHeadlineAndPicBoth = (item, isGroupHeadline) =>{
        const oldGroupHeadlineString = this.getStringValue(item.oldDAInfo.groupHeadline);
        const newGroupHeadlineString = this.getStringValue(item.newDAInfo.groupHeadline);
        const groupHeadlineValue = this.changeValueToHtmlString(oldGroupHeadlineString, newGroupHeadlineString);
        const oldPicString = this.getStringPics(item.oldDAInfo.pics);
        const newPicString = this.getStringPics(item.newDAInfo.pics);
        const picsValue = this.changeValueToHtmlString(oldPicString, newPicString);
        const oldIsGroupHeadline = this.convertBoolToDecision(item.oldDAInfo.isGroupHeadline);
        const newIsGroupHeadline = this.convertBoolToDecision(item.newDAInfo.isGroupHeadline);
        const isGroupHeadlineValue = this.changeValueToHtmlString(oldIsGroupHeadline, newIsGroupHeadline);
        const isBackGroundChangeGroupHl = oldIsGroupHeadline !== newIsGroupHeadline;
        const isBackGroundChangePic = oldPicString !== newPicString;
        const backGroundChangeGroupHl = isBackGroundChangeGroupHl ? BackGroundChange : '';
        const backGroundChangePic = isBackGroundChangePic ? BackGroundChange : '';
        return (
            <div className='container-detail border-bottom-none min-height-38px'>
                    <div className='detail-child-col col-title-detail'>
                        <div className='p-2'>{LangHelper.getResource('GroupHeadline')}</div>
                    </div>
                    <div className= {`detail-child-col col-value-detail ${oldGroupHeadlineString !== newGroupHeadlineString ? BackGroundChange : ''}`}>
                        {groupHeadlineValue}
                    </div>
                    <div className='detail-child-col col-title-detail'>
                        <div className='p-2'>{isGroupHeadline ? LangHelper.getResource('IsGroupHeadline') : LangHelper.getResource('PIC')}</div>
                    </div>
                    {
                        isGroupHeadline ?
                        <div className= {`detail-child-col col-value-detail ${ backGroundChangeGroupHl }`}>
                            {isGroupHeadlineValue}
                        </div> :
                        <div className= {`detail-child-col col-value-detail ${ backGroundChangePic }`}>
                            {picsValue}
                        </div>
                    }
            </div>
        );
    };

    getDetailValuePicBoth = item => {
        const oldPicString = this.getStringPics(item.oldDAInfo.pics);
        const newPicString = this.getStringPics(item.newDAInfo.pics);
        const picsValue = this.changeValueToHtmlString(oldPicString, newPicString);
        const backgroundChange = oldPicString !== newPicString ? BackGroundChange : '';
        return (
            this.renderHtmlDetailValue(LangHelper.getResource('PIC'), picsValue, backgroundChange, false)
        );
    };

    renderHtmlDetailValue = (name, value, backgroundChange, isGroupHeadline) =>{
        return (
            <div className='container-detail border-bottom-none min-height-38px'>
                <div className='detail-child-col col-title-detail'>
                    <div className='p-2'>{name}</div>
                </div>
                <div className={`detail-child-col ${!isGroupHeadline ? backgroundChange : 'p-2 pl-5'}`}>
                    {!isGroupHeadline ? value : 'Yes'}
                </div>
            </div>
        );
    };

    convertBoolToDecision = value => {
        if (value === true) {
            return 'Yes';
        }else if (value === false){
            return 'No';
        }else{
            return '-';
        }
    };

    changeValueToHtmlString = (oldValue, newValue) =>{
        const isChange = newValue !== oldValue;
        return (
            isChange ?
            <div>
                <div className='new-value'>
                    <div className='p-2 pl-5'>{newValue}</div>
                </div><div className='old-value'>
                    <div className='p-2 pl-5'>{oldValue}</div>
                </div>
            </div>
            : <div className='p-2 pl-5'>{newValue}</div>
        );
    };

    getStringValue = value => value ? value : '-';


    getStringPics = pics =>{
        if(pics && pics.length > 0){
            return pics.map(pic => `${pic.picName} (${pic.roleName})`).join(', ');
        }
        return '-';
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);
        this.props.getHeadlineDAReport(params);
    };

    render() {
        const { headlineDA } = this.props;
        if(!headlineDA || !headlineDA.logInfo){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: headlineDA.totals,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('ChangesLog')}</span>
                </div>
                <Table
                    minWidth={960}
                    maxWidth={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { headlineDA, gridParams } = state;
    return { headlineDA, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);