import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES, LogActions, BackGroundChange } from '@jsroot/common/constants';

export class PicDataGrid extends Component {
    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('SymbolNo')}</HeaderCell>
                <HeaderCell colWidth={7}>{LangHelper.getResource('LogID')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('LogDate')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('EditBy')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('PicType')}</HeaderCell>
                <HeaderCell colWidth={13}>{LangHelper.getResource('PIC')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('Action')}</HeaderCell>
                <HeaderCell colWidth={63}>{LangHelper.getResource('Detail')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { picReport, gridParamsPic } = this.props;
        const { pageIndex, pageSize } = gridParamsPic;
        this.startIndex = (pageIndex - 1) * pageSize + 1;
        if ( picReport.picInfo.length > 0) {
            return picReport.picInfo.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className='no-data' >
                <Cell className='text-center' colSpan={8}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const detailValuePic = this.renderDetailsValuePic(item);
        return (
            <Fragment>
                <Row key={index}>
                    <Cell className='text-center'>{index + this.startIndex}</Cell>
                    <Cell className='text-center'>{item.logId}</Cell>
                    <Cell className='text-center' style={{ whiteSpace: 'pre-line' }} dangerouslySetInnerHTML={{ __html: item.logTime}} />
                    <Cell className='text-center'>{item.editBy}</Cell>
                    <Cell className='text-center'>{item.picTypeName}</Cell>
                    <Cell className='text-center'>{item.pic}</Cell>
                    <Cell >{item.action}</Cell>
                    <Cell>{detailValuePic}</Cell>
                </Row>
            </Fragment>
        );
    };

    renderDetailsValuePic = item =>{
        let detailValue = '';
        switch (item.actionId) {
            case LogActions.InsertNewPic:
                detailValue = this.getDetailValueInsertNewPic(item);
                break;
            case LogActions.UpdatePic:
                detailValue = this.getDetailValueUpdatePic(item);
                break;
            case LogActions.UpdatePicStatus:
                detailValue = this.getDetailValueUpdatePicStatus(item);
                break;
        }
        return detailValue;
    };

    getDetailValueInsertNewPic = item =>{
        const languageValue = this.getStringJoinArray(item.newPicInfo.languages);
        const picTypes = this.getStringJoinArray(item.newPicInfo.picTypes);
        const countryValue = item.newPicInfo.country ? item.newPicInfo.country.name : '-';
        const newCommunicationTools = [];
        this.recursiveCommunicationTools(item.newPicInfo.communicationTools, newCommunicationTools);
        const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTools);
        const remarkValue = this.getStringValue(item.newPicInfo.remark);
        const picTypeName = LangHelper.getResource('PicType');
        const communicationToolsName = LangHelper.getResource('CommunicationTool');
        const name = LangHelper.getResource('name');
        const roleName = LangHelper.getResource('Role');
        const languageName = LangHelper.getResource('Language');
        const countryName = LangHelper.getResource('country');
        const isActiveName = LangHelper.getResource('IsActive');
        const remarkName = LangHelper.getResource('remark');

        return (
            <div className='pic-container'>
                {this.renderHtmlDetail(picTypeName, picTypes, communicationToolsName, newCommunicationToolValue)}
                {this.renderHtmlDetail(name, item.newPicInfo.name, roleName, item.newPicInfo.role.name)}
                {this.renderHtmlDetail(languageName, languageValue, countryName, countryValue)}
                {this.renderHtmlDetail(isActiveName, 'Yes', remarkName, remarkValue)}
            </div>
        );
    };

    getDetailValueUpdatePic = item =>{
        const roleValue = this.changeValueToHtmlString(this.getStringObject(item.oldPicInfo.role), this.getStringObject(item.newPicInfo.role));
        const nameValue = this.changeValueToHtmlString(item.oldPicInfo.name, item.newPicInfo.name);
        const newPicType = this.getStringJoinArray(item.newPicInfo.picTypes);
        const oldPicType = this.getStringJoinArray(item.oldPicInfo.picTypes);
        const picTypeValue = this.changeValueToHtmlString(oldPicType, newPicType);
        const newLanguage = this.getStringJoinArray(item.newPicInfo.languages);
        const oldLanguage = this.getStringJoinArray(item.oldPicInfo.languages);
        const languageValue = this.changeValueToHtmlString(oldLanguage, newLanguage);
        const countryValue = this.changeValueToHtmlString(this.getStringObject(item.oldPicInfo.country), this.getStringObject(item.newPicInfo.country));
        const newCommunicationTool = [];
        this.recursiveCommunicationTools(item.newPicInfo.communicationTools, newCommunicationTool);
        const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTool);
        const newCommunicationString = newCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
        const oldCommunicationTool = [];
        this.recursiveCommunicationTools(item.oldPicInfo.communicationTools, oldCommunicationTool);
        const oldCommunicationToolValue = this.renderCommunicationTools(oldCommunicationTool);
        const oldCommunicationString = oldCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
        const communicationToolValue = this.changeValueToHtmlString(oldCommunicationToolValue, newCommunicationToolValue, newCommunicationString !== oldCommunicationString, true);
        const remarkValue = this.changeValueToHtmlString(this.getStringValue(item.oldPicInfo.remark), this.getStringValue(item.newPicInfo.remark));
        return (
            <div className='pic-container'>
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('PicType'), picTypeValue,
                        LangHelper.getResource('CommunicationTool'), communicationToolValue,
                        oldPicType !== newPicType,
                        oldCommunicationString !== newCommunicationString
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Name'), nameValue,
                        LangHelper.getResource('Role'), roleValue,
                        item.oldPicInfo.name !== item.newPicInfo.name,
                        this.getStringObject(item.oldPicInfo.role) !== this.getStringObject(item.newPicInfo.role)
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Language'), languageValue,
                        LangHelper.getResource('Country'), countryValue,
                        oldLanguage !== newLanguage,
                        this.getStringObject(item.oldPicInfo.country) !== this.getStringObject(item.newPicInfo.country)
                    )
                }
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('Remark'), remarkValue,
                        null, null,
                        item.oldPicInfo.remark !== item.newPicInfo.remark,
                        false
                    )
                }
            </div>
        );
    };

    getDetailValueUpdatePicStatus = item =>{
        const newDirectAccountJoin = this.getStringJoinArray(item.newPicInfo.directAccounts);
        const oldDirectAccountJoin = this.getStringJoinArray(item.oldPicInfo.directAccounts);
        const isChangeDirectAccount =  newDirectAccountJoin !== oldDirectAccountJoin;
        const directAccountValue = this.changeValueToHtmlString(oldDirectAccountJoin, newDirectAccountJoin);
        const isActiveValue = this.changeValueToHtmlString(
                this.convertBoolToDecision(item.oldPicInfo.isActive),
                this.convertBoolToDecision(item.newPicInfo.isActive)
            );
        const oldHeadlineJoin = this.getStringJoinArray(item.oldPicInfo.headlines);
        const newHeadlineJoin = this.getStringJoinArray(item.newPicInfo.headlines);
        const isChangeHeadline = oldHeadlineJoin !== newHeadlineJoin;
        const headlineValue = this.changeValueToHtmlString(oldHeadlineJoin, newHeadlineJoin);
        return (
            <div className='pic-container'>
                {
                    this.renderHtmlDetail(
                        LangHelper.getResource('DirectAccount'), directAccountValue,
                        LangHelper.getResource('IsActive'), isActiveValue,
                        isChangeDirectAccount,
                        item.oldPicInfo.isActive !== item.newPicInfo.isActive
                    )
                }
                <div className='container-detail'>
                    <div className='detail-child-col col-title-detail'>
                        <div className='p-1'>{LangHelper.getResource('DefaultPIC')}</div>
                    </div>
                    <div className={`border-right-0 col-value-larger detail-child-col ${isChangeHeadline ? BackGroundChange : ''}`}>
                        <div className='p-1'>{headlineValue}</div>
                    </div>
                </div>
            </div>
        );
    };

    changeValueToHtmlString = (oldValue, newValue, isChangeCommunication, isCommunication = false) =>{
        const isChange = isCommunication ? isChangeCommunication : newValue !== oldValue;
        return (
            isChange ?
            <div>
                <div className='new-value'>
                    <div className='pt-1 pb-1'>{newValue}</div>
                </div><div className='old-value'>
                    <div className='pt-1 pb-1'>{oldValue}</div>
                </div>
            </div>
            : <div className='pt-1 pb-1'>{newValue}</div>
        );
    };

    renderHtmlDetail = (title1, value1, title2, value2, isChange1 = false, isChange2 = false) =>{
        return (
            <div className='container-detail'>
                <div className='detail-child-col col-title-detail'>
                    <div className='p-1'>{title1}</div>
                </div>
                <div className={`${value2 !== null ? 'detail-child-col' : ''} col-value-detail ${isChange1 ? BackGroundChange : ''}`}>
                    <div className='p-1'>{value1}</div>
                </div>
                <div className={`${title2 !== null ? 'detail-child-col col-title-detail' : ''}`}>
                    <div className='p-1'>{title2}</div>
                </div>
                <div className={`${value2 !== null ? 'detail-child-col col-value-detail' : ''} ${isChange2 ? BackGroundChange : ''}`}>
                    <div className='p-1'>{value2}</div>
                </div>
            </div>
        );
    };

    recursiveCommunicationTools = (tools, newCommunicationTools) =>{
        if(tools.length > 0) {
            const pivot = tools[0].name;
            const childTools = tools.filter(tool => tool.name === pivot);
            newCommunicationTools.push(childTools);
            const moreTools = tools.filter(tool => tool.name !== pivot);
            this.recursiveCommunicationTools(moreTools, newCommunicationTools);
        }
    };

    getStringCommunicationTools = tools =>{
        if (tools.length > 0) {
            const name = tools[0].name;
            const value = tools.map(tool => tool.value).join(', ');
            return `${name}: ${value}`;
        }
        return '-';
    };

    renderCommunicationTools = communicationTools =>{
        return (
            <div>
                {
                    communicationTools.map(tools =>{
                        if (tools.length > 0) {
                            const name = tools[0].name;
                            const valueJoin = tools.map(tool => tool.value).join(', ');
                            return <div>{name}: {valueJoin}</div>;
                        }
                        return <div>'-'</div>;
                    })
                }
            </div>
        );
    };

    getStringObject = object => object && object.name ? object.name : '-';

    getStringValue = value => value ? value : '-';

    getStringJoinArray = array => array.length > 0 ? array.map(item => item.name).join(', ') : '-';

    convertBoolToDecision = value => {
        if (value === true) {
            return 'Yes';
        } else if (value === false){
            return 'No';
        } else{
            return '-';
        }
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamsPic };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParamsPic(params);
        this.props.getPicReport(params);
    };

    render() {
        const { picReport } = this.props;
        if(!picReport || !picReport.picInfo){
            return null;
        }

        const { pageIndex, pageSize } = this.props.gridParamsPic;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: picReport.totals,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className='table-title justify-content-between d-flex align-items-center'>
                    <span>{LangHelper.getResource('ChangesLog')}</span>
                </div>
                <Table
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    width={1400}
                    autoWidth={false}
                    isPaging
                    adjustedHeight={10}
                    pageOption={pagingOption}
                    containerPadding={0}
                    onPaging={this.onPaging}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { picReport, gridParamsPic } = state;
    return { picReport, gridParamsPic };
};

export default connect(mapStateToProps, mapDispatchToProps)(PicDataGrid);
