import LangHelper from '@jsroot/common/langHelper';
import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            pageIndex: 1,
            pageSize: 50
        };
    }

    submitHandler = event => {
        event.preventDefault();
        const { headline, username, excludeIgnoredAcc, pageIndex, pageSize} = this.state;
        const params = { headline, username, excludeIgnoredAcc, pageIndex, pageSize };
        this.props.setGridParams({ ...params });
        this.props.getGridData({ ...params });
    };

    render() {
        const a = this.state;
        return (
            <Form className="form-filter">
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className="groupHeadline-setting" htmlFor="groupHeadlineInput">{LangHelper.getResource('Group Headline')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="groupHeadlineInput"
                            autoComplete="off"
                            onChange={evt => this.setState({ headline: evt.target.value })}
                        />
                        <Form.Check className="mr-5" type="checkbox" label={LangHelper.getResource('Exclude ignored accounts')}
                            checked={this.state.excludeIgnoredAcc}
                            onChange={evt => this.setState({ excludeIgnoredAcc: evt.target.checked })}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className="username-setting" htmlFor="userNameInput">{LangHelper.getResource('Username')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="userNameInput"
                            autoComplete="off"
                            onChange={evt => this.setState({ username: evt.target.value })}
                        />
                        <Button className="mr-4 btn-submit" variant="primary" size="sm"   onClick={this.submitHandler}                          
                        >
                            {LangHelper.getResource('Submit')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams } = state;
    return {
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);