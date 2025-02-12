import LangHelper from '@jsroot/common/langHelper';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { toast } from 'react-toastify';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
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

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.submitHandler(event);
        }
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
        const { year, categories, siteType, siteOptions } = this.state;
        if (!siteOptions || siteOptions.length === 0) {
            toast.error(LangHelper.getResource('NoPermissionOnCreditOrLicensee'));
            return;
        }
        const params = { year, categories, siteType };
        this.props.setGridParams({ ...params });
        this.props.getGridData({ ...params });
    };

    render() {
        const { categoryOptions, siteOptions } = this.state;

        return (
            <Form className="form-filter-v2" onSubmit={this.submitHandler}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none form-control-year w-100"
                            id="year" value={this.state.year} onChange={evt => this.setState({year: evt.target.value})}
                        >
                            {
                                this.props.allSettingData.yearRange.map(key => <option key={key.value} value={key.value}>{key.value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className='label-width' htmlFor="site">Site</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none w-100"
                            id="siteType" onChange={evt => this.setState({siteType: evt.target.value})}
                        >
                            {
                                siteOptions.map(item =>
                                   <option value={item.id} key={item.id}>{item.name}</option>
                                )
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group style={{width: '270px'}} className='form-width'>
                        <Form.Label htmlFor="categoryId">{LangHelper.getResource('Category')}</Form.Label>
                        <div className='form-control-wrapper w-100'>
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

                    <Form.Group style={{width: '60px'}}>
                        <Button variant="primary" size="sm" onClick={this.submitHandler}>
                            <UnderlineButton.submitButton />
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