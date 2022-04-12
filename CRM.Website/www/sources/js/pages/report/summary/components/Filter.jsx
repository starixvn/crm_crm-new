import LangHelper from '@jsroot/common/langHelper';
import React, { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categoryOptions: [],
            siteOptions: [],
            year: new Date().getFullYear(),
            categories: '',
            siteType: 0
        };
    }

    componentDidMount() {
        this.handleSettingOptions(this.props.allSettingData);
    }

    handleSettingOptions = allSettingData => {
        const { siteTypes, categories } = allSettingData;
        const categoryIdFilters = [];
        const categoryOptions = categories.map(item => {
            categoryIdFilters.push(item.mainCategoryID);
            return {
                ...item,
                checked: true
            };
        });

        const siteOptions = siteTypes;
        const categoryIdFiltersJoin = categoryIdFilters.join(',');
        this.setState({
            categoryOptions, siteOptions, categories: categoryIdFiltersJoin
        });
    };

    submitHandler = event => {
        event.preventDefault();
        const { year, categories, siteType } = this.state;
        const params = { year, categories, siteType };
        this.props.setGridParams({ ...params });
        this.props.getGridData({ ...params });
    };

    render() {
        const { categoryOptions, siteOptions } = this.state;

        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none form-control-year"
                            id="year" value={this.state.year} onChange={evt => this.setState({year: evt.target.value})}
                        >
                            {
                                this.props.allSettingData.yearRange.map(key => <option key={key.value} value={key.value}>{key.value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="site">Site</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none form-control-site"
                            id="year" onChange={evt => this.setState({siteType: evt.target.value})}
                        >
                            {
                                siteOptions.map(item =>
                                   <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className='form-width'>
                        <Form.Label htmlFor="categoryId">{LangHelper.getResource('Category')}</Form.Label>
                        <div className='form-control-wrapper Category-width'>
                            <MultipleSelect
                                valueField='name'
                                dataSource={categoryOptions}
                                keyField='mainCategoryID'
                                maxDisplayItemCount={0}
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.setState({
                                        categories: selectedItemsKey
                                    });                                    
                                }}
                                hasSearchBox
                                isNAOption
                            />
                        </div>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" size="sm" onClick={this.submitHandler}>
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettingData } = state;
    return {
        allSettingData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);