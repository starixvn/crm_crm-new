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
            siteOptions: []
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.allSettingData);
    }

    handleSettingOptions = allSettingData =>{
        const {siteTypes, categories} = allSettingData;
        const { gridParams } = this.props;
        const categoryIdFilters = [];
        const siteIdFilters = [];

        const categoryOptions = categories.map(item =>{
            categoryIdFilters.push(item.mainCategoryID);
            return {
                ...item,                
                checked: true
            };
        });

        const siteOptions = siteTypes.map(item =>{
            siteIdFilters.push(item.mainCategoryID);
            return {
                ...item
            };
        });

        const categoryIdFiltersJoin = categoryIdFilters.join(',');

        this.setState({
            categoryOptions, siteOptions
        });
        this.props.setGridParams({ ...gridParams, categories: categoryIdFiltersJoin });
    };

    handleChangeCategory = selectedItemsKey => {
        const { gridParams } = this.props;
        this.props.setGridParams({ ...gridParams, categories: selectedItemsKey });
    };

    submitHandler = event => {
        event.preventDefault();
        const { gridParams } = this.props;
        this.props.getGridData({ ...gridParams});
        this.props.setGridParams({ ...gridParams});
    };

    handleChangeYear = event => {
        const value = +event.target.value;
        const { gridParams } = this.props;
        this.props.setGridParams({ ...gridParams, year: value });
    };

    handleChangeSite = event => {
        const value = +event.target.value;
        const { gridParams } = this.props;
        this.props.setGridParams({ ...gridParams, siteType: value });

    };

    renderOptionsYear = () => {
        const minYear = 2011;
        const currentYear = (new Date()).getFullYear();
        const options = [];
        for (let i = minYear; i <= currentYear; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    };

    renderOptionsSite = siteTypes => {
        const options = [];
        for (let i = 0; i < siteTypes.length; i++) {
            options.push(<option value={siteTypes[i].id} key={siteTypes[i].id}>{siteTypes[i].name}</option>);
        }
        return options;
    };

    render() {
        const { gridParams } = this.props;

        const {categoryOptions, siteOptions} = this.state;

        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" value={gridParams.year}
                            id="year" onChange={this.handleChangeYear}
                        >
                            {this.renderOptionsYear()}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="site">Site</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" value={gridParams.siteType}
                            id="year" onChange={this.handleChangeSite}
                        >
                            {this.renderOptionsSite(siteOptions)}
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
                                    this.handleChangeCategory(selectedItemsKey);
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
    const { gridParams, allSettingData } = state;
    return {
        gridParams, allSettingData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);