import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Policy } from '@jsroot/common/constants';

export class DataGridCommunication extends Component {

    componentDidMount() {
        this.props.getCommunicationLogs({ customerId: 1754 });
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('FeedbackDate')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Reviewer')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Duplicate')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { communicationLogs } = this.props;

        if (communicationLogs.data.length > 0) {
            return communicationLogs.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={window.createUpdateFeedbackPermission === Policy.Host ? 10 : 9}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    handleEditCommunicationLog = id => {
        this.props.setEditCommunicationDialog({ show: true, feedbackId: id });
    };

    handleNoOfInquiry = id => {
        this.props.setNoOfInquiryDialog({ show: true, feedbackId: id });
    };

    handleGroupCategory = data => {
        return data.reduce( (accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.settingId === item.settingId);
            if (itemExist) {
                itemExist.subSettingId = [...itemExist.subSettingId, currentValue.subSettingId];
            }else {
                accumulator.push({settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId]});
            }
            return accumulator;
        },[]);
    };

    renderCategory = item => {
        const { mainCategories } = this.props.communicationLogs;
        const groupCategory = this.handleGroupCategory(item.settings);

        return groupCategory.map((value,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === value.settingId);

            return (
                <Fragment key={key}>
                    <div className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subSettingId.map((elementId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === elementId);
                            return(
                                <div key={index} className="ml-3 font-italic">{filterSubCategory.name}</div>
                            );
                        })
                    }
                </Fragment>
            );
        });
    };

    renderRow = (item, index) => {
        const cssStatus = item.status ? item.status.toLowerCase() : '';
        const cssColor = (cssStatus !== 'closed' && cssStatus !== 'pending') ? '' : cssStatus;
        return (
            <Row key={index} className={cssColor}>
                <Cell className="text-center">
                    <span className='link-detail' onClick={() => this.handleEditCommunicationLog(item.feedbackId)}>{item.feedbackId}</span>
                </Cell>
                {
                    window.createUpdateFeedbackPermission === Policy.Host && (
                        <Cell className="text-center">
                            <span className="rounded-circle fa fa-pencil icon-edit"
                                onClick={() => this.handleNoOfInquiry(item.feedbackId)}
                            />
                        </Cell>
                    )
                }
                <Cell className="text-center">{DateTimeService.toShortDateTimeFormat(item.feedbackDate)}</Cell>
                <Cell>{this.renderCategory(item)}</Cell>
                <Cell>{item.subject}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.duration.replace(/\s+/g, '')}</Cell>
                <Cell className='text-center'>{item.handler}</Cell>
                <Cell className='text-center'>{item.reviewer}</Cell>
                <Cell className='text-center'>
                    <Button variant="primary" size="sm">{LangHelper.getResource('Duplicate')}</Button>
                </Cell>
            </Row>
        );
    };

    render() {
        const { communicationLogs } = this.props;
        if (!communicationLogs) {
            return null;
        }

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center mt-3'>
                    <span>{LangHelper.getResource('LastTenCommunicationLog')}</span>
                </div>
                <Table
                    width={1319}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { communicationLogs } = state;
    return { communicationLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridCommunication);
