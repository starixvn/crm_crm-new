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
import FilterSearchInforms from './FilterSearchInforms';

export class EditSearchInforms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            informs: [],
            saveResult: null
        };

        this.filterData = this.initFormData();
    };

    renderFilterForm = ({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue
    }) => {

        const { titleDetail, searchInforms, allSettings, gridParams } = this.props;
        const allPositions = [
            { "id": 4, "name": "Super" },
            { "id": 3, "name": "Master" },
            { "id": 2, "name": "Agent" },
            { "id": 1, "name": "Member" },
            { "id": 0, "name": "Guest" }
        ];

        const allIsVip = [
            { "id": 2, "name": "All" },
            { "id": 1, "name": "Yes" },
            { "id": 0, "name": "No" }
        ];

        const filterCurrencies = allSettings.currencies.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.currencyId.split(",").includes(item.id.toString())
            };
        });

        const filterLevels = allPositions.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.levelId.split(",").includes(item.id.toString())
            };
        });

        const filterSites = allSettings.sites[0].childSites.map(item => {
            return {
                id: item.id,
                name: item.name,
                checked: values.siteId.split(",").includes(item.id.toString())
            };
        });
        
        return(
            <>
                <Form noValidate onSubmit={handleSubmit}>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.state.saveResult &&
                        <ResponseMessage isSuccessful={this.state.saveResult.isSuccessful}
                            message={this.state.saveResult.message || LangHelper.getResource('SaveInformHeadlinesSuccessfully')}
                        />
                    }
                    <FilterSearchInforms
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
                        Informs={searchInforms}
                        InformSettings={allSettings}
                        gridParams={gridParams}
                        onPaging={this.onPaging}
                        onChange={this.handleChangeDataGrid}

                        values={values}
                        handleSubmit={handleSubmit}
                        setFieldValue={setFieldValue}
                    />
                </Form>
            </>
        );
    };

    initFormData = () => {
        const { title, positions, isVip, excludeIgnoredAccounts, typeAccount } = this.props.titleDetail;
        const { includeCurrencies, includeSites } = this.props;
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

        if(values.title === '' && values.submit){
            errors.title = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title'));
        }
        if(values.currencyId === ''){
            errors.currencyId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency'));
        }    
        if(values.levelId === ''){
            errors.levelId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Position'));
        }
        if(values.siteId === ''){
            errors.siteId = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'));
        }
        if(!values.isHeadline && !values.isNoGroup){
            errors.isHeadline = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('DirectAccount'));
        }

        return errors;
    };

    getTypeAccount = (values) => {
        var accountType = 0;
        if(values.isHeadline){
            accountType = accountType + 1;
        }
        if(values.isNoGroup){
            accountType = accountType + 2;
        }
        values.typeAccount = accountType;
    };

    getChangeFilter = (values) => {
        const initData = this.filterData;
        if(values.currencyId !== initData.currencyId 
            || values.levelId !== initData.levelId
            || values.siteId !== initData.siteId
            || parseInt(values.vipId) !== initData.vipId
            || values.typeAccount !== initData.typeAccount
            || values.isExcludeIgnoredAccounts !== initData.isExcludeIgnoredAccounts
        ){
            return true;
        };
        return false;
    };

    setAlert = () => {
        this.setState({
            saveResult: this.props.resultUpdateSearchInforms
        });
        setTimeout(() => {
            this.setState({
                saveResult: null
            });
        }, 3000);
    };

    handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        if(!values.submit){
            this.props.setGridParams({
                pageIndex: 1,
                pageSize: 100
            });
            
            this.getTypeAccount(values);

            const params = {
                titleId: this.props.titleId,
                typeAccount: values.typeAccount,
                currencies: values.currencyId,
                levels: values.levelId,
                sites: values.siteId,
                isVip: parseInt(values.vipId),
                excludeIgnoredAccounts: values.isExcludeIgnoredAccounts
            };

            this.props.getSearchInforms(params);
        };

        if(values.submit){
            this.getTypeAccount(values);
            const result = this.props.searchInforms.map(element => this.state.informs.find(item => item.headlineId === element.headlineId) || element);

            const params = {
                titleId: this.props.titleId,
                title: values.title,
                changeFilter: this.getChangeFilter(values),
                currencies: values.currencyId,
                levels: values.levelId,
                sites: values.siteId,
                isVip: values.vipId,
                typeAccount: values.typeAccount,
                excludeIgnoredAccounts: values.isExcludeIgnoredAccounts,               
                informs: result
            }
            await this.props.updateSearchInforms(params);            
            this.setAlert();
        }
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;
        this.props.setGridParams(params);

    };

    htmlDecode = value => {
        var remark = value.replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
        return remark;
    };

    handleChangeDataGrid = (event, headlineId) => {
        const name = event.target.name;
        var value = event.target.type === 'select-one' ? parseInt(event.target.value) : event.target.value;
        if(name === 'remark'){
            value = this.htmlDecode(value);
        };
        const item = {...this.props.searchInforms.find(element => element.headlineId === headlineId), [name]: value};

        this.setState(prevState =>{
            let oldInforms = prevState.informs;
            let element  = oldInforms.find(value => value.headlineId === item.headlineId);

            if(element){
                Object.assign(element, {[name]: value});
                return({informs: oldInforms});
            }
            else{
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
            isVip: parseInt(values.vipId),
            excludeIgnoredAccounts: values.isExcludeIgnoredAccounts
        };
        this.props.exportSearchInforms(params);
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
        const {titleDetail, allSettings, searchInforms} = this.props;
        if(!titleDetail || !allSettings || !searchInforms){
            return null;
        };

        return (    
            <>
                <Modal show className="edit-feedback-modal-dialog" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={this.props.onClose}         
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('UpdateInformHeadlines') + " - " + LangHelper.getResource('EditNumberOfAccounts')}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Formik
                            //innerRef={el => this.formik = el}
                            initialValues={this.filterData}
                            validate={this.validateFormik}
                            onSubmit={this.handleSubmit}
                        >
                            { this.renderFilterForm }
                        </Formik>
                    </Modal.Body>
                </Modal>
            </>
        );
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, allSettings, searchInforms, gridParams, resultUpdateSearchInforms } = state;
    return { titleDetail, allSettings, searchInforms, gridParams, resultUpdateSearchInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSearchInforms);
