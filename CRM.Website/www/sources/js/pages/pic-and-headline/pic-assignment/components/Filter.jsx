import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import functions from '../common.functions';
import { toast } from 'react-toastify';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                site: '1',
                currency: '1',
                status: '1',
                headlineType: 2,
                groupHeadline: '',
                picName: '',
                directAccount: '',
                position: '1',
                excludeAssignedAcc: false,
                excludeIgnoredAcc: true,
                excludeIsTest: true
            },
            siteOptions: [],
            currencyOptions: [],
            statusOptions: [],
            positionOptions: [],
            showFilter: false
        };
    }

    componentDidMount = () => {
        this.props.getSettings().then( async () => {
            const siteIds = [], siteOptions = [];

            this.props.settings.siteList.map((item, key) => {
                siteOptions.push({
                    name: item.name,
                    checked: true,
                    id: key,
                    subItem: item.childSites.map(element => {
                        siteIds.push(element.site);
                        return {
                            key: element.site,
                            value: element.site,
                            name: element.site,
                            checked: true
                        };
                    })
                });
            });

            const currencyIds = [];
            const currencyOptions = this.props.settings.currencyList.map(x => {
                currencyIds.push(x.id);
                return {
                    id: x.id,
                    name: x.name,
                    checked: true
                };
            });

            const statusOptions = this.props.settings.statusList.map(x => {
                return {
                    id: x,
                    name: x,
                    checked: true
                };
            });

            const positionIds = [];
            const positionOptions = this.props.settings.positionList.map(x => {
                positionIds.push(x.settingId);
                return {
                    id: x.settingId,
                    name: x.settingValue,
                    checked: true
                };
            });

            await this.setState(prevState => ({
                siteOptions,
                currencyOptions,
                statusOptions,
                positionOptions,
                filter: {
                    ...prevState.filter,
                    groupHeadline: window.assignPIC !== undefined ? window.assignPIC.username : '',
                    site: siteIds.toString(),
                    currency: currencyIds.toString(),
                    status: this.props.settings.statusList.toString(),
                    position: positionIds.toString()
                }
            }));

            if(window.assignPIC !== undefined){
                this.handleSubmit();
            }
        });
    };

    handleFilterChange = (name, value) =>
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [name]: value
            }
        }));

    handleChange = event => {
        event.persist();
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [event.target.name]: event.target.value
            }
        }));
    };

    handleCheckBoxChange = event => {
        event.persist();
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                [event.target.name]: event.target.checked
            }
        }));
    };

    handleSiteChange = (currentItem, selectedItemsKey) => this.handleFilterChange('site', selectedItemsKey);

    handleCurrencyChange = (currentItem, selectedItemsKey) => this.handleFilterChange('currency', selectedItemsKey);

    handleStatusChange = (currentItem, selectedItemsKey) => this.handleFilterChange('status', selectedItemsKey);

    handlePositionChange = (currentItem, selectedItemsKey) => {
        this.handleFilterChange('position', selectedItemsKey);
        const positionOptions = this.state.positionOptions.map(position =>{
            return {
                ...position, checked: selectedItemsKey.includes(position.id.toString()) ? true : false
            }
        });
        this.setState({positionOptions});
    }

    renderHeadlineTypeOption = item => <option key={item.id} value={item.id}>{item.name}</option>;

    getParams = () => {
        const { pageIndex, pageSize } = this.props.gridParams;
        return {
            ...this.state.filter,
            pageIndex,
            pageSize
        };
    };

    handleSubmit = () => {
        const params = this.getParams();
        if (!this.state.filter.site) {
            toast.error(LangHelper.getResource('PleaseChooseSite'));
            return;
        }
        if (!this.state.filter.currency) {
            toast.error(LangHelper.getResource('PleaseChooseCurrency'));
            return;
        }
        if (!this.state.filter.status) {
            toast.error(LangHelper.getResource('PleaseChooseStatus'));
            return;
        }
        if (!this.state.filter.position) {
            toast.error(LangHelper.getResource('PleaseChoosePosition'));
            return;
        }
        params.pageIndex = 1;
        this.props.setGridParams(params);
        this.props.getGridData(params, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
    };

    handleOpenAssignPicPopup = () => this.props.setAssignPicPopup({ show: true });

    handleToggleFilter = isToggle => {
        this.setState({ showFilter: isToggle });
        window.dispatchEvent(new Event('resize'));
        if(isToggle){
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    };

    render() {
        const { isHost } = this.props;

        return (
            <Form className={`form-filter-v2 ${this.state.showFilter ? 'show-filter' : ''}`} onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Site')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.siteOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => this.handleSiteChange(currentItem, selectedItemsKey)
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Currency')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.currencyOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => this.handleCurrencyChange(currentItem, selectedItemsKey)
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className='form-row-status'>
                        <Form.Label>{LangHelper.getResource('Status')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.statusOptions}
                                keyField='id'
                                valueField='name'
                                statusField='checked'
                                isSummited={false}
                                isAllTextShown
                                onChange={
                                    (currentItem, selectedItemsKey) => this.handleStatusChange(currentItem, selectedItemsKey)
                                }
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('HeadlineType')}</Form.Label>
                        <Form.Control as='select' size='sm' className='shadow-none'
                            name='headlineType' value={this.state.filter.headlineType}
                            onChange={this.handleChange}
                        >
                            <option value={2}>{LangHelper.getResource('All')}</option>
                            {
                                this.props.settings && this.props.settings.headlineTypeList &&
                                this.props.settings.headlineTypeList.map(this.renderHeadlineTypeOption)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('GroupHeadline')}</Form.Label>
                        <Form.Control as='input' size='sm' className='shadow-none'
                            name='groupHeadline' value={this.state.filter.groupHeadline}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    {
                        !this.state.showFilter &&
                        <Form.Group style={{width: '210px'}}>
                            <Button className='mr-4' variant='primary' size='sm' onClick={this.handleSubmit}>
                                {LangHelper.getResource('Submit')}
                            </Button>
                            {
                                isHost &&
                                <Button style={{width: '100px'}} className='mr-2' variant='primary' size='sm' onClick={this.handleOpenAssignPicPopup}>
                                    {LangHelper.getResource('AssignPIC')}
                                </Button>
                            }
                        </Form.Group>
                    }
                </Form.Row>
                {
                    this.state.showFilter &&
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('PIC')}</Form.Label>
                            <Form.Control as='input' size='sm' className='shadow-none'
                                name='picName' value={this.state.filter.picName}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('DirectAccount')}</Form.Label>
                            <Form.Control as='input' size='sm' className='shadow-none'
                                name='directAccount' value={this.state.filter.directAccount}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>{LangHelper.getResource('Position')}</Form.Label>
                            <div className='form-control-wrapper'>
                                <MultipleSelect
                                    dataSource={this.state.positionOptions}
                                    keyField='id'
                                    valueField='name'
                                    statusField='checked'
                                    isSummited={false}
                                    isAllTextShown
                                    onChange={
                                        (currentItem, selectedItemsKey) => this.handlePositionChange(currentItem, selectedItemsKey)
                                    }
                                />
                            </div>
                        </Form.Group>
                        <Form.Group id='form-checkbox'>
                            <div className='filter-checkbox'>
                                <input type='checkbox'
                                    className='shadow-none'
                                    name='excludeAssignedAcc'
                                    checked={this.state.filter.excludeAssignedAcc}
                                    onChange={this.handleCheckBoxChange}
                                />
                                <div className='filter-checkbox-text'>{LangHelper.getResource('OnlyShowUnassignedDirectAccounts')}</div>
                                <input type='checkbox'
                                    className='shadow-none'
                                    name='excludeIgnoredAcc'
                                    checked={this.state.filter.excludeIgnoredAcc}
                                    onChange={this.handleCheckBoxChange}
                                />
                                <div className='filter-checkbox-text'>{LangHelper.getResource('ExcludeIgnoredAccounts')}</div>
                                <input type='checkbox'
                                    className='shadow-none'
                                    name='excludeIsTest'
                                    checked={this.state.filter.excludeIsTest}
                                    onChange={this.handleCheckBoxChange}
                                />
                                <div className='filter-checkbox-text'>{LangHelper.getResource('ExcludeTestAccounts')}</div>
                            </div>
                        </Form.Group>
                        {
                            this.state.showFilter &&
                            <Form.Group style={{width: '210px'}}>
                                <Button className='mr-4' variant='primary' size='sm' onClick={this.handleSubmit}>
                                    {LangHelper.getResource('Submit')}
                                </Button>
                                {
                                    isHost &&
                                    <Button style={{width: '100px'}} className='mr-2' variant='primary' size='sm' onClick={this.handleOpenAssignPicPopup}>
                                        {LangHelper.getResource('AssignPIC')}
                                    </Button>
                                }
                            </Form.Group>
                        }
                    </Form.Row>
                }
                {
                    this.state.showFilter
                        ? <span className="fa fa-caret-up fa-sm toggle-filter" onClick={() => this.handleToggleFilter(false)} />
                        : <span className="fa fa-caret-down fa-sm toggle-filter" onClick={() => this.handleToggleFilter(true)} />
                }
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        settings,
        gridParams
    } = state;

    return {
        settings,
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);