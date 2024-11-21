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
            serviceName: '',
            envr: 'UAT',
            settingName: ''
        };
    }

    handleChange = event =>{
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    };

    handleChangeServiceName = event =>{
        this.handleChange(event);
        const params = {
            serviceName: event.target.value === 'All' ? '' : event.target.value,
            envr: this.state.envr,
            settingName: ''
        };
        this.props.getSettingNames(params);
        this.setState({settingName: 'All'});
    }

    handleChangeEnvr = event =>{
        this.handleChange(event);
        const params = {
            serviceName: this.state.serviceName,
            envr: event.target.value,
            settingName: ''
        };
        this.props.getSettingNames(params);
        this.setState({settingName: 'All'});
    }

    handleSubmit = () => {
        const { settingName, serviceName,  envr} = this.state;
        const params = {
            serviceName: serviceName === 'All' ? '' : serviceName,
            envr: envr,
            settingName: settingName === 'All' ? '' : settingName
        };
        this.props.setGridParams(params);
        this.props.getConfigSettings(params);
    };

    render() {
        const { serviceName,  envr, settingName} = this.state;
        const {serviceNames, settingNames}= this.props;
        const serviceNameOptions = ['All', ...serviceNames];
        const environmentOptions = ['UAT', 'PRO'];
        const settingNameOptions = ['All', ...settingNames];
        return (
            <Form className='form-filter-v2' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: '260px'}}>
                        <Form.Label className="col-auto col-form-label">{LangHelper.getResource('ServiceName')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="serviceName" id="serviceName"
                            value={serviceName}
                            onChange={this.handleChangeServiceName}
                        >
                            {
                                serviceNameOptions.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="col-auto col-form-label">{LangHelper.getResource('Envr')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="envr" id="envr"
                            value={envr}
                            onChange={this.handleChangeEnvr}
                        >
                            {
                                environmentOptions.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group style={{width: '260px'}}>
                        <Form.Label className="col-auto col-form-label">{LangHelper.getResource('SettingName')}</Form.Label>
                        <Form.Control as="select" size="sm"
                            name="settingName" id="settingName"
                            value={settingName}
                            onChange={this.handleChange}
                        >
                            {
                                settingNameOptions.map((value, key) => <option key={key} value={value}>{value}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group style={{width: '100px'}}>
                        <Button variant="primary" size="sm" onClick={this.handleSubmit}>
                            {LangHelper.getResource('Search')}
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { serviceNames, settingNames, gridParams } = state;
    return { serviceNames, settingNames, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);