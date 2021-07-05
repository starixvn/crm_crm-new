import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import AutoComplete from '@jsroot/components/AutoComplete';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isGuest: false
        };
    };

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
        }, () => {
            const params = this.getParams();
            this.props.getCustomerSuggestion(params);
        });
    };

    getParams = () => {
        return {
            username: this.state.username,
            isGuest: this.state.isGuest
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getCustomerInfo(params);
        
    };

    selectSuggestionSearchValue = item => {
        this.setState({
            username: item
        });
    }

    render() {
        const { isHost } = this.props;
        return (
            <div>
                <Form className="form-filter search-frm" onSubmit={this.handleSubmit}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className="col-md-9 text-search">
                            <Form.Control type="text" size="sm" className="shadow-none inputSearch" autoComplete="off"
                                onChange={this.handleChange} name="username" value={this.state.username}
                            />
                            <Button onClick={this.handleSubmit} className="buttonSearch" variant="primary" size="sm"><span className="fa fa-search icon-edit"></span></Button>

                        </Form.Group>
                        <Form.Group className="col-md-3 check-guest">
                            <input type="checkbox" checked={this.state.IsGuest} className="margin-top-10"
                                onChange={this.handleChange} name="isGuest"
                            /> {LangHelper.getResource('Guest')}
                        </Form.Group>
                        <AutoComplete 
                            options={this.props.CustomerSuggestion}
                            value={this.state.username}
                            top="35px"
                            left="15px"
                            onSelect={this.selectSuggestionSearchValue}
                        />
                    </Form.Row>
                </Form>
            </div>

        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData, CustomerSuggestion } = state;
    return {
        gridParams,
        gridData,
        CustomerSuggestion
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);