import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DataGridEdit from './DataGridEdit';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import FilterSearchInforms from './FilterSearchInforms';

export class NewInforms extends Component {
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

        const { allSettings , newInforms } = this.props;
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
                        titleDetail={values.title}
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

                </Form>
            </>
        );
    };

    initFormData = () => {
        return {
            title: '',
            currencyId: '',
            levelId: '',
            siteId: '',
            vipId: 2,
            typeAccount: 3,
            isHeadline: true,
            isNoGroup: true,
            isExcludeIgnoredAccounts: true,
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

    handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        if(!values.submit){
            // this.props.setGridParams({
            //     pageIndex: 1,
            //     pageSize: 100
            // });
            
            this.getTypeAccount(values);

            const params = {
                title: values.title,
                typeAccount: values.typeAccount,
                currencies: values.currencyId,
                levels: values.levelId,
                sites: values.siteId,
                isVip: parseInt(values.vipId),
                excludeIgnoredAccounts: values.isExcludeIgnoredAccounts
            };

            this.props.getSearchInforms(params);
        };
    };

    handleExportExcel = values => {
        this.getTypeAccount(values);
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
        const {allSettings, newInforms} = this.props;
        if(!allSettings || !newInforms){
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
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, newInforms } = state;
    return { allSettings, newInforms };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewInforms)
