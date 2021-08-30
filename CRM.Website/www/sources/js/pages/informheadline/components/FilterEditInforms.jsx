import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import RenderExportExcel from '@jsroot/components/RenderExportExcel';

export class FilterEditInforms extends PureComponent {

    constructor(props) {
        super(props);
        this.initData = this.initFormData(props.gridParams.currencies, props.gridParams.sites);
    }

    renderFilterForm = ({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue
    }) => {
        const { titleDetail, allSettings, gridParams, exportEditInforms } = this.props;

        const allPositions = [
            { id: 4, name: 'Super' }, { id: 3, name: 'Master' },
            { id: 2, name: 'Agent' },{ id: 1, name: 'Member' },
            { id: 0, name: 'Guest' }
        ];

        const allIsVip = [
            { id: 2, name: 'All' }, { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
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

        const filterSites = allSettings.sites[0].childSites.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.sites.split(',').includes(item.id.toString())
            };
        });

        return(
            <Form noValidate onSubmit={handleSubmit} className="form-filter">
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />

                <Form.Group as={Row}>
                    <Col sm="12" md="12" className="group-input-excel">
                        <Form.Control type="text" size="sm" className="shadow-none input-excel"
                            autoComplete="off"
                            name="username"
                            defaultValue={titleDetail.title}
                            onChange={event => {
                                setFieldValue('title', event.target.value);
                            }}
                        />
                    <RenderExportExcel
                        gridParams={gridParams}
                        exportExcel={exportEditInforms}
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label className="col-form-label" style={{paddingLeft:'15px'}}>
                        {LangHelper.getResource('Currency')}
                    </Form.Label>

                    <Col sm="2" md="2">
                        <MultipleSelect
                            isInvalid={touched.currencies && errors.currencies}
                            dataSource={filterCurrencies}
                            keyField='id' valueField='name'
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
                            dataSource={filterSites}
                            keyField='id' valueField='name'
                            hasAllOption={filterSites.length > 0}
                            isAllTextShown={filterSites.length > 0}
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
                            defaultValue={titleDetail.isVip}
                            key={titleDetail.isVip}
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
                            onClick={() => setFieldValue('submit',false)}
                        >
                            {LangHelper.getResource('Search')}
                        </Button>
                    </Col>

                </Form.Group>

                <Form.Group as={Row} style={{alignItems:'center'}}>
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
                </Form.Group>
            </Form>
        );
    };

    renderOptions = (name, id, key) => <option key={key} value={id}>{name}</option>;

    initFormData = (includeCurrencies,includeSites) => {
        const { title, positions, isVip, excludeIgnoredAccounts, typeAccount } = this.props.titleDetail;
        return {
            title: title,
            currencies: includeCurrencies,
            levels: positions,
            sites: includeSites,
            isVip: isVip,
            typeAccount: typeAccount,
            isHeadline: (typeAccount === 1 || typeAccount === 3) ? true : false,
            isNoGroup: (typeAccount === 2 || typeAccount === 3) ? true : false,
            excludeIgnoredAccounts: excludeIgnoredAccounts
        };
    };

    validateFormik = values => {
        const errors = {};

        if ( values.title === '' ) {
            errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
        }
        if ( values.currencies === '' ) {
            errors.currencies = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency'));
        }
        if ( values.levels === '' ) {
            errors.levels = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Position'));
        }
        if ( values.sites === '' ) {
            errors.sites = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'));
        }
        if ( !values.isHeadline && !values.isNoGroup ) {
            errors.isHeadline = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('DirectAccount'));
        }
        
        this.props.setFilterData({...this.props.filterData, values: {...values, title: values.title, changeFilter: this.getChangeFilter(values)}, errors: errors});
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
        if (values.currencies !== initData.currencies ||
            values.levels !== initData.levels ||
            values.sites !== initData.sites ||
            parseInt(values.isVip, 10) !== initData.isVip ||
            values.typeAccount !== initData.typeAccount ||
            values.excludeIgnoredAccounts !== initData.excludeIgnoredAccounts
        ) {
            return true;
        }
        return false;
    };

    handleSearch = (values, { setSubmitting }) => {
        setSubmitting(true);
        this.getTypeAccount(values);
        const params = {
            titleId: this.props.titleDetail.titleId,
            typeAccount: values.typeAccount,
            currencies: values.currencies,
            levels: values.levels,
            sites: values.sites,
            isVip: parseInt(values.isVip, 10),
            excludeIgnoredAccounts: values.excludeIgnoredAccounts
        };
        this.props.setGridParams({...params, pageIndex: 1, pageSize: 100});
        this.props.setFilterData({...this.props.filterData, values: {...params, title: values.title, changeFilter: this.getChangeFilter(values)}});
        this.props.setGridData([]);
        this.props.getEditInforms(params);
    };

    render() {
        return (
            <Formik
                initialValues={this.initData}
                validate={this.validateFormik}
                onSubmit={this.handleSearch}
            >
                { this.renderFilterForm }
            </Formik>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, editDataInforms, gridParams, filterData } = state;
    return { titleDetail, allSettings, editDataInforms, gridParams, filterData };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterEditInforms);