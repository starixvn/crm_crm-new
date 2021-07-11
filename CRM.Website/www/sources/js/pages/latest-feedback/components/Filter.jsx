import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            top: ''
        };
    }

    getParams = (top) => {
        return {
            top: top,
        };
    };

    handleTopChange = event => {
        this.setState({
            top: parseInt(event.target.value, 10)
        });
        const params = this.getParams(parseInt(event.target.value, 10));
        this.props.setGridParams(params);
        this.props.getLatestFeedback(params);
    };

    renderOptions = (item, key) => <option key={key} value={item}>{item}</option>;

    render() {
        const tops = [10, 20, 30, 40, 50];

        return (
            <Form className="form-filter" >
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Top')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none"
                            value={this.state.top}
                            onChange={this.handleTopChange}
                        >
                            {tops.map(this.renderOptions)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);