import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Select from '@jsroot/components/CustomReactSelect';

export class LicenseeMapping extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            sourceMapping: '',
            setting: '',
            settingId: '',
            shouldResetScrollPosition: true,
            isSubmitting: false
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
                <HeaderCell colWidth={15}>{LangHelper.getResource('Edit')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const {licensees, licenseesMapping}= this.props;
        if (licenseesMapping.length > 0) {
            return licenseesMapping.map((item, index) => this.renderRow(licensees, item, index));
        }
        return [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={5}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    handleEdit = settingId =>{
        this.setState({settingId});
    }

    handleChangeSelect = (value, name) =>{
        if(value !== null){
          this.setState({name: value.value});
        }else{
            this.setState({name: ''});
        }
    }

    renderRow = (licensees, item, index) => {
        const licenseesOption = licensees.map(item =>{
            return {
                value: item,
                label: item
            };
        });
        const sourceMappingDefault = licenseesOption.filter(x=> x.value === item.settingSource);
        return (
            <Row key={`setting-relation-update-${index}`}>
                <Cell>{item.setting}</Cell>
                {
                    this.state.settingId === item.settingId ?
                    <Cell>
                        <Select
                            placeholder={LangHelper.getResource('PleaseSelect')}
                            isClearable
                            isSearchable
                            isFocused
                            isSelected
                            defaultValue={sourceMappingDefault}
                            noOptionsMessage={() => 'No results found'}
                            onChange={value => this.handleChangeSelect(value, 'sourceMapping')}
                            options={licenseesOption}
                        />
                    </Cell> :
                    <Cell>{item.settingSource}</Cell>
                }
                <Cell>{item.licenseeManager}</Cell>
                <Cell>{item.settingId}</Cell>
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item.settingId)}
                    />
                    <span className="rounded-circle fa fa-trash icon-delete"
                        onClick={() => this.handleDelete(item.settingId)}
                    />
                </Cell>
            </Row>
        );
    };


    renderForm = () =>{
        const { updateResult } = this.props;
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Modal.Body>
                    {
                        updateResult &&
                        <ResponseMessage isSuccessful={updateResult.isSuccessful}
                            message={updateResult.message || LangHelper.getResource('UpdateSettingRelationSuccessful')}
                        />
                    }
                     <Form className='form-filter' onSubmit={this.handleSubmit}>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group>
                                <Form.Label>
                                    {LangHelper.getResource('Setting')}
                                </Form.Label>
                                <Form.Control type="text" size="sm" value={this.state.setting} style={{width: 150}}
                                    name="setting" id="setting"
                                    className="shadow-none mr-4" autoComplete="off"
                                    onChange={event => this.setState({setting: event.target.value})}
                                />
                                <Button variant="primary" size="sm" onClick={this.handleSearch}>
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
                        shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.handleSubmit}
                        disabled={this.state.isSubmitting}
                    >
                        {LangHelper.getResource('Update')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };
    
    handleSubmit = event => {
        event.preventDefault();
        const {subSettingName, settingRelation} = this.state;
        const {updatePopup, updateRelation, onClose, getSettingTypes, gridParams, setUpdateResult} = this.props;
        const params = {
            parentId: parseInt(updatePopup.parentId, 10),
            settingName: subSettingName,
            subSettings: settingRelation
        };

        updateRelation(params).then(() => {
            if (this.props.updateResult.isSuccessful) {
                setTimeout(() => {
                    onClose();
                    getSettingTypes(gridParams);
                    setUpdateResult(null);
                }, 3000);
            } else {
                this.setState({isSubmitting: true});
            }
        });
    };

    handleSearch = () => {
        const params = {
            setting : this.state.setting
        };
        this.props.getLicenseesMapping(params);
        this.setState({shouldResetScrollPosition: true});
    };
   
    render() {
        const {licensees, licenseesMapping}= this.props;
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
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { licensees, licenseesMapping } = state;
    return { licensees, licenseesMapping };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenseeMapping);