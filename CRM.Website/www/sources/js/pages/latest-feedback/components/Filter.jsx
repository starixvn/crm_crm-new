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
        };
    }


    handleSubmit = event => {
        event.preventDefault();
    };

    render() {
        const { isHost } = this.props;

        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Top')}</Form.Label>
                    <div className='form-control-wrapper'>
                        <MultipleSelect
                            initialValue={}
                            dataSource={}
                            keyField='id'
                            valueField='name'
                            statusField='checked'
                            isSummited={false}
                            isAllTextShown
                        />
                    </div>
                </Form.Group>
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