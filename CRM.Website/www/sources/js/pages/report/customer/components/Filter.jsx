import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { changeSiteSetting } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languageOptions: [],
            positionOptions: [],
            siteOptions: [],
            vipOptions: [],
            username: '',
            headline: null,
            vipId: -1,
            languageIds: null,
            positionIds: '',
            siteIds: null,
            excludeIgnoredAccounts: true,
            checkValidatePosition: false,
            isShowFilter: true
        };
    }

    componentDidMount() {
        this.initSettingOptions();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            const btn = document.getElementById('btn-submit-customer-report');
            btn.click();
        }
    }

    initSettingOptions = () => {
        const { allSettings } = this.props;
        const languageIds = [], positionIds = [], siteIds = [0], siteOptions = [];
        const languageOptions = allSettings.languages.map(item => {
            languageIds.push(item.languageId);
            return {
                languageId: item.languageId,
                name: item.name,
                checked: true
            };
        });
        const positionOptions = allSettings.roles.map(item => {
            positionIds.push(item.displayOrder);
            return {
                positionId: item.displayOrder,
                name: item.value,
                checked: true
            };
        });

        allSettings.sites.forEach((item, index) => {
            siteOptions.push({
                siteId: item.id,
                name: item.name,
                checked: true,
                subItem: item.childSites.map((element, key) => {
                    const childList = element.childSites.map(child => {
                        siteIds.push(child.id);
                        return { key: child.id, value: child.name, checked: true }
                    });
                    return {
                        key: element.id > 0 ? element.id : key,
                        value: element.name,
                        name: element.name,
                        checked: true,
                        childList: childList
                    };
                })
            });
        });

        siteOptions.unshift({ siteId: 0, name: 'N/A', checked: true });
        const vipOptions = [
            { id: -1, name: 'All' },
            { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ];

        const siteOptionsFilter = changeSiteSetting(siteOptions, 'subItem', 'childList');

        this.setState({
            languageOptions: languageOptions,
            positionOptions: positionOptions,
            siteOptions: siteOptionsFilter,
            vipOptions: vipOptions,
            languageIds: languageIds.join(','),
            positionIds: positionIds.join(','),
            siteIds: siteIds.join(',')
        });
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };

    handleChangeSite = site => {
        this.setState({ siteId: site.id });
    };

    handleChangeMultipleSelect = (name, currentItem, selectedItemsKey) => {
        this.setState({ [name]: selectedItemsKey });
    };

    handleCheckExclude = event => {
        this.setState({ excludeIgnoredAccounts: event.target.checked });
    };

    handleSubmit = event => {
        this.setState({ checkValidatePosition: true });

        const { username, headline, vipId, languageIds, siteIds, positionIds, excludeIgnoredAccounts } = this.state;
        const params = {
            username: username === '' ? null : username,
            headline: headline === '' ? null : headline,
            vipId: vipId,
            languageIds: languageIds === '' ? '0' : languageIds,
            siteIds: siteIds === '' ? '0' : siteIds,
            positionIds: positionIds.replace('5', '5,6,7,8,9,10'),
            excludeIgnoredAccounts: excludeIgnoredAccounts,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
        this.props.setGridParams(params);
        positionIds !== '' && this.props.getCustomerReport(params);
    };

    handleToggleFilter = () => {
        this.setState(previousState => ({
            isShowFilter: !previousState.isShowFilter
        }));
    };

    isErrorPosition = () => {
        const { checkValidatePosition, positionIds } = this.state;
        if (checkValidatePosition && positionIds === '') {
            return true;
        }
        return false;
    };

    render() {
        const { languageOptions, positionOptions, siteOptions, vipOptions, excludeIgnoredAccounts, isShowFilter } = this.state;

        return (
            <Form className="form-filter" onSubmit={this.handleSubmit} action="javascript:void(0)">
                {
                    isShowFilter &&
                    <Fragment>
                        {
                            this.isErrorPosition() && (
                                <Alert variant='danger'>
                                    <ul className='list-message-error'>
                                        <li>{LangHelper.getResource('PleaseChoosePosition')}</li>
                                    </ul>
                                </Alert>
                            )
                        }
                        
                        <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                        <Form.Row className='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="username" className="col-auto col-form-label">{LangHelper.getResource('Username')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none input-field"
                                    autoComplete="on"
                                    name="username"
                                    id="username"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="vip" className="col-auto col-form-label">{LangHelper.getResource('VIP')}</Form.Label>
                                <Form.Control as="select" size="sm" className="shadow-none input-field"
                                    name="vipId"
                                    onChange={this.handleChange}
                                >
                                    {
                                        vipOptions.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="headline" className="col-auto col-form-label">{LangHelper.getResource('Headline')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none input-field"
                                    autoComplete="off"
                                    name="headline"
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="language" className="col-auto col-form-label">{LangHelper.getResource('Language')}</Form.Label>
                                <div className='form-control-wrapper'>
                                    <MultipleSelect
                                        dataSource={languageOptions}
                                        keyField='languageId' valueField='name'
                                        isNAOption
                                        isCheckedNA
                                        maxDisplayItemCount={2}
                                        hasAllOption={languageOptions.length > 0}
                                        onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('languageIds', currentItem, selectedItemsKey)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="site" className="col-auto col-form-label">{LangHelper.getResource('Site')}</Form.Label>
                                <div className='form-control-wrapper'>
                                    <MultipleSelect
                                        dataSource={siteOptions}
                                        keyField='siteId' valueField='name'
                                        hasAllOption={siteOptions.length > 0}
                                        isNAOption
                                        isCheckedNA
                                        isAllToggle
                                        maxDisplayItemCount={6}
                                        onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('siteIds', currentItem, selectedItemsKey)}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label htmlFor="position" className="col-auto col-form-label">{LangHelper.getResource('Position')}</Form.Label>
                                <div className={`form-control-wrapper ${this.isErrorPosition() ? 'danger-position' : ''}`}>
                                    <MultipleSelect
                                        dataSource={positionOptions}
                                        keyField='positionId' valueField='name'
                                        hasAllOption={positionOptions.length > 0}
                                        isNAOption
                                        maxDisplayItemCount={2}
                                        onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('positionIds', currentItem, selectedItemsKey)}
                                    />
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row className='form-row'>
                            <Form.Group>
                                <Form.Check type="checkbox" className="check-exclude"
                                    checked={excludeIgnoredAccounts}
                                    onChange={this.handleCheckExclude}
                                />
                                <Form.Label htmlFor="excludeIgAccounts" className="col-form-label label-exclude">{LangHelper.getResource('ExcludeIgnoredAccounts')}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Button id='btn-submit-customer-report' type="submit" className="btn btn-primary btn-sm"><UnderlineButton.submitButton /></Button>
                            </Form.Group>
                        </Form.Row>
                    </Fragment>
                }
                <div className="show-filter">
                    <span className={`${isShowFilter ? 'fa fa-caret-up' : 'fa fa-caret-down'} icon`} onClick={this.handleToggleFilter} />
                </div>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, gridParams } = state;
    return { allSettings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);