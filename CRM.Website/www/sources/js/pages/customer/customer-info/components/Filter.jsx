import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import AutoComplete from '@jsroot/components/AutoComplete';
import Site from '@jsroot/common/site';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isGuest: false,
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.gridParams !== prevProps.gridParams) {
            this.setState({
                username: this.props.gridParams.username
            });
        }
    }

    handleChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    getParams = () => {
        return {
            username: this.state.username,
            isGuest: this.state.isGuest
        };
    };

    getCustomerInfo = () => {
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getCustomerInfo(params).then(() => {
            if (this.props.customerInfo === null && !this.state.isGuest) {
                this.setState({
                    showEmptyConfirmPopup: true
                });
            } else if (this.props.customerInfo === null) {
                this.setState({
                    showEmptyCustomerInfoPopup: true
                });
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.getCustomerInfo();
    };

    handleGetCustomerIsGuest = () => {
        this.setState({
            isGuest: true
        });
        this.handleCloseEmptyConfirm();
        this.getCustomerInfo();
    };

    handleCloseEmptyConfirm = () => {
        this.setState({ showEmptyConfirmPopup: false });
    };

    handleCloseEmptyCustomerInfoPopup = () => {
        this.setState({ showEmptyCustomerInfoPopup: false });
    };

    handleChangeSuggestion = value => {
        this.setState({
            username: value
        });
    };

    debounceUserNameInputChange = Site.debounce(searchText => {
        this.setState({
            username: searchText
        }, () => {
            if (searchText.length >= 2) {
                const params = this.getParams();
                this.props.getCustomerSuggestions(params);
            } else {
                this.props.setCustomerSuggestions([]);
            }
        });
    });

    render() {
        return (
            <div>
                <Form className="form-filter search-frm" onSubmit={this.handleSubmit}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className="col-md-9 text-search">
                            <AutoComplete
                                options={this.props.customerSuggestions}
                                onChange={value => this.handleChangeSuggestion(value)}
                                onInputChange={searchText => this.debounceUserNameInputChange(searchText)}
                            />
                            <Button onClick={this.handleSubmit} className="buttonSearch" variant="primary" size="sm">
                                <span className="fa fa-search icon-edit"></span>
                            </Button>
                        </Form.Group>
                        <Form.Group className="col-md-3 check-guest">
                            <input type="checkbox" checked={this.state.isGuest} className="margin-top-10"
                                onChange={this.handleChange} name="isGuest"
                            /> {LangHelper.getResource('Guest')}
                        </Form.Group>
                    </Form.Row>
                </Form>
                {
                    this.state.showEmptyCustomerInfoPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            LangHelper.getResource('EmptyData')
                        }
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleCloseEmptyCustomerInfoPopup}>
                                {LangHelper.getResource('OK')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEmptyCustomerInfoPopup}
                    />
                }
                {
                    this.state.showEmptyConfirmPopup &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={
                            <div>{LangHelper.getResource('ConfirmCustomerSearchGuest')}</div>
                        }
                        buttons={[
                            <Button size="sm" variant="primary" onClick={this.handleGetCustomerIsGuest}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button size="sm" variant="primary" onClick={this.handleCloseEmptyConfirm}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseEmptyConfirm}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, customerInfo, customerSuggestions } = state;
    return {
        gridParams,
        customerInfo,
        customerSuggestions
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);