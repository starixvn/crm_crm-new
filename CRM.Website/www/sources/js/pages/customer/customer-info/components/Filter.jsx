import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { ActionCreators } from '../actions';


export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            IsGuest: false
        };
    };

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
            Username: this.state.Username,
            IsGuest: this.state.IsGuest
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const params = this.getParams();
        console.log(params);
        if(params.Username.trim() != '')
        {
            this.props.setGridParams(params);
            this.props.getCustomerInfo(params)
        }
        
    };

    
    render() {
        const { isHost } = this.props;
        return (
            <div>
                <Form className="form-filter" >
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className="col-md-9">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                onChange={this.handleChange} name="Username" autoComplete="off"
                            />
                        </Form.Group>
                        <Form.Group className="col-md-3">
                            <Form.Control type="checkbox" size="sm" checked={this.state.IsGuest} className="checkbox-cell-style margin-top-10"
                                    onChange={this.handleChange} name="IsGuest" autoComplete="off"
                                />
                        </Form.Group>
                            <Form.Group>
                                <Button className="mr-4" variant="primary" size="sm"
                                    onClick={this.handleSubmit}
                                >
                                    {LangHelper.getResource('Submit')}
                                </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
            
        );
    }
    
}


const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);