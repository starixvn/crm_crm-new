import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import ExcelIcon from '@jsroot/components/ExcelIcon';

export class FilterEditInforms extends PureComponent {
    constructor(props) {
        super(props);
        this.initData = props.isNewInform ?
                        this.initNewFormData()
                        : this.initFormData(props.includeCurrencies, props.includeSites);
        this.state = {
            isSave: false,
            siteOptions: []
        };
    }

    componentDidMount() {
        this.props.isNewInform && this.props.setFilterData({ errors: { title: 'err' }});

        const sites = [];
        this.props.allSettings.sites[0].childSites.map((item, key) => {
            sites.push({
                id: key,
                name: item.name,
                checked: this.isCheckItem(item),
                subItem: item.childSites.map(element => {
                    return {
                        key: element.id,
                        value: element.name,
                        name: element.name,
                        checked: this.initData.sites.split(',').includes(element.id.toString())
                    };
                })
            });
        });

        const siteItem = JSON.parse(JSON.stringify(sites));
        const siteOptions = siteItem.reduce((accumulator, currentValue) => {
            if (currentValue.name === null || currentValue.name === '') {
                currentValue.subItem.map(data => accumulator.push({...data, id: data.key}));
            } else {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);

        this.setState({ siteOptions: siteOptions });
    }

    isCheckItem = data => {
        let result = true;
        if (data.childSites && data.childSites.length > 0) {
            data.childSites.map(item => {
                let checked = this.initData.sites.split(',').includes(item.id.toString());
                if (!checked) {
                    result = false;
                }
            })
        }
        return result;
    };

    renderFilterForm = ({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        isSubmitting
    }) => {
        const { detail, allSettings, informData } = this.props;
        const { siteOptions } = this.state;

        const allPositions = [
            { id: 2, name: 'Agent' },
            { id: 0, name: 'Guest' },
            { id: 3, name: 'Master' },
            { id: 1, name: 'Member' },
            { id: 4, name: 'Super' }
        ];

        const allIsVip = [
            { id: 2, name: 'All' }, { id: 1, name: 'Yes' }, { id: 0, name: 'No' }
        ];

        const filterCurrencies = allSettings.currencies.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.currencies.split(',').includes(item.id.toString())
            };
        });

        const filterLevels = allPositions.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.levels.split(',').includes(item.id.toString())
            };
        });

        return(
            <Form noValidate onSubmit={handleSubmit} className="form-filter-v2 form-filter-edit-inform">
                <FormikErrorMessage  isSubmitting={isSubmitting} touched={touched} errors={errors} fieldNames={Object.keys(values)} />

                <Form.Row className='input-edit'>
                    <Form.Control type="text" size="sm" className="shadow-none input-excel"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            isInvalid={touched.title && errors.title}
                            defaultValue={detail.title}
                            onChange={event => {
                                setFieldValue('title', event.target.value);
                            }}
                        />
                    {
                        (informData && informData.length > 0) && (
                            <ExcelIcon
                                handleExportExcel={() => this.handleExportExcel(values)}
                            />
                        )
                    }
                </Form.Row>

                <Form.Row>
                    <Form.Group>
                        <Form.Label>
                            {LangHelper.getResource('Currency')}
                        </Form.Label>

                        <MultipleSelect
                            isInvalid={touched.currencies && errors.currencies}
                            dataSource={filterCurrencies}
                            keyField='id' valueField='name'
                            maxDisplayItemCount={3}
                            hasAllOption={filterCurrencies.length > 0}
                            isAllTextShown={filterCurrencies.length > 0}
                            hasSearchBox
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('currencies', selectedItemsKey);
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            {LangHelper.getResource('Position')}
                        </Form.Label>

                        <MultipleSelect
                            isInvalid={touched.levels && errors.levels}
                            dataSource={filterLevels}
                            keyField='id' valueField='name'
                            hasAllOption={filterLevels.length > 0}
                            isAllTextShown={filterLevels.length > 0}
                            hasSearchBox
                            maxDisplayItemCount={2}
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('levels', selectedItemsKey);
                            }}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>
                            {LangHelper.getResource('Site')}
                        </Form.Label>

                        <MultipleSelect
                            isInvalid={touched.sites && errors.sites}
                            dataSource={siteOptions}
                            keyField='id' valueField='name'
                            hasAllOption={siteOptions.length > 0}
                            isAllTextShown={siteOptions.length > 0}
                            maxDisplayItemCount={1}
                            hasSearchBox
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('sites', selectedItemsKey);
                            }}
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>
                            {LangHelper.getResource('VIP')}
                        </Form.Label>

                        <Form.Control as="select" size="sm" className="shadow-none"
                            name="isVip"
                            defaultValue={detail.isVip}
                            key={detail.isVip}
                            onChange={handleChange}
                        >
                            {
                                allIsVip.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                    </Form.Group>

                    <Form.Group style={{width: '100px'}}>
                        <Button variant="primary" size="sm"
                            type="submit"
                            onClick={() => {setFieldValue('submit',false)}}
                        >
                            {LangHelper.getResource('Search')}
                        </Button>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group className='direct-account'>
                        <Form.Label className="col-form-label">
                            {LangHelper.getResource('DirectAccount')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isHeadline}
                            onChange={event => setFieldValue('isHeadline', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('Headline')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.isNoGroup}
                            onChange={event => setFieldValue('isNoGroup', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('WithoutAnyGroup')}
                        </Form.Label>

                        <Form.Check type="checkbox" className="check-btn"
                            checked={values.excludeIgnoredAccounts}
                            onChange={event => setFieldValue('excludeIgnoredAccounts', event.target.checked)}
                        />

                        <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                            {LangHelper.getResource('ExcludeIgnoredAccounts')}
                        </Form.Label>
                    </Form.Group>
                </Form.Row>

                {/* <Form.Group as={Row}>
                    <Col sm="12" md="12" className="group-input-excel">
                        <Form.Control type="text" size="sm" className="shadow-none input-excel"
                            autoComplete="off"
                            name="title"
                            placeholder="Title"
                            isInvalid={touched.title && errors.title}
                            defaultValue={detail.title}
                            onChange={event => {
                                setFieldValue('title', event.target.value);
                            }}
                        />
                    {
                        (informData && informData.length > 0) && (
                            <ExcelIcon
                                handleExportExcel={() => this.handleExportExcel(values)}
                            />
                        )
                    }
                    </Col>
                </Form.Group> */}

                {/* <Form.Group as={Row}>
                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('Currency')}
                    </Form.Label>

                    <Col sm="2" md="2">
                        <MultipleSelect
                            isInvalid={touched.currencies && errors.currencies}
                            dataSource={filterCurrencies}
                            keyField='id' valueField='name'
                            maxDisplayItemCount={3}
                            hasAllOption={filterCurrencies.length > 0}
                            isAllTextShown={filterCurrencies.length > 0}
                            hasSearchBox
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('currencies', selectedItemsKey);
                            }}
                        />
                    </Col>

                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('Position')}
                    </Form.Label>

                    <Col sm="2" md="2">
                        <MultipleSelect
                            isInvalid={touched.levels && errors.levels}
                            dataSource={filterLevels}
                            keyField='id' valueField='name'
                            hasAllOption={filterLevels.length > 0}
                            isAllTextShown={filterLevels.length > 0}
                            hasSearchBox
                            maxDisplayItemCount={2}
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('levels', selectedItemsKey);
                            }}
                        />
                    </Col>

                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('Site')}
                    </Form.Label>

                    <Col sm="2" md="2">
                        <MultipleSelect
                            isInvalid={touched.sites && errors.sites}
                            dataSource={siteOptions}
                            keyField='id' valueField='name'
                            hasAllOption={siteOptions.length > 0}
                            isAllTextShown={siteOptions.length > 0}
                            maxDisplayItemCount={1}
                            hasSearchBox
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('sites', selectedItemsKey);
                            }}
                        />
                    </Col>

                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('VIP')}
                    </Form.Label>

                    <Col sm="1" md="1">
                        <Form.Control as="select" size="sm" className="shadow-none"
                            name="isVip"
                            defaultValue={detail.isVip}
                            key={detail.isVip}
                            onChange={handleChange}
                        >
                            {
                                allIsVip.map((value, key) => this.renderOptions(value.name, value.id, key))
                            }
                        </Form.Control>
                    </Col>

                    <Col sm="1" md="1" >
                        <Button variant="primary" size="sm" style={{width: '65px'}}
                            type="submit"
                            onClick={() => {setFieldValue('submit',false)}}
                        >
                            {LangHelper.getResource('Search')}
                        </Button>
                    </Col>

                </Form.Group> */}

                {/* <Form.Group as={Row} style={{alignItems:'center'}}>
                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('DirectAccount')}
                    </Form.Label>

                    <Form.Check type="checkbox" className="check-btn"
                        checked={values.isHeadline}
                        onChange={event => setFieldValue('isHeadline', event.target.checked)}
                    />

                    <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                        {LangHelper.getResource('Headline')}
                    </Form.Label>

                    <Form.Check type="checkbox" className="check-btn"
                        checked={values.isNoGroup}
                        onChange={event => setFieldValue('isNoGroup', event.target.checked)}
                    />

                    <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                        {LangHelper.getResource('WithoutAnyGroup')}
                    </Form.Label>

                    <Form.Check type="checkbox" className="check-btn"
                        checked={values.excludeIgnoredAccounts}
                        onChange={event => setFieldValue('excludeIgnoredAccounts', event.target.checked)}
                    />

                    <Form.Label className="col-form-label" style={{paddingLeft:'2px'}}>
                        {LangHelper.getResource('ExcludeIgnoredAccounts')}
                    </Form.Label>
                </Form.Group> */}
            </Form>
        );
    };

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    initFormData = (includeCurrencies,includeSites) => {
        const { title, positions, isVip, excludeIgnoredAccounts, typeAccount } = this.props.detail;
        return {
            title: title, currencies: includeCurrencies,
            levels: positions, sites: includeSites,
            isVip: isVip, typeAccount: typeAccount,
            isHeadline: typeAccount === 1 || typeAccount === 3,
            isNoGroup: typeAccount === 2 || typeAccount === 3,
            excludeIgnoredAccounts: excludeIgnoredAccounts
        };
    };

    initNewFormData = () => {
        return {
            title: '', currencies: '',
            levels: '', sites: '',
            isVip: 2, typeAccount: 3,
            isHeadline: true, isNoGroup: true,
            excludeIgnoredAccounts: true
        };
    };

    validateFormik = values => {
        const errors = this.getErrorValidate(values);

        this.getTypeAccount(values);
        this.setState({ isSave: false });
        if (this.props.isNewInform) {
            this.props.setFilterData({...this.props.filterData, values: {...values}, errors: values.title === '' ? {title: 'err'} : errors});
        } else {
            this.props.setFilterData({
                ...this.props.filterData,
                values: {...values, titleId: this.props.detail.titleId, changeFilter: this.getChangeFilter(values)},
                errors: values.title === '' ? {title: 'err'} : errors
            });
        }

        return errors;
    };

    getErrorValidate = values => {
        const errors = {};

        if (this.state.isSave && values.title === '') {
            errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
        }
        if (values.currencies === '') {
            errors.currencies = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency'));
        }
        if (values.levels === '') {
            errors.levels = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Position'));
        }
        if (values.sites === '') {
            errors.sites = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'));
        }
        if (!values.isHeadline && !values.isNoGroup) {
            errors.isHeadline = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('DirectAccount'));
        }

        return errors;
    };

    getTypeAccount = values => {
        let accountType = 0;
        if (values.isHeadline) {
            accountType = accountType + 1;
        }
        if (values.isNoGroup) {
            accountType = accountType + 2;
        }
        values.typeAccount = accountType;
    };

    getChangeFilter = values => {
        const initData = this.initData;
        return (values.currencies !== initData.currencies ||
            values.levels !== initData.levels ||
            values.sites !== initData.sites || this.changeFilter(values)
        );
    };

    changeFilter = values => {
        const data = this.initData;
        return (
            parseInt(values.isVip, 10) !== data.isVip ||
            values.typeAccount !== data.typeAccount ||
            values.excludeIgnoredAccounts !== data.excludeIgnoredAccounts
        );
    };

    filterParams = values => {
        const params = {
            typeAccount: values.typeAccount,
            currencies: values.currencies,
            levels: values.levels,
            sites: values.sites,
            isVip: parseInt(values.isVip, 10),
            excludeIgnoredAccounts: values.excludeIgnoredAccounts
        };
        return params;
    };

    handleExportExcel = values => {
        const filterParams = this.filterParams(values);
        this.props.exportExcel({...filterParams, titleId: this.props.detail.titleId, title: values.title});
    };

    handleSearchEdit = (values, { setSubmitting }) => {
        setSubmitting(true);
        this.getTypeAccount(values);
        const params = {
            ...this.filterParams(values),
            titleId: this.props.detail.titleId
        };
        this.props.setGridParams({pageIndex: 1, pageSize: this.props.gridParams.pageSize});
        this.props.setFilterData({...this.props.filterData, values: {...params, title: values.title, changeFilter: this.getChangeFilter(values)}});
        this.props.setEditedInforms([]);
        this.props.getEditInforms(params);
    };

    handleSearchNew = (values, { setSubmitting }) => {
        setSubmitting(true);
        this.getTypeAccount(values);
        const params = {...this.filterParams(values)};
        this.props.setGridParams({pageIndex: 1, pageSize: this.props.gridParams.pageSize});
        this.props.setFilterData({...this.props.filterData, values: {...params, title: values.title}});
        this.props.setEditedInforms([]);
        this.props.getNewInforms(params);
    };

    handleValidate = () => {
        this.setState({ isSave: true }, this.formik.handleSubmit);
    };

    render() {
        const { isNewInform } = this.props;
        return (
            <div>
                <Formik
                    innerRef={el => this.formik = el}
                    initialValues={this.initData}
                    validate={this.validateFormik}
                    onSubmit={
                        isNewInform ?
                        this.handleSearchNew : this.handleSearchEdit
                    }
                >
                    { this.renderFilterForm }
                </Formik>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {  allSettings, filterData, gridParams } = state;
    return {  allSettings, filterData, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(FilterEditInforms);