import LangHelper from '@jsroot/common/langHelper';
import React, { Component, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import WithHotKey from '@jsroot/components/WithHotKey';
import UnderlineButton from '@jsroot/common/underlineButton';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: null,
            username: null,
            excludeIgnoredAcc: true,
            showFilter: true
        };
    }

    submitHandler = () => {
        const { headline, username, excludeIgnoredAcc } = this.state;
        const params = {
             headline: headline === '' ? null : headline,
             username: username === '' ? null : username,
             excludeIgnoredAcc,
             pageIndex: 1,
             pageSize : this.props.gridParams.pageSize
        };
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.submitHandler();
        }
    }

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
                        <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                        <Form.Row bsPrefix='form-row'>
                            <Form.Group>
                                <Form.Label htmlFor="groupHeadlineInput">{LangHelper.getResource('GroupHeadline')}</Form.Label>
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
                                    {LangHelper.getResource('ExcludeIgnoredAccounts')}
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
                                <Button className="mr-4 btn-submit" variant="primary" size="sm" onClick={this.submitHandler}>
                                    <UnderlineButton.submitButton />
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