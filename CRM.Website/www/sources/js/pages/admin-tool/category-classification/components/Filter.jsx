import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import UnderlineButton from '@jsroot/common/underlineButton';
import { toast } from 'react-toastify';
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
                remark: ''
            },
            selectedSubCategoryIdsFilter: [],
            mainCategoryOptionsFilter: [],
            subCategoryOptionsFilter: []
        };
    }


    componentDidMount() {
        this.props.getAllSettings().then(response => {
            this.setState({ settings: response });
            this.getSettings(response, true);
        });
    };

    getSettings = (settings, isGetData) => {
        const mainCategoriesTypesId = [];
        const mainCategoriesSettings = settings.mainCategories;
        const mainCategoryOptionsFilter = mainCategoriesSettings.map(main => {
            mainCategoriesTypesId.push(main.mainCategoryID.toString());
            return {
                mainCategoryID: main.mainCategoryID,
                name: main.name,
                checked: true
            };
        });

        const subCategoriesTypesId = [];
        const subCategorySettings = settings.subCategories;
        subCategorySettings.map(sub => {
            subCategoriesTypesId.push(sub.subCategoryId.toString());
        });
        const filterSubCategoriesTypesId = [...new Set(subCategoriesTypesId)];

        const isCheckDefault = true;
        const subCategoryOptionsFilter = getSubCategories(mainCategoriesTypesId, subCategorySettings, [], isCheckDefault);

        this.setState(prevState => ({
            mainCategoryOptionsFilter,
            subCategoryOptionsFilter,
            filter: {
                ...prevState.filter,
                mainCategoriesTypes: mainCategoriesTypesId.toString(),
                subCategoriesTypes: filterSubCategoriesTypesId.toString()
            },
            selectedSubCategoryIdsFilter: filterSubCategoriesTypesId.toString()
        }), async () => {
            if (isGetData) {
                const params = this.getParams();
                await new Promise(resolve => setTimeout(resolve, 400));
                this.props.setGridParams(params);
                this.props.getGridData(params);
            }
        });
    };

    handleChangeMainCategory = (currentItem, selectedItemsKey) => {
        const subCategorySettings = this.state.settings.subCategories;
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

                this.setState(prevState =>({
                    selectedSubCategoryIdsFilter: resetSelectedSubJoin,
                    filter: {
                        ...prevState.filter,
                        subCategoriesTypes: resetSelectedSubJoin.length > 0 ? resetSelectedSubJoin : ''
                    }
                }), () => {
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
        this.setState(prevState => ({
            selectedSubCategoryIdsFilter: selectedItemsKey,
            filter: {
                ...prevState.filter,
                subCategoriesTypes: selectedItemsKey
            }
        }));
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
        const { mainCategoriesTypes, subCategoriesTypes, remark } = this.state.filter;
        const subCategorySettings = this.state.settings.subCategories;

        return {
            categories: getCategoryParams(mainCategoriesTypes.split(','), subCategoriesTypes.split(','), subCategorySettings),
            remark: remark,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
    };

    isValidParams = () => {
        const errMsg = [];
        const errResult = [];
        let isValid = true;
        const { filter } = this.state;

        if (!filter.mainCategoriesTypes) {
            isValid = false;
            errMsg.push(LangHelper.getResource('Category'));
        }
        if (!filter.subCategoriesTypes) {
            isValid = false;
            errMsg.push(LangHelper.getResource('SubCategory'));
        }
        if (errMsg.length > 0) {
            errResult.push(`${LangHelper.getResource('PleaseChoose')} ${errMsg.join(', ').toString()}`);
        }

        return { isValid, errResult };
    };

    handleSubmit = event => {
        event.preventDefault();
        if (this.isValidParams().isValid) {
            const params = this.getParams();
            this.props.setGridParams(params);
            this.props.getGridData(params);
        } else {
            this.isValidParams().errResult.forEach(item => {
                toast.error(item);
            });
        }
    };

    render() {
        return (
            <Form className="form-filter-v2">
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
                        <Button variant="primary"
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