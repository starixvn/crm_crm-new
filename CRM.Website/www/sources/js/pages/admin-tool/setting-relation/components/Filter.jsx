import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import UnderlineButton from '@jsroot/common/underlineButton';
import WithHotKey from '@jsroot/components/WithHotKey';

export class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settingName: this.props.mainSettings[0].settingName
        };
    }

    componentDidMount(){
        this.handleSubmit();
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        const { settingName } = this.state;
        const params = {settingName};
        this.props.setGridParams(params);
        this.props.getSettingTypes(params);
    };

    render() {
        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit}>
                <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} />
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: 210}}>
                        <Form.Control as="select" size="sm" style={{width: 210}}
                            name="settingName" id="settingName"
                            value={this.state.settingName}
                            onChange={evt => this.setState({settingName: evt.target.value})}
                        >
                            {
                                this.props.mainSettings.map((value, key) => <option key={key} value={value.settingName}>{value.settingName}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            <UnderlineButton.searchButton />
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { mainSettings } = state;
    return { mainSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);