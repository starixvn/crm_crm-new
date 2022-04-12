import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button, Row } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageOptions: [],
            potionOptions: [],
            siteOptions: [],
            vipOptions: [],
            username: '',
            headline: '',
            vipId: -1,
            languageIds: '',
            positionIds: '',
            siteIds: '',
            excludeIgnoredAccounts: true
        };
    }

    async componentDidMount() {
        await this.props.getAllSettings();

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
        const potionOptions = allSettings.roles.map(item => {
            positionIds.push(item.displayOrder);
            return {
                positionId: item.displayOrder,
                name: item.value,
                checked: true
            };
        });
        allSettings.sites.forEach(item => {
            item.childSites.forEach(element => {
                siteIds.push(element.id);
                siteOptions.push( {
                    siteId: element.id,
                    name: element.name,
                    checked: true
                });
            });
        });
        const vipOptions = [
            { id: -1, name: 'All' },
            { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ];

        this.setState({
            languageOptions: languageOptions,
            potionOptions: potionOptions,
            siteOptions: siteOptions,
            vipOptions: vipOptions,
            languageIds: languageIds.join(','),
            positionIds: positionIds.join(','),
            siteIds: siteIds.join(',')
        });
    }

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
        event.preventDefault();

        const { username, headline, vipId, languageIds, siteIds, positionIds, excludeIgnoredAccounts } = this.state;
        const params = {
            username: username,
            headline: headline,
            vipId: vipId,
            languageIds: languageIds,
            siteIds: siteIds,
            positionIds: positionIds,
            excludeIgnoredAccounts: excludeIgnoredAccounts,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.getCustomerReport(params);
    };

    render() {
        const { allSettings } = this.props;
        const { languageOptions, potionOptions, siteOptions, vipOptions, excludeIgnoredAccounts } = this.state;
        if (!allSettings) {
            return null;
        }

        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                <Form.Group as={Row}>
                    <div className='group-field'>
                        <Form.Label htmlFor="username" className="col-form-label">{LangHelper.getResource('Username')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none input-field"
                            autoComplete="off"
                            name="username"
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className='group-field'>
                        <Form.Label htmlFor="vip" className="col-form-label">{LangHelper.getResource('VIP')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none input-field"
                            name="vipId"
                            onChange={this.handleChange}
                        >
                            {
                                vipOptions.map((item, key) => <option key={key} value={item.id}>{item.name}</option>)
                            }
                        </Form.Control>
                    </div>
                    
                    <div className='group-field'>
                        <Form.Label htmlFor="headline" className="col-form-label">{LangHelper.getResource('Headline')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none input-field"
                            autoComplete="off"
                            name="headline"
                            onChange={this.handleChange}
                        />
                    </div>
                </Form.Group>

                <Form.Group as={Row}>
                    <div className='group-field'>
                        <Form.Label htmlFor="language" className="col-form-label">{LangHelper.getResource('Language')}</Form.Label>
                        <MultipleSelect
                            dataSource={languageOptions}
                            keyField='languageId' valueField='name'
                            isNAOption
                            maxDisplayItemCount={3}
                            hasAllOption={languageOptions.length > 0}
                            isAllTextShown={languageOptions.length > 0}
                            onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('languageIds' ,currentItem, selectedItemsKey)}
                        />
                    </div>

                    <div className='group-field'>
                        <Form.Label htmlFor="site" className="col-form-label">{LangHelper.getResource('Site')}</Form.Label>
                        <MultipleSelect
                            dataSource={siteOptions}
                            keyField='siteId' valueField='name'
                            hasAllOption={siteOptions.length > 0}
                            isAllTextShown={siteOptions.length > 0}
                            isNAOption
                            hasSearchBox
                            maxDisplayItemCount={5}
                            onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('siteIds', currentItem, selectedItemsKey)}
                        />
                    </div>

                    <div className='group-field'>
                        <Form.Label htmlFor="position" className="col-form-label">{LangHelper.getResource('Position')}</Form.Label>
                        <MultipleSelect
                            dataSource={potionOptions}
                            keyField='positionId' valueField='name'
                            hasAllOption={potionOptions.length > 0}
                            isAllTextShown={potionOptions.length > 0}
                            isNAOption
                            maxDisplayItemCount={3}
                            onChange={(currentItem, selectedItemsKey) => this.handleChangeMultipleSelect('positionIds', currentItem, selectedItemsKey)}
                        />
                    </div>
                </Form.Group>

                <Form.Group as={Row}>
                    <div className='group-checkbox'>
                        <Form.Check type="checkbox" className="check-exclude"
                            checked={excludeIgnoredAccounts}
                            onChange={this.handleCheckExclude}
                        />
                        <Form.Label htmlFor="excludeIgAccounts" className="col-form-label">{LangHelper.getResource('ExcludeIgnoredAccounts')}</Form.Label>
                    </div>
                    <div className='group-field'>
                        <Button type="submit" className="btn btn-primary btn-sm">{LangHelper.getResource('Submit')}</Button>
                    </div>
                </Form.Group>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerReport, allSettings } = state;
    return { customerReport, allSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);