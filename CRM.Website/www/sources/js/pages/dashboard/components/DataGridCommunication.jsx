import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import { getSubCategories } from '@jsroot/common/shareScripts';

export class DataGridCommunication extends Component {
    componentDidMount() {
        this.props.getCommunicationLogs({ customerId: this.props.id });
    }
    componentDidUpdate(prevProps, prevState) {
        if ( this.props.id !== prevProps.id ) {
            this.props.getCommunicationLogs({ customerId: this.props.id });
        }
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={23}>{LangHelper.getResource('FeedbackDate')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('MainCategoryAndSubCategory')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Reviewer')}</HeaderCell>
                <HeaderCell colWidth={17}>{LangHelper.getResource('Duplicate')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { communicationLogs, isHost} = this.props;

        if (communicationLogs.data.length > 0) {
            return communicationLogs.data.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={isHost ? 10 : 9}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    handleShowEditCommunication = id => {
        this.props.setEditCommunicationDialog({ show: true, id: id });
    };

   

    handleShowNoOfInquiry = id => {
        this.props.setNoOfInquiryDialog({ show: true, feedbackId: id });
    };

    handleShowCreateCommunication = async id => {
        await DataService.getDataAsync(`CommunicationLog/GetLogByFeedbackId?id=${id}&modeId=${1}`).then(response => {
            if(!response || !response.data){
                return;
            }
            const options = this.getOptions(response.data);
            this.props.setCreateCommunicationDialog({ show: true, custId:response.data.log.custId, options: options });
        }).catch(Site.handleAxiosError);
    };

    getOptions = data => {
        const createLogSettings = this.getCreateLogSettings(data.log);
        const relatedCustomers = data.log.relatedCustomers.map(customer => {
            return {
                isSiteActive: customer.isSiteActive,
                isLicensee: customer.isLicensee,
                custId: customer.custId,
                val: customer.username,
                isAuthorized: customer.isAuthorized
            };
        });
        const extensionOptions = data.settings.extensions.map(item => {
            return {
                id: item.id, value: item.value,
                checked: createLogSettings.extensionIds.includes(item.id)
            };
        });
        const communicationToolOptions = data.settings.communicationTools.map(item => {
            return {
                id: item.id, name: item.name,
                checked: createLogSettings.communicationToolIds.includes(item.id)
            };
        });
        const mainCategoryOptions = data.settings.mainCategories.map(item => {
            return {
                mainCategoryID: item.mainCategoryID,
                name: item.name,
                checked: createLogSettings.mainCategoryIds.includes(item.mainCategoryID)
            };
        });

        const mainCategoryIds = createLogSettings.mainCategoryIds.join(',').split(',');
        const subCategoryIds = createLogSettings.subCategoryIds.join(',').split(',');
        const subCategoryOptions = getSubCategories(mainCategoryIds, data.settings.subCategories, subCategoryIds, false);

        const productOptions = data.settings.products.map(item => {
            return {
                id: item.id, value: item.value,
                checked: createLogSettings.productIds.includes(item.id)
            };
        });
        const subProducts = data.settings.subProducts.filter(item => createLogSettings.productIds.includes(item.parentId) && item.parentId !== 0);
        const subProductOptions = subProducts.map(item => {
            return {
                id: item.id, value: item.value,
                checked: createLogSettings.subProductIds.includes(item.id)
            };
        });
        const bettypes = data.settings.bettypes.filter(item => createLogSettings.subProductIds.includes(item.parentId) && item.parentId !== 0);
        const betTypeOptions = bettypes.map(item => {
            return {
                id: item.id, value: item.value,
                checked: createLogSettings.betTypeIds.includes(item.id)
            };
        });

        return {
            extensionOptions,
            communicationToolOptions,
            mainCategoryOptions,
            subCategoryOptions,
            productOptions,
            subProductOptions,
            betTypeOptions,
            relatedCustomers,
            statusId: data.log.statusId,
            roleId: data.log.roleId,
            siteId: data.log.siteId,
            siteName: data.log.siteSetting.name,
            responseId: data.log.responseId,
            licenseeTypeId: data.log.licenseeType,
            countryId: data.log.countryId,
            noInquiries: data.log.noInquiries,
            languageId: data.log.languageId,
            subject: data.log.subject,
            autoGenerated: data.log.autoField,
            remark: data.log.description,
            solution: data.log.solution,
            solveDate: DateTimeService.toShortDateTimeFormat(data.log.solveDate),
            isReviewed: data.log.isReviewed,
            review: data.log.review,
            reviewer: data.log.reviewer,
            settings: data.settings,
            extensionIds: createLogSettings.extensionIds.join(','),
            communicationToolIds: createLogSettings.communicationToolIds.join(','),
            mainCategoryIds: createLogSettings.mainCategoryIds.join(','),
            subCategoryIds: createLogSettings.subCategoryIds.join(','),
            productIds: createLogSettings.productIds.join(','),
            subProductIds: createLogSettings.subProductIds.join(','),
            betTypeIds: createLogSettings.betTypeIds.join(',')
        };
    };

    getCreateLogSettings = log => {
        const createLogSettings = log.settings;
        const extensions = createLogSettings.filter(item => item.settingType === 'Station');
        const communicationTools = createLogSettings.filter(item => item.settingType === 'Communication');
        const categories = createLogSettings.filter(item => item.settingType === 'Category');
        const products = createLogSettings.filter(item => item.settingType === 'Product');
        return {
            extensionIds: extensions.map(x => x.settingId),
            communicationToolIds: communicationTools.map(x => x.settingId),
            mainCategoryIds: categories.map(x => x.settingId),
            subCategoryIds: categories.map(x => x.subSettingId),
            productIds: products.map(x => x.settingId),
            subProductIds: products.map(x => x.subSettingId),
            betTypeIds: products.map(x => x.subSettingIdLevel3)
        };
    };

    handleGroupCategory = data => {
        return data.reduce( (accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.settingId === item.settingId);
            if (itemExist) {
                itemExist.subSettingId = [...itemExist.subSettingId, currentValue.subSettingId];
            }else {
                accumulator.push({ settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId] });
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
                    <div className="font-weight-bold">{filterMainCategory?.settingValue || ''}</div>
                    {
                        value?.subSettingId.map((elementId,index) => {
                            if(filterMainCategory){
                                const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === elementId);
                                return(
                                    <div key={index} className="ml-3 font-italic">{filterSubCategory?.name}</div>
                                );
                            }
                        })
                    }
                </Fragment>
            );
        });
    };

    renderRow = (item, index) => {
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        const cssStatus = item.status ? item.status.toLowerCase() : '';
        const cssColor = (cssStatus !== 'closed' && cssStatus !== 'pending') ? '' : cssStatus;
        return (
            <Row key={index} className={cssColor} >
                <Cell className="text-center">
                    <span className='link-detail' onClick={() => this.handleShowEditCommunication(item.feedbackId)}>{item.feedbackId}</span>
                </Cell>
                {
                    this.props.isHost ?
                        <Cell className="text-center">
                            <span className="fa fa-pencil rounded-circle icon-edit" onClick={() => this.handleShowNoOfInquiry(item.feedbackId)} />
                        </Cell> :
                        <Cell />
                }
                <Cell className="text-center">
                    {DateTimeService.toShortDateTimeFormat(item.feedbackDate)}
                </Cell>
                <Cell>{this.renderCategory(item)}</Cell>
                <Cell>{item.subject}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>
                    {item.duration.replace(/\s+/g, '')}
                </Cell>
                <Cell className='text-left'>{item.handler}</Cell>
                <Cell className='text-left'>{item.reviewer}</Cell>
                <Cell className='text-center'>
                    {
                        hasCreateFeedbackPermission &&
                        <Button size="sm" onClick={() => this.handleShowCreateCommunication(item.feedbackId)}>Duplicate</Button>
                    }
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
            <div className='communication-log-grid'>
            <div className='d-flex table-title align-items-center justify-content-between'>
                <span>{LangHelper.getResource('LastTenCommunicationLog')}</span>
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
    const { communicationLogs } = state;
    return { communicationLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridCommunication);