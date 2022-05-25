import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Form, Col, Row } from 'react-bootstrap';
import AutoComplete from '@jsroot/components/AutoComplete';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

export default class Filter extends Component {
    componentDidMount(){
        if(window.customerInfo !== null){
            this.props.getDataGrid();
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.getDataGrid();
    };

    render() {
        const {username, customerSuggestions, isGuest, handleChange, showEmptyCustomerInfoPopup, debounceUserNameInputChange, handleChangeSuggestion,
            handleCloseEmptyCustomerInfoPopup, showEmptyConfirmPopup, handleGetCustomerIsGuest, handleCloseEmptyConfirm} = this.props;
        return (
            <div className='row-search'>
                <Form id="left-container" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row}>
                        <Col sm="9" md="9"  className="text-search">
                            <AutoComplete
                                value={username}
                                options={customerSuggestions}
                                placeholder='Phone or Username or Nickname'
                                onChange={value => handleChangeSuggestion(value)}
                                onInputChange={searchText => debounceUserNameInputChange(searchText)}
                            />
                            <Button onClick={this.handleSubmit} className="buttonSearch" variant="primary" size="sm">
                                <span className="fa fa-search" />
                            </Button>
                        </Col>
                        <Col sm="3" md="3">
                            <Form.Check className="checked-guest" type="checkbox"  name="isGuest" label={LangHelper.getResource('Guest')}
                                checked={isGuest}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                </Form>
                <div className='right-container'>
                    <div>adsdas</div>
                    <div>adsdas</div>
                </div>
                {
                    showEmptyCustomerInfoPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            LangHelper.getResource('EmptyData')
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={handleCloseEmptyCustomerInfoPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={handleCloseEmptyCustomerInfoPopup}
                    />
                }
                {
                    showEmptyConfirmPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('ConfirmCustomerSearchGuest')}</div>
                        }
                        buttons={[
                            <Button size="sm" variant="primary" onClick={handleGetCustomerIsGuest}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button size="sm" variant="primary" onClick={handleCloseEmptyConfirm}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={handleCloseEmptyConfirm}
                    />
                }
            </div>
        );
    }
}