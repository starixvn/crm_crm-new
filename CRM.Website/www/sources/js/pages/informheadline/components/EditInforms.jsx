import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Form, Modal, Button } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DataGridEdit from './DataGridEdit';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import FilterEditInforms from './FilterEditInforms';

export class EditInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initData: null
        };
    }

    async componentDidMount() {
        await this.props.getTitleDetail({
            titleId: this.props.titleId
        });
        await this.props.getAllSettings();

        const { titleDetail, allSettings } = this.props;
        const includeCurrencies = this.getIncludeInSetting(titleDetail.currencies, allSettings.currencies);
        const includeSites = this.getIncludeInSetting(titleDetail.sites, allSettings.sites[0].childSites);
        const params = {
            titleId: this.props.titleId,
            typeAccount: titleDetail.typeAccount,
            currencies: includeCurrencies,
            levels: titleDetail.positions,
            sites: includeSites,
            isVip: titleDetail.isVip,
            excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
        };
        this.props.setGridParams({...params, pageIndex: 1, pageSize: 100});
        this.props.setResultEditInforms(null);
        this.props.setGridData([]);
        await this.props.getEditInforms(params);
        this.setState({
            initData: this.initFormData(includeCurrencies,includeSites)
        });
    }

    getIncludeInSetting = (detail, setting) => {
        const includes = [];
        setting.map(item => {
            if (detail.split(',').includes(item.id.toString())) {
                includes.push(item.id);
            }
        });
        return includes.join(',');
    };

    renderFilterForm = ({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue
    }) => {
        return(
            <Form noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                {
                    this.props.resultEditInforms &&
                    <ResponseMessage isSuccessful={this.props.resultEditInforms.isSuccessful}
                        message={this.props.resultEditInforms.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                    />
                }
                <FilterEditInforms
                    values={values}
                    touched={touched} errors={errors}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                />
            </Form>
        );
    };

    initFormData = (includeCurrencies,includeSites) => {
        const { title, positions, isVip, excludeIgnoredAccounts, typeAccount } = this.props.titleDetail;
        return {
            title: title,
            currencyId: includeCurrencies,
            levelId: positions,
            siteId: includeSites,
            vipId: isVip,
            typeAccount: typeAccount,
            isHeadline: (typeAccount === 1 || typeAccount === 3) ? true : false,
            isNoGroup: (typeAccount === 2 || typeAccount === 3) ? true : false,
            isExcludeIgnoredAccounts: excludeIgnoredAccounts,
            submit: true
        };
    };

    validateFormik = values => {
        const errors = {};

        if (values.title === '' && values.submit) {
            errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
        }
        if (values.currencyId === '') {
            errors.currencyId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency'));
        }
        if (values.levelId === '') {
            errors.levelId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Position'));
        }
        if (values.siteId === '') {
            errors.siteId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'));
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
        const initData = this.state.initData;
        if (values.currencyId !== initData.currencyId ||
            values.levelId !== initData.levelId ||
            values.siteId !== initData.siteId ||
            parseInt(values.vipId, 10) !== initData.vipId ||
            values.typeAccount !== initData.typeAccount ||
            values.isExcludeIgnoredAccounts !== initData.isExcludeIgnoredAccounts
        ) {
            return true;
        }
        return false;
    };

    getDataEdit = () => {
        this.formik.handleSubmit();
        const values = this.formik.values;
        this.getTypeAccount(values);
        const params = {
            ...this.props.gridParams,
            title: values.title,
            typeAccount: values.typeAccount,
            currencies: values.currencyId,
            levels: values.levelId,
            sites: values.siteId,
            isVip: parseInt(values.vipId, 10),
            excludeIgnoredAccounts: values.isExcludeIgnoredAccounts,
            changeFilter: this.getChangeFilter(values),
            errors: this.formik.errors
        };

        return params;
    };

    handleSearch = values => {
        this.getTypeAccount(values);
        const params = {
            titleId: this.props.titleId,
            typeAccount: values.typeAccount,
            currencies: values.currencyId,
            levels: values.levelId,
            sites: values.siteId,
            isVip: parseInt(values.vipId, 10),
            excludeIgnoredAccounts: values.isExcludeIgnoredAccounts
        };
        this.props.setGridParams({...params, pageIndex: 1, pageSize: 100});
        this.props.getEditInforms(params);
        values.submit = true;
    };

    render() {
        const { titleDetail, allSettings, editDataInforms, gridData, setResultEditInforms } = this.props;
        if (!titleDetail || !allSettings || !editDataInforms || !this.state.initData) {
            return null;
        }
        const filterData = editDataInforms.map(element => gridData.find(item => item.headlineId === element.headlineId) || element);

        return (
            <>
                <Modal show className="edit-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl"
                    className="modal-edit"
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{`${LangHelper.getResource('UpdateInformHeadlines')} - ${LangHelper.getResource('EditNumberOfAccounts')}`}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Formik
                            innerRef={el => this.formik = el}
                            initialValues={this.state.initData}
                            validate={this.validateFormik}
                            onSubmit={(values) => {
                                !values.submit && this.handleSearch(values)
                            }}
                        >
                            { this.renderFilterForm }
                        </Formik>

                        <DataGridEdit
                            informData={editDataInforms}
                            informSettings={allSettings}
                            totalItem={editDataInforms.length}
                            setResultEdit={setResultEditInforms}
                            filterData={filterData}
                            dataEdit={null}
                            edit={this.props.editInforms}
                            getDataEdit={this.getDataEdit}
                        />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms, gridData } = state;
    return { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInforms);
