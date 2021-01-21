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
            feedbackSubjectSearch: ''
        };
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getParams = () => {
        return {
            Subject: this.state.feedbackSubjectSearch,
            pageIndex: 1,
            pageSize: 100
        };
    };

    handleSubmit = event => {
        event.preventDefault();
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getFeedBackSubject(params);
    };

    handleOpenCreatePopup = () => {
        this.props.setCreateFeedbackSubjectPopup({ show: true });
    };

    render() {
        return (
            <Form className="form-filter" onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button className="mr-2" variant="primary" size="sm"
                            onClick={this.handleSubmit}
                        >
                            {LangHelper.getResource('Submit')}
                        </Button>
                        <Button variant="primary" size="sm"
                            onClick={this.handleOpenCreatePopup}
                        >
                            {LangHelper.getResource('FeedbackSubjectInsert')}
                        </Button>
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