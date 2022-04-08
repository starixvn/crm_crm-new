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
            gridParams: {
                year: new Date().getFullYear(),
                categories:'',
                siteType: 0
            },
        };
    }

    componentDidMount(){
        this.handleSettingOptions(this.props.allSettingData);
        setInterval(this.inc, 1000);
    }

    handleSettingOptions = allSettingData =>{
        const {siteTypes, categories} = allSettingData;
        const { gridParams } = this.state;

        const categoryIdFilters = [];

        const categoryOptions = categories.map(item =>{
            categoryIdFilters.push(item.mainCategoryID);
            return {
                ...item,
                checked: true
            };
        });

        const siteOptions = siteTypes.map(item =>{
            return {
                ...item
            };
        });

        const categoryIdFiltersJoin = categoryIdFilters.join(',');

        gridParams.categories = categoryIdFiltersJoin;

        this.setState({
            categoryOptions, siteOptions, gridParams
        });
    };

    handleChangeCategory = selectedItemsKey => {
        const { gridParams } = this.state;
        gridParams.categories = selectedItemsKey;
        this.setState({
            gridParams
        });
    };

    submitHandler = event => {
        event.preventDefault();
        const { gridParams } = this.state;
        this.props.setGridParams({ ...gridParams});
        this.props.getGridData({ ...gridParams});
    };

    handleChangeYear = event => {
        const value = +event.target.value;
        const { gridParams } = this.state;
        gridParams.year = value;
        this.setState({
            gridParams
        });
    };

    handleChangeSite = event => {
        const value = +event.target.value;
        const { gridParams } = this.state;
        gridParams.siteType = value;
        this.setState({
            gridParams
        });
    };

    renderOptionsYear = () => {
        const minYear = 2011;
        const currentYear = (new Date()).getFullYear();
        const options = [];
        for (let i = minYear; i <= currentYear; i++) {
            if(i === currentYear){
                options.push(<option selected value={i} key={i}>{i}</option>);
            }
            else{
                options.push(<option value={i} key={i}>{i}</option>);
            }
        }
        return options;
    };

    renderOptionsSite = siteTypes => {
        const options = [];
        siteTypes.map(item => {
            options.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });
        return options;
    };

    render() {
        const {categoryOptions, siteOptions} = this.state;

        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none form-control-year"
                            id="year" onChange={this.handleChangeYear}
                        >
                            {this.renderOptionsYear()}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="site">Site</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none form-control-site"
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
    const { allSettingData } = state;
    return {
        allSettingData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);