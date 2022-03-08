import LangHelper from '@jsroot/common/langHelper';
import React, { PureComponent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class Filter extends PureComponent {
    constructor(props) {
        super(props);
    }

    submitHandler = event => {
        event.preventDefault();
        const { gridParams } = this.props;
        this.props.getGridData({ ...gridParams, pageIndex: 1 });
        this.props.setGridParams({ ...gridParams, pageIndex: 1 });
    };

    handleChangeYear = event => {
        const value = +event.target.value;
        const { gridParams } = this.props;
        this.props.setGridParams({ ...gridParams, year: value });
    };

    renderOptionsYear = () => {
        const minYear = 2011;
        const currentYear = (new Date()).getFullYear();
        const options = [];
        for (let i = minYear; i <= currentYear; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    };

    render() {
        const { gridParams } = this.props;
        return (
            <Form className="form-filter" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group>
                        <Form.Label htmlFor="year">Year</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" value={gridParams.year}
                            id="year" onChange={this.handleChangeYear}
                        >
                            {this.renderOptionsYear()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" onClick={this.submitHandler}>
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