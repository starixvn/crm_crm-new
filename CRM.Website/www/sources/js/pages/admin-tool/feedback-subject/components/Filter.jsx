import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import AutoComplete from '@jsroot/components/AutoComplete';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';
export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedbackSubjectSearch: '',
            feedbackSubjectSuggestions: []
        };
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            this.handleSubmit(event);
        }

        if (event.ctrlKey && event.key === 'i') {
            event.preventDefault();
            this.props.setCreateFeedbackSubjectPopup({ show: true });
        }
    }

    getParams = () => {
        return {
            Subject: this.state.feedbackSubjectSearch,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
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

    handleChange = value => {
        this.setState({
            feedbackSubjectSearch: value
        });
    };

    handleInputChange = searchText => {
        let suggestions = [];
        const value = this.props.allActiveFeedbackSubject.map(item => item.subject);
        if (searchText.length > 0) {
            suggestions = value.filter(item => item.substr(0, searchText.length).toLowerCase() === searchText.toLowerCase()).sort();
        }
        this.setState({
            feedbackSubjectSuggestions: suggestions
        });
    };

    render() {
        const { isHost, allActiveFeedbackSubject } = this.props;
        if (!allActiveFeedbackSubject) {
            return null;
        }

        return (
            <Form className="form-filter-v2" id="filter-form-subject" onSubmit={this.handleSubmit}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                <Form.Row bsPrefix='form-row'>
                    <Form.Group className='auto-complete'>
                        <AutoComplete
                            options={this.state.feedbackSubjectSuggestions}
                            onChange={value => this.handleChange(value)}
                            onInputChange={search => this.handleInputChange(search)}
                        />
                    </Form.Group>
                    <Button variant="primary" size="sm"
                        onClick={this.handleSubmit}
                    >
                        <UnderlineButton.searchButton />
                    </Button>
                    {
                        isHost &&
                        <Button variant="primary" size="sm"
                            onClick={this.handleOpenCreatePopup}
                        >
                            <Fragment><u>I</u>nsert New Feedback Subject</Fragment>
                        </Button>
                    }
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData, allActiveFeedbackSubject } = state;
    return {
        gridParams,
        gridData,
        allActiveFeedbackSubject
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);