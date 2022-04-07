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
            subSettingName: this.props.subSettingOptions[0].settingName,
            isSubmitting: false
        };
    }


    handleSubmit = () => {
        this.props.updateRelation().then(() => {
            if (this.props.updateResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose();
                    this.props.getSettingTypes(this.props.gridParams);
                    this.props.setUpdate(null);
                }, 3000);
            } else {
                this.setState({isSubmitting: true});
            }
        });
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

    buildBody = mainSettingRelation => {
        if ( mainSettingRelation.length > 0) {
            return mainSettingRelation.map((item, index) => this.renderRow(item, index));
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
                        onChange={e => this.onChangeCheckBox(e.target.checked)}
                    />
                </Cell>
                <Cell>
                    <Form.Control type="number" size="sm" className="shadow-none"
                        value={item.displayOrder}
                        onChange={e => this.onChange('name', e.target.value)}
                    />
                </Cell>
            </Row>
        );
    };


    renderForm = () =>{
        const { subSettingOptions, updateResult, updatePopup, mainSettingRelation } = this.props;
        return (
            <Form>
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
                        </Form.Label>
                    </Form.Group>
                    <div className='filter-relation'>
                        <Form.Label column sm="3" md="3"  htmlFor="subSetting">
                            {LangHelper.getResource('SubSetting')}
                        </Form.Label>
                        <Col sm="5" md="5">
                            <Form.Control as="select" size="sm" style={{width: 200}}
                                name="subSettingName" id="subSettingName"
                                value={this.state.subSettingName}
                                onChange={evt => this.setState({subSettingName: evt.target.value})}
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
                        width={550}
                        autoWidth={false}
                        header={this.buildHeader()}
                        body={this.buildBody(mainSettingRelation)}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" onClick={this.handleSubmit} disabled={this.state.isSubmitting}>
                        {LangHelper.getResource('Update')}
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        const {mainSettingRelation, subSettingOptions}= this.props;
        if(mainSettingRelation === null || !mainSettingRelation || subSettingOptions.length === 0){
            return null;
        }

        return (
            <Modal show className="update-setting-relation" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} centered
                onHide={() => this.props.onClose()}
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