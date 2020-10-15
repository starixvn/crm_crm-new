import React, { Component } from 'react';
import { getSubCategories } from '../functions';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                customerNameInput: '',
                mainCategoriesTypes: '',
                subCategoriesTypes: '',
                isDisableCategorySubCategory: true
            },
            selectedSubCategoryIdsFilter: [],
            mainCategoryOptionsFilter: [],
            subCategoryOptionsFilter: []
        };
    }

    componentDidUpdate = prevProps => {
        if (prevProps.settings !== this.props.settings) {
            const mainCategoriesTypesId = [];
            const mainCategoryOptionsFilter = this.props.settings.mainCategories.map(main => {
                mainCategoriesTypesId.push(main.mainCategoryID);
                return {
                    mainCategoryID: main.mainCategoryID,
                    name: main.name,
                    checked: true
                };
            });

            const subCategoryList = [];
            const subCategoriesTypesId = [];
            this.props.settings.subCategories.map(sub => {
                subCategoriesTypesId.push(sub.subCategoryId.toString());
                if (mainCategoriesTypesId.indexOf(sub.mainCategoryID) >= 0) {
                    subCategoryList.push(sub);
                }
            });

            const isCheckDefault = true;
            const subCategoryOptionsFilter = getSubCategories(isCheckDefault, subCategoryList, []);

            this.setState(prevState => ({
                mainCategoryOptionsFilter,
                subCategoryOptionsFilter,
                filter: {
                    ...prevState.filter,
                    mainCategoriesTypes: mainCategoriesTypesId.toString(),
                    subCategoriesTypes: subCategoriesTypesId.toString()
                }
            }), () => {
                const params = this.getParams();
                this.props.setGridParamsCommunication(params);
                this.props.getGridCommunicationSetting(params);
            });
        }
    }

    mainCategoriesChangeFilter = (currentItem, selectedItemsKey) => {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                mainCategoriesTypes: selectedItemsKey
            }
        }), () => {
            if (selectedItemsKey) {
                const selectedSub = this.state.selectedSubCategoryIdsFilter.length > 1  ? this.state.selectedSubCategoryIdsFilter.split(',') 
                                                                                        : this.state.selectedSubCategoryIdsFilter;
                const selectedMain = selectedItemsKey.split(',');
                const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
                const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
                const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;

                this.setState({
                    selectedSubCategoryIdsFilter: resetSelectedSubJoin
                }, () => {
                    const isCheckDefault = false;
                    const setSubCatagories = getSubCategories(isCheckDefault, findSubByMain, this.state.selectedSubCategoryIdsFilter);
                    this.setState({
                        subCategoryOptionsFilter: setSubCatagories
                    });
                });
            }
            else {
                this.setState(prevState => ({
                    subCategoryOptionsFilter: [],
                    selectedSubCategoryIdsFilter: [],
                    filter: {
                        ...prevState.filter,
                        subCategoriesTypes: ''
                    }
                }));
            }
        });
    }

    subCategoriesChangeFilter = (currentItem, selectedItemsKey) => {
        const countSubCatagoriesChange = selectedItemsKey.split(',').length;
        this.setState(prevState => ({
            selectedSubCategoryIdsFilter: selectedItemsKey,
            filter: {
                ...prevState.filter,
                subCategoriesTypes: countSubCatagoriesChange === this.state.subCategoryOptionsFilter.length ? '0' : selectedItemsKey
            }
        }));
    }

    isDisableCatelogy = () => {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                isDisableCategorySubCategory: !this.state.filter.isDisableCategorySubCategory
            }
        }));
    }

    handlecustomerNameChange = event => {
        const { filter } = this.state;
        this.setState({
            filter: {
                ...filter,
                customerNameInput: event.target.value
            }
        });
    }

    getParams = () => {
        let countCatagories = 0;
        let countSubCatagories = 0;
        if (!this.state.filter.isDisableCategorySubCategory) {
            countCatagories = this.state.filter.mainCategoriesTypes.split(',').length;
            countSubCatagories = this.state.filter.subCategoriesTypes.split(',').length;
        }
        return {
            username: this.state.filter.customerNameInput,
            categoryIds: this.props.settings.mainCategories.length === countCatagories ? '0' : this.state.filter.mainCategoriesTypes,
            subCategoryIds: this.props.settings.subCategories.length === countSubCatagories ? '0' : this.state.filter.subCategoriesTypes,
            isDisableCategorySubCategory: this.state.filter.isDisableCategorySubCategory,
            pageIndex: this.props.gridParamsCommunication.pageIndex,
            pageSize: this.props.gridParamsCommunication.pageSize
        };
    }

    searchHandler = e => {
        e.preventDefault();
        const params = this.getParams();
        this.props.setGridParamsCommunication(params);
        this.props.getGridCommunicationSetting({ ...params });
    }

    handleOpenCreatePopup = () => {
        this.props.setCreateCommunicationPopup({ show: true });
    }

    render() {
        return (
            <Form className="form-filter">
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label htmlFor="customerName">{LangHelper.getResource('Customer')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="customerName"
                            autoComplete="off"
                            value={this.state.filter.customerNameInput}
                            onChange={this.handlecustomerNameChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('Category')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.mainCategoryOptionsFilter}
                                keyField='mainCategoryID'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                valueField='name'
                                hasAllOption={this.state.mainCategoryOptionsFilter.length > 0}
                                isAllTextShown={this.state.mainCategoryOptionsFilter.length > 0}
                                hasSearchBox
                                isDisable={this.state.filter.isDisableCategorySubCategory}
                                onChange={this.mainCategoriesChangeFilter}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{LangHelper.getResource('SubCategory')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.subCategoryOptionsFilter}
                                keyField='subCategoryId'
                                valueField='name'
                                textOptions={{ ...MULTI_SELECT_TEXT_OPTIONS, Texts: 'Any' }}
                                hasAllOption={this.state.subCategoryOptionsFilter.length > 0}
                                isAllTextShown={this.state.subCategoryOptionsFilter.length > 0}
                                hasSearchBox
                                isDisable={this.state.filter.isDisableCategorySubCategory || this.state.subCategoryOptionsFilter.length === 0}
                                onChange={this.subCategoriesChangeFilter}
                            />
                        </div>
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label={LangHelper.getResource('DisableCatSubCatfilters')}
                            checked={this.state.filter.isDisableCategorySubCategory}
                            onChange={this.isDisableCatelogy}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button className="mr-2" variant="primary" size="sm"
                            disabled={!this.state.filter.isDisableCategorySubCategory && (this.state.filter.mainCategoriesTypes.length === 0
                                || this.state.filter.subCategoriesTypes.length === 0)}
                            onClick={this.searchHandler}
                        >
                            {LangHelper.getResource('Search')}
                        </Button>
                        {
                            this.props.isHost &&
                            <Button variant="primary" size="sm"
                                onClick={this.handleOpenCreatePopup}
                            >
                                {LangHelper.getResource('Insert')}
                            </Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings,
        gridParamsCommunication
    } = state;
    return {
        settings,
        gridParamsCommunication
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);