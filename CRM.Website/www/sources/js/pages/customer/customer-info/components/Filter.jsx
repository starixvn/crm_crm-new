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
            UserName: '',
            IsGuest: false
        };
    };

    componentDidUpdate(prevProps) {
        if (this.props.gridParams != prevProps.gridParams) {
          this.setState({
              UserName: this.props.gridParams.UserName
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
            UserName: this.state.UserName,
            IsGuest: this.state.IsGuest
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getCustomerInfo(params);
        this.props.getSettings();
    };

    
    render() {
        const { isHost } = this.props;
        return (
            <div>
                <Form className="form-filter search-frm"  onSubmit={this.handleSubmit}>
                    <Form.Row bsPrefix='form-row'>
                        <Form.Group className="col-md-9 text-search">
                            <Form.Control type="text" size="sm" className="shadow-none inputSearch"
                                onChange={this.handleChange} name="UserName" value={this.state.UserName}
                            />
                            <Button onClick={this.handleSubmit} className="buttonSearch" variant="primary" size="sm"><span className="fa fa-search icon-edit"></span></Button>  
                            
                        </Form.Group>
                        <Form.Group className="col-md-3 check-guest">
                            <input type="checkbox"  checked={this.state.IsGuest} className="margin-top-10"
                                onChange={this.handleChange} name="IsGuest" autoComplete="off"
                            /> {LangHelper.getResource('Guest')}
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
            
        );
    }
    
}


const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData, UserName } = state;
    return {
        gridParams,
        gridData,
        UserName
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);