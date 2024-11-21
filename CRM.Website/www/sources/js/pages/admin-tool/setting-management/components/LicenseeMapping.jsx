import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import LicenseeRow from './LicenseeRow';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

export class LicenseeMapping extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            setting: '',
            settingId: '',
            isEdit: false,
            isSubmitting: false,
            editLicenseeMappingResult: null,
            cancelLicenseeMappingResult: null,
            errors: {
            },
            touched:{
            }
        };
    }

    componentDidMount(){
        if(this.props.licensees === null){
            this.props.getLicensees();
        }
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Setting')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('SourceMapping')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('LicenseeManager')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('SettingId')}</HeaderCell>
                {
                    this.props.isHost && <HeaderCell colWidth={15}>{LangHelper.getResource('Edit')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = () => {
        const {licenseesMapping}= this.props;
        if (licenseesMapping.length > 0) {
            return licenseesMapping.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={5}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        const {licensees, licenseesManager, isHost}= this.props;
        const licenseesOption = licensees.map(item =>{
            return {
                value: item,
                label: item
            };
        });
        const sourceMappingDefault = licenseesOption.filter(x=> x.value === item.settingSource);
        const isChangeableValue =  this.state.isEdit && this.state.settingId === item.settingId;

        return (
            <LicenseeRow
                isHost={isHost}
                item={item} index={index}
                sourceMappingDefault={sourceMappingDefault}
                licenseesOption={licenseesOption}
                licenseesManagerOption={licenseesManager}
                handleEdit={this.handleEdit}
                isChangeableValue={isChangeableValue}
                isEdit={this.state.isEdit}
                handleSave={this.handleSave}
                handleCancel={this.handleCancel}
                debounceHandleLicenseeManagerChange = {this.debounceHandleLicenseeManagerChange}
                handleDelete={this.handleDelete}
            />
        );
    };

    handleEdit = settingId =>{
        this.setState(prevState => ({settingId, isEdit: !prevState.isEdit}));
    };

    handleSave = (settingId, settingSource, licenseeManager) =>{
        const params = {
            settingId, sourceMapping: settingSource, licenseeManager
        };
        if(settingSource === '' || licenseeManager === null || licenseeManager===''){
            this.handelValidateUpdate(params);
        }else{
            this.setState({errors:{}, touched:{}});
            this.props.editLicenseeMapping(params).then(data =>{
                this.setState({editLicenseeMappingResult: data});
                if(data.isSuccessful){
                    this.handleSuccess();
                    setTimeout(() => {
                        this.setState({editLicenseeMappingResult: null});
                    }, 3000);
                }
            });
        }
    };

    handelValidateUpdate = params =>{
        const errors = {};
        const touched = {};
        if(params.sourceMapping === ''){
            touched.sourceMapping = true;
            errors.sourceMapping = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SettingSource'));
        }
        if(params.licenseeManager === null || params.licenseeManager===''){
            touched.licenseeManager = true;
            errors.licenseeManager = LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('LicenseeManager'));
        }
        this.setState({errors, touched});
    };

    handleDelete = (setting, settingId) =>{
        this.props.setConfirmCancelPopup({show: true, setting, settingId});
    };

    handleCancel = () =>{
        this.setState(prevState => ({settingId: '', isEdit: !prevState.isEdit, errors:{}, touched:{}}));
    };

    handleCancelSetting = settingId =>{
        const params = {
            settingId, sourceMapping: '', licenseeManager: ''
        };
        this.props.editLicenseeMapping(params).then(data =>{
            this.setState({cancelLicenseeMappingResult: data});
            this.props.oncloseConfirm();
            if(data.isSuccessful){
                this.handleSuccess();
                setTimeout(() => {
                    this.setState({cancelLicenseeMappingResult: null});
                }, 3000);
            }
        });
    };

    handleSuccess = () =>{
        this.setState({settingId: '', isEdit: false});
        this.handleSearch();
    };

    debounceHandleLicenseeManagerChange = Site.debounce(searchText => {
        if (searchText.length >= 2) {
            this.props.getLicenseeManager({username: searchText});
        } else {
            this.props.setLicenseeManager([]);
        }
    });


    renderForm = () =>{
        const { editLicenseeMappingResult, cancelLicenseeMappingResult } = this.state;
        return (
            <Form>
                <Modal.Body>
                    <FormikErrorMessage errors={this.state.errors} touched={this.state.touched} fieldNames={Object.keys({sourceMapping: '', licenseeManager:''})}/>
                    {
                        editLicenseeMappingResult &&
                        <ResponseMessage isSuccessful={editLicenseeMappingResult.isSuccessful}
                            message={editLicenseeMappingResult.message || LangHelper.getResource('UpdateLicenseeMappingSuccessful')}
                        />
                    }
                    {
                        cancelLicenseeMappingResult &&
                        <ResponseMessage isSuccessful={cancelLicenseeMappingResult.isSuccessful}
                            message={cancelLicenseeMappingResult.message || LangHelper.getResource('UpdateLicenseeMappingSuccessful')}
                        />
                    }
                     <Form className='form-filter-v2'>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group className='setting-group'>
                                <Form.Label>
                                    {LangHelper.getResource('Setting')}
                                </Form.Label>
                                <Form.Control type="text" size="sm" value={this.state.setting} style={{width: 150}}
                                    name="setting" id="setting"
                                    className="shadow-none mr-4" autoComplete="off"
                                    onChange={event => this.setState({setting: event.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" className='btnSearch' size="sm" onClick={this.handleSearch}>
                                    {LangHelper.getResource('Search')}
                                </Button>
                            </Form.Group>
                        </Form.Row>
                     </Form>
                    <Table
                        width={800}
                        autoWidth={false}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        containerPadding={0}
                        adjustedHeight={10}
                        shouldResetScrollPosition={false}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSearch = () => {
        const params = {
            setting : this.state.setting
        };
        this.props.getLicenseesMapping(params);
    };

    render() {
        const {licensees, licenseesMapping, confirmCancelPopup, oncloseConfirm, isHost}= this.props;
        if(!licensees || !licenseesMapping){
            return null;
        }

        return (
            <Modal show className="licensee-mapping" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered size='lg'
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('LicenseeMapping')}</Modal.Title>
                </Modal.Header>
                {this.renderForm()}
                {
                confirmCancelPopup.show &&
                    <SweetModalDialog size="md" className='cancel-modal-dialog'
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>Are you sure you want to remove Source Mapping and Licensee Manager of <strong>{confirmCancelPopup.setting}</strong>?</div>
                        }
                        buttons={[
                            isHost &&
                            <Button onClick={() => this.handleCancelSetting(confirmCancelPopup.settingId)} variant="primary" size="sm" >
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button onClick={oncloseConfirm} variant="primary" size="sm">
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={oncloseConfirm}
                    />
                }
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { licensees, licenseesMapping, licenseesManager, confirmCancelPopup } = state;
    return { licensees, licenseesMapping, licenseesManager, confirmCancelPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseeMapping);