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
            settingName: this.props.mainSettings[0].settingName
        };
    }

    componentDidMount(){
        this.handleSubmit();
    }

    handleChangeSettingName = event =>{
        event.preventDefault();
        const settingName = event.target.value;
        this.setState({settingName});
    };

    handleSubmit = () => {
        const { settingName } = this.state;
        this.props.getSettingTypes({settingName});
        this.props.setGridParams({settingName});
    };

    handleInsertNewSetting = settingName => {
        this.props.setOpenInsertNewSettingPopup({ show: true, settingName:settingName});
    };

    handleLicenseeMapping = () => {
        this.props.getLicenseesMapping({setting: ''}).then(() =>{
            this.props.setOpenLicenseeMappingPopup({ show: true});
        });
    };

    render() {
        const { settingName } = this.state;
        return (
            <Form className='form-filter' onSubmit={this.handleSubmit}>
                <Form.Row bsPrefix='form-row'>
                    <Form.Group style={{width: 210}}>
                        <Form.Control as="select" size="sm" style={{width: 210}}
                            name="settingName" id="settingName"
                            value={settingName}
                            onChange={this.handleChangeSettingName}
                        >
                            {
                                this.props.mainSettings.map((value, key) => <option key={key} value={value.settingName}>{value.settingName}</option>)
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group style={{width: 700}}>
                        <Button variant="primary" size="sm" className='mr-3' onClick={this.handleSubmit}>
                            {LangHelper.getResource('Search')}
                        </Button>
                        {
                            this.props.isHost &&
                            <Button variant="primary" size="sm" className='mr-3' onClick={() => this.handleInsertNewSetting('')}>
                                {LangHelper.getResource('InsertNewSetting')}
                            </Button>
                        }
                        {
                            this.props.isHost &&
                            <Button variant="primary" className='mr-3' onClick={() =>  this.handleInsertNewSetting(this.props.gridParams.settingName)}>
                                {LangHelper.getResource('InsertSettingValue') + settingName}
                            </Button>
                        }
                        {
                            this.props.isHost &&
                            <Button variant="primary" onClick={this.handleLicenseeMapping}>
                                {LangHelper.getResource('LicenseeMapping')}
                            </Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { mainSettings, gridParams } = state;
    return { mainSettings, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);