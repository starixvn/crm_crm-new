import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import {
    getSubCategories, getCategoryParams
} from '@jsroot/common/shareScripts';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                mainCategories: [],
                subCategories: []
            },
            filter: {
                mainCategoriesTypes: '',
                subCategoriesTypes: '',
                remark: '',
                isInactiveSettings: false
            },
            selectedSubCategoryIdsFilter: [],
            mainCategoryOptionsFilter: [],
            subCategoryOptionsFilter: []
        };
    }


    componentDidMount() {
        this.props.getAllSettings().then(response => {
            this.setState({ settings: response });
            this.getSettings(response);
        });
    };

    getSettings = settings => {
        const { isInactiveSettings } = this.state.filter;

        const mainCategoriesSettings = isInactiveSettings ? settings.mainCategories : settings.mainCategories.filter(item => item.isActive);
        const mainCategoriesTypesId = [];
        const mainCategoryOptionsFilter = mainCategoriesSettings.map(main => {
            mainCategoriesTypesId.push(main.mainCategoryID.toString());
            return {
                mainCategoryID: main.mainCategoryID,
                name: main.name,
                checked: true
            };
        });

        const subCategoriesTypesId = [];
        const subCategorySettings = isInactiveSettings ? settings.subCategories : settings.subCategories.filter(item => item.isActive);
        subCategorySettings.map(sub => {
            subCategoriesTypesId.push(sub.subCategoryId.toString());
        });

        const isCheckDefault = true;
        const subCategoryOptionsFilter = getSubCategories(mainCategoriesTypesId, subCategorySettings, [], isCheckDefault);

        this.setState(prevState => ({
            mainCategoryOptionsFilter,
            subCategoryOptionsFilter,
            filter: {
                ...prevState.filter,
                mainCategoriesTypes: mainCategoriesTypesId.toString(),
                subCategoriesTypes: subCategoriesTypesId.toString()
            }
        }));
    };

    handleChangeMainCategory = (currentItem, selectedItemsKey) => {
        const { isInactiveSettings } = this.state.filter;
        const subCategorySettings = isInactiveSettings ? this.state.settings.subCategories : this.state.settings.subCategories.filter(item => item.isActive);

        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                mainCategoriesTypes: selectedItemsKey
            }
        }), () => {
            if (selectedItemsKey) {
                const selectedSubCategoryIds = this.state.selectedSubCategoryIdsFilter;
                const selectedSub = selectedSubCategoryIds.length > 1 ? selectedSubCategoryIds.split(',') : selectedSubCategoryIds;
                const selectedMain = selectedItemsKey.split(',');
                const findSubByMain = subCategorySettings.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
                const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
                const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;

                this.setState({
                    selectedSubCategoryIdsFilter: resetSelectedSubJoin
                }, () => {
                    const isCheckDefault = false;
                    const setSubCatagories = getSubCategories(selectedMain, subCategorySettings, selectedSubCategoryIds, isCheckDefault);
                    this.setState({
                        subCategoryOptionsFilter: setSubCatagories
                    });
                });
            } else {
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
    };

    handleChangeSubCategory = (currentItem, selectedItemsKey) => {
        const countSubCatagoriesChange = selectedItemsKey.split(',').length;
        this.setState(prevState => ({
            selectedSubCategoryIdsFilter: selectedItemsKey,
            filter: {
                ...prevState.filter,
                subCategoriesTypes: countSubCatagoriesChange === this.state.subCategoryOptionsFilter.length ? '0' : selectedItemsKey
            }
        }));
    };

    checkInactiveSettings = () => {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                isInactiveSettings: !this.state.filter.isInactiveSettings
            }
        }), () => this.getSettings(this.state.settings));
    };

    handleChangeRemark = event => {
        const { filter } = this.state;
        this.setState({
            filter: {
                ...filter,
                remark: event.target.value
            }
        });
    };

    getParams = () => {
        const { mainCategoriesTypes, subCategoriesTypes, remark, isInactiveSettings } = this.state.filter;
        const subCategorySettings = isInactiveSettings ? this.state.settings.subCategories : this.state.settings.subCategories.filter(item => item.isActive);
        return {
            categories: getCategoryParams(mainCategoriesTypes.split(','), subCategoriesTypes.split(','), subCategorySettings),
            remark: remark,
            active: isInactiveSettings ? 2 : 1,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
    };

    handleSubmit = async event => {
        event.preventDefault();
        const params = this.getParams();
        this.props.setGridParams(params);
        await this.props.getGridData(params);
    };

    render() {
        return (
            <Form className="form-filter">
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className="category-classification">{LangHelper.getResource('Category')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.mainCategoryOptionsFilter}
                                keyField='mainCategoryID'
                                maxDisplayItemCount={1}
                                valueField='name'
                                hasAllOption={this.state.mainCategoryOptionsFilter.length > 0}
                                isAllTextShown={this.state.mainCategoryOptionsFilter.length > 0}
                                hasSearchBox
                                onChange={this.handleChangeMainCategory}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="category-classification">{LangHelper.getResource('SubCategory')}</Form.Label>
                        <div className='form-control-wrapper'>
                            <MultipleSelect
                                dataSource={this.state.subCategoryOptionsFilter}
                                keyField='subCategoryId'
                                valueField='name'
                                maxDisplayItemCount={1}
                                hasAllOption={this.state.subCategoryOptionsFilter.length > 0}
                                isAllTextShown={this.state.subCategoryOptionsFilter.length > 0}
                                hasSearchBox
                                isDisable={this.state.subCategoryOptionsFilter.length === 0}
                                onChange={this.handleChangeSubCategory}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="category-classification" htmlFor="remark">{LangHelper.getResource('Remark')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="remark"
                            autoComplete="off"
                            value={this.state.filter.remark}
                            onChange={this.handleChangeRemark}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check className="mr-5" type="checkbox" label={LangHelper.getResource('InactiveSettings')}
                            checked={this.state.filter.isInactiveSettings}
                            onChange={this.checkInactiveSettings}
                        />
                        <Button className="mr-4" variant="primary"
                            size="sm" type="submit"
                            onClick={this.handleSubmit}
                        >
                            <UnderlineButton.submitButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    };
};

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, gridParams } = state;
    return { settings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);