import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';

export class Filter extends Component {
    static propTypes = {
        tops: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        tops: []
    };

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

    renderOptions = (item, key) => <option key={key} value={item.id}>{item.name}</option>;

    render() {

        return (
            <Form className="form-filter" >
                <Form.Row bsPrefix='form-row'>
                    <Form.Group>
                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('Top')}</Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none"
                            value={this.state.top}
                            onChange={this.handleTopChange}
                        >
                            {this.props.tops.map(this.renderOptions)}
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData, tops } = state;
    return { gridParams, gridData, tops };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);