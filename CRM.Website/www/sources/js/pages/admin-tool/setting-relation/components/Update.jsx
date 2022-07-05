import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';

export class Update extends Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldResetScrollPosition: true,
            subSettingName: this.props.subSettingOptions[0].settingName,
            isSubmitting: false,
            settingRelation: []
        };
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.mainSettingRelation) !== JSON.stringify(this.props.mainSettingRelation)) {
            this.handleSetState(this.props.mainSettingRelation);
        }
    }

    handleSetState = mainSettingRelation =>{
        const settingRelation = [...mainSettingRelation];
        this.setState({settingRelation});
    };


    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={50}>{LangHelper.getResource('Setting')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('IsSub')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Order')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        if (this.state.settingRelation.length > 0) {
            return this.state.settingRelation.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row className="no-data" >
                <Cell className='text-center' colSpan={3}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        return (
            <Row key={`setting-relation-update-${index}`}>
                <Cell>{item.value}</Cell>
                <Cell className='text-center'>
                    <Form.Control className='checkbox-cell-style'
                        id='relation-checkbox'
                        type='checkbox'
                        checked={item.isChild}
                        onChange={e => this.onChangeCheckBox(item.value, e.target.checked)}
                    />
                </Cell>
                <Cell>
                    <Form.Control type="number" size="sm" disabled="disabled" className="shadow-none"
                        value={item.displayOrder}
                        onChange={e => this.onChangeDisplay(item.value, e.target.value)}
                    />
                </Cell>
            </Row>
        );
    };


    renderForm = () =>{
        const { subSettingOptions, updateResult, updatePopup } = this.props;
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Modal.Body>
                    {
                        updateResult &&
                        <ResponseMessage isSuccessful={updateResult.isSuccessful}
                            message={updateResult.message || LangHelper.getResource('UpdateSettingRelationSuccessful')}
                        />
                    }
                    <Form.Group className='form-group row'>
                        <Form.Label column sm="12" md="12">
                            {updatePopup.title}
                            <span className='bold'>{this.props.updatePopup.parentName}</span>
                        </Form.Label>
                    </Form.Group>
                    <div className='filter-relation'>
                        <Form.Label className='label-subSetting' column sm="3" md="3"  htmlFor="subSetting">
                            {LangHelper.getResource('SubSetting')}
                        </Form.Label>
                        <Col sm="5" md="5">
                            <Form.Control as="select" size="sm" style={{width: 200}}
                                name="subSettingName" id="subSettingName"
                                value={this.state.subSettingName}
                                onChange={this.onChangeSubSetting}
                            >
                                {
                                    subSettingOptions.map((value, key) => <option key={key} value={value.settingName}>{value.settingName}</option>)
                                }
                            </Form.Control>
                        </Col>
                        <Col sm="4" md="4">
                            <Button variant="primary" size="sm" onClick={this.handleSearch}>
                            {LangHelper.getResource('Search')}
                        </Button>
                        </Col>
                    </div>
                    <Table
                        width={630}
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

    onChangeSubSetting = event =>{
       this.setState({subSettingName: event.target.value}, () =>{
            this.handleSearch();
       });
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
            settingName : this.state.subSettingName,
            parentId: parseInt(this.props.updatePopup.parentId, 10)
        };
        this.props.getMainSettingRelation(params);
        this.setState({shouldResetScrollPosition: true});
    };

    onChangeDisplay = (value, displayOrder) =>{
        const settingRelationFilter = this.state.settingRelation.map(setting =>{
            return {
                id: setting.id,
                value: setting.value,
                isChild: setting.isChild,
                displayOrder: setting.value === value ? displayOrder : setting.displayOrder
            };
        });
        this.setState({settingRelation: settingRelationFilter, shouldResetScrollPosition: false});
    };

    onChangeCheckBox = (value, checked) =>{
        const settingRelationFilter = this.state.settingRelation.map(setting =>{
            return {
                id: setting.id,
                value: setting.value,
                isChild: setting.value === value ? checked : setting.isChild,
                displayOrder: setting.displayOrder
            };
        });
        this.setState({settingRelation: settingRelationFilter, shouldResetScrollPosition: false});
    };

    render() {
        const {subSettingOptions}= this.props;
        if(this.state.settingRelation.length === 0 || subSettingOptions.length === 0){
            return null;
        }

        return (
            <Modal show className="update-setting-relation" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('SettingRelationManagement')}</Modal.Title>
                </Modal.Header>
                {this.renderForm()}
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { mainSettings, updateResult, updatePopup, mainSettingRelation, gridParams } = state;
    return { mainSettings, updateResult, updatePopup, mainSettingRelation, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);