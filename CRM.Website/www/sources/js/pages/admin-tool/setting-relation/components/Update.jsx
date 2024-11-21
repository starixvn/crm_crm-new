import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
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

    handleKeyDownFunc = event => {
        if(event.ctrlKey && event.key === 's'){
            event.preventDefault();
            this.handleSearch();
        }

        if(event.ctrlKey && event.key === 'u'){
            this.handleSubmit(event);
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
            </Row>
        );
    };


    renderForm = () =>{
        const { subSettingOptions, updateResult, updatePopup } = this.props;
        return (
            <Form noValidate onSubmit={this.handleSubmit}>
                <Modal.Body>
                    <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} isDocumentHandle/>
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
                    <div className='form-filter-v2'>
                        <Form.Row>
                            <Form.Group className='sub-group'>
                                <Form.Label className='label-subSetting' htmlFor="subSetting">
                                    {LangHelper.getResource('SubSetting')}
                                </Form.Label>
                                <Form.Control as="select" size="sm" style={{width: 200}}
                                    name="subSettingName" id="subSettingName"
                                    value={this.state.subSettingName}
                                    onChange={this.onChangeSubSetting}
                                >
                                    {
                                        subSettingOptions.map((value, key) => <option key={key} value={value.settingName}>{value.settingName}</option>)
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Button variant="primary" size="sm" onClick={this.handleSearch}>
                                    <UnderlineButton.searchButton />
                                </Button>
                            </Form.Group>
                        </Form.Row>
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
                        <UnderlineButton.updateButton />
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    onChangeSubSetting = event =>{
        event.preventDefault();
        this.setState({subSettingName: event.target.value}, () =>{
                this.handleSearch();
        });
    };

    getParamRelationConfirm = () => {
        const { subSettingName, settingRelation } = this.state;
        const settingId = [];
        settingRelation.map(item => {
            if (item.isChild) {
                settingId.push(item.id);
            }
        });
        const params = {
            parentId: parseInt(this.props.updatePopup.parentId, 10),
            settingName: subSettingName,
            settingId: settingId.join(',')
        };
        return params;
    };

    handleCloseConfirmPopup = () => {
        this.props.setRelationConfirmPopup({ show: false });
    };

    handleUpdate = () => {
        const { subSettingName, settingRelation } = this.state;
        const {updatePopup, updateRelation, onClose, getSettingTypes, gridParams, setUpdateResult} = this.props;
        const params = {
            parentId: parseInt(updatePopup.parentId, 10),
            settingName: subSettingName,
            subSettings: settingRelation
        };

        updateRelation(params).then(() => {
            this.props.setRelationConfirmPopup({ show: false });
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

    handleSubmit = event => {
        event.preventDefault();

        const isHaveRemark = 1;
        const parmaRelationConfirm = this.getParamRelationConfirm();
        this.props.getSettingRelationConfirm(parmaRelationConfirm).then(response => {
            if (response === isHaveRemark) {
                this.props.setRelationConfirmPopup({ show: true });
            } else {
                this.handleUpdate();
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

    onChangeCheckBox = (value, checked) =>{
        const settingRelationFilter = this.state.settingRelation.map(setting =>{
            return {
                id: setting.id,
                value: setting.value,
                isChild: setting.value === value ? checked : setting.isChild
            };
        });
        this.setState({settingRelation: settingRelationFilter, shouldResetScrollPosition: false});
    };

    render() {
        const {subSettingOptions}= this.props;
        if(subSettingOptions.length === 0){
            return null;
        }

        return (
            <>
                <Modal show className="update-setting-relation" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('SettingRelationManagement')}</Modal.Title>
                    </Modal.Header>
                    {this.renderForm()}
                </Modal>
                {
                    this.props.relationConfirmPopup.show &&
                    <SweetModalDialog size='md'
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>The Remark will be removed when deselecting relation? Would you like to proceed it?</div>
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleUpdate}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmPopup}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseDeletePopup}
                    />
                }
            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { mainSettings, updateResult, updatePopup, mainSettingRelation, gridParams, relationConfirmPopup } = state;
    return { mainSettings, updateResult, updatePopup, mainSettingRelation, gridParams, relationConfirmPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);