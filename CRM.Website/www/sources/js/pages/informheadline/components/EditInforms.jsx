import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DataGridEdit from './DataGridEdit';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterEditInforms from './FilterEditInforms';

export class EditInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            includeCurrencies: '',
            includeSites: '',
            filterData: null,
            informs: [],
            saveResult: null,
            totalEditInform: 0
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
        await this.props.getEditInforms({
            titleId: this.props.titleId,
            typeAccount: titleDetail.typeAccount,
            currencies: includeCurrencies,
            levels: titleDetail.positions,
            sites: includeSites,
            isVip: titleDetail.isVip,
            excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
        });

        this.props.setGridParams({pageIndex: 1, pageSize: 100});
        this.setState({
            totalEditInform: this.props.editDataInforms.length,
            includeCurrencies: includeCurrencies,
            includeSites: includeSites,
            filterData: this.initFormData(includeCurrencies,includeSites)
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

        const { titleDetail, editDataInforms, allSettings, gridParams } = this.props;
        const allPositions = [
            { id: 4, name: 'Super' },
            { id: 3, name: 'Master' },
            { id: 2, name: 'Agent' },
            { id: 1, name: 'Member' },
            { id: 0, name: 'Guest' }
        ];

        const allIsVip = [
            { id: 2, name: 'All' },
            { id: 1, name: 'Yes' },
            { id: 0, name: 'No' }
        ];

        const filterCurrencies = allSettings.currencies.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.currencyId.split(',').includes(item.id.toString())
            };
        });

        const filterLevels = allPositions.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.levelId.split(',').includes(item.id.toString())
            };
        });

        const filterSites = allSettings.sites[0].childSites.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.siteId.split(',').includes(item.id.toString())
            };
        });

        const { pageIndex, pageSize } = gridParams;
        const skip = pageSize * (pageIndex - 1);
        const result = editDataInforms.map(element => this.state.informs.find(item => item.headlineId === element.headlineId) || element);
        const data = result.slice(skip, pageSize * pageIndex);

        return(
            <Form noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                {
                    this.state.saveResult &&
                    <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                        message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                    />
                }
                <FilterEditInforms
                    titleDetail={titleDetail}
                    filterCurrencies={filterCurrencies}
                    filterLevels={filterLevels}
                    filterSites={filterSites}
                    allIsVip={allIsVip}
                    renderExportExcelText={() => this.renderExportExcelText(values)}

                    values={values}
                    touched={touched} errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setFieldValue={setFieldValue}
                />

                <DataGridEdit
                    Informs={data}
                    InformSettings={allSettings}
                    totalItem={this.state.totalEditInform}
                    gridParams={gridParams}
                    onPaging={this.onPaging}
                    onChange={this.handleChangeDataGrid}

                    handleSubmit={handleSubmit}
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
        const initData = this.state.filterData;
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

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultEditInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
        }, 3000);
    };

    handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        if (!values.submit) {
            this.props.setGridParams({pageIndex: 1, pageSize: 100});
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
            await this.props.getEditInforms(params);
            this.setState({
                totalEditInform: this.props.editDataInforms.length
            });
            values.submit = true;
            return;

        }else{
            this.getTypeAccount(values);
            const result = this.props.editDataInforms.map(element => this.state.informs.find(item => item.headlineId === element.headlineId) || element);

            const resultInforms = result.map(item => {
                if (item.remark) {
                    return {...item, remark: this.htmlDecode(item.remark)};
                }
                return item;
            });
            const params = {
                titleId: this.props.titleId,
                title: values.title,
                changeFilter: this.getChangeFilter(values),
                currencies: values.currencyId,
                levels: values.levelId,
                sites: values.siteId,
                isVip: parseInt(values.vipId, 10),
                typeAccount: values.typeAccount,
                excludeIgnoredAccounts: values.isExcludeIgnoredAccounts,
                informs: resultInforms
            };
            await this.props.editInforms(params);
            this.setAlert();
        }
    };

    onPaging = (pageIndex, pageSize) => {
        this.props.setGridParams({pageIndex: pageIndex, pageSize: pageSize});
    };

    htmlDecode = value => {
        const remark = value.replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
        return remark;
    };

    handleChangeDataGrid = (event, headlineId) => {
        const name = event.target.name;
        const value = event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value;

        const item = {...this.props.editDataInforms.find(element => element.headlineId === headlineId), [name]: value};

        this.setState(prevState =>{
            const oldInforms = prevState.informs;
            const element  = oldInforms.find(value => value.headlineId === item.headlineId);

            if (element) {
                element[name] = value;
                return({informs: oldInforms});
            }else{
                return({informs: [...oldInforms, item]});
            }
        });
    };

    handleExportExcel = values => {
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
        this.props.exportEditInforms(params);
    };

    renderExportExcelText = values => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={() => this.handleExportExcel(values)}/>
            </OverlayTrigger>
        );
    };

    render() {
        const {titleDetail, allSettings, editDataInforms} = this.props;
        if (!titleDetail || !allSettings || !editDataInforms || !this.state.filterData) {
            return null;
        }

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
                            initialValues={this.state.filterData}
                            validate={this.validateFormik}
                            onSubmit={this.handleSubmit}
                        >
                            { this.renderFilterForm }
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms } = state;
    return { titleDetail, allSettings, editDataInforms, gridParams, resultEditInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditInforms);
