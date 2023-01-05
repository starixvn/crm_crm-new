import LangHelper from '@jsroot/common/langHelper';
import React, { Component } from 'react';
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
            year: this.props.gridParams.year
        };
    }

    submitHandler = () => {
        const { year } = this.state;
        const params = {
            year: year
        };
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    renderOptionsYears = () => {
        const minYear = 2011;
        const currentYear = (new Date()).getFullYear();
        const options = [];
        for (let i = minYear; i <= currentYear; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    };

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.submitHandler();
        }
    }

    render() {
        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc}/>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none " value={this.state.year}
                            id="year" onChange={evt => this.setState({ year: evt.target.value }) }
                        >
                            {this.renderOptionsYears()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" onClick={this.submitHandler }>
                            <UnderlineButton.submitButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProp = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams } = state;
    return {
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProp)(Filter);