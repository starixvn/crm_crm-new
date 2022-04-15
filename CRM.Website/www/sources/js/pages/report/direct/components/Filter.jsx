import LangHelper from '@jsroot/common/langHelper';
import React, { Component, Fragment } from 'react';
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
            showFilter: true
        };
    }

    submitHandler = event => {
        event.preventDefault();
        const { headline, username, excludeIgnoredAcc, pageIndex } = this.state;
        const { pageSize } = this.props.gridParams;
        const params = { headline: headline === '' ? null : headline, username: username === '' ? null : username, excludeIgnoredAcc, pageIndex, pageSize };
        this.props.setGridParams({ ...params });
        this.props.getGridData({ ...params });
    };

    handleToggleFilter = value => {
        this.setState({ showFilter: value });
        window.dispatchEvent(new Event('resize'));
    };

    render() {
        const { showFilter } = this.state;

        return (
            <Form className="form-filter">
                {
                    showFilter &&
                    <Fragment>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="groupHeadlineInput">{LangHelper.getResource('Group Headline')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none"
                                    id="groupHeadlineInput"
                                    autoComplete="off"
                                    onChange={evt => this.setState({ headline: evt.target.value })}
                                />
                                <Form.Check id="checkIgnoredAccountInput" className="mr-5" type="checkbox"
                                    checked={this.state.excludeIgnoredAcc}
                                    onChange={evt => this.setState({ excludeIgnoredAcc: evt.target.checked })}
                                />
                                <Form.Label className="checkIgnoredAccount-setting" htmlFor="checkIgnoredAccountInput">
                                    {LangHelper.getResource('Exclude ignored accounts')}
                                </Form.Label>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="userNameInput">{LangHelper.getResource('Username')}</Form.Label>
                                <Form.Control type="text" size="sm" className="shadow-none"
                                    id="userNameInput"
                                    autoComplete="off"
                                    onChange={evt => this.setState({ username: evt.target.value })}
                                />
                                <Button className="mr-4 btn-submit" variant="primary" size="sm" onClick={this.submitHandler}
                                >
                                    {LangHelper.getResource('Submit ')}
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </Fragment>
                }
                <div className='text-center filter-collapse'>
                    {
                        showFilter
                            ? <span className='fa-sm fa fa-caret-up ' onClick={() => this.handleToggleFilter(false)} />
                            : <span className='fa-sm fa fa-caret-down ' onClick={() => this.handleToggleFilter(true)} />
                    }
                </div>
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