import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {
                top: ''
            },
            settings: {
                top: []
            }
        };
    }


    handleSubmit = event => {
        event.preventDefault();
    };

    onChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            filter: { ...prevState.filter, ...{ [fieldName]: fieldValue } }
        }));
    };

    renderOptions = (item, key) => <option key={key} value={item.id}>{item.name}</option>;

    render() {
        const { isHost } = this.props;

        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Top')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none"
                            value={this.state.filter.top}
                            onChange={e => this.onChange('top', e.target.value)}
                        >
                            {this.state.settings.top.map(this.renderOptions)}
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
    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);