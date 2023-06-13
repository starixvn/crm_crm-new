import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions/index';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '../../../components/multiple-select/index';
import InsertPersonalMappingPopup from './InsertPersonalMappingPopup';
import { toast } from 'react-toastify';

export class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: {
                chatType: '',
                name: '',
                groupHeadline: '',
                recipient: '',
                LetstalkIdOrUsername: '',
                mappingStatuses: '',
                botServiceId: '',
                botIds: '',
                holdBotIds: '',
                active: ''
            },
            settings: {
                chatTypes: [],
                mappingStatuses: [],
                languages: [],
                botServices: [],
                bots: [],
                holdBots: []
            },
            showFilter: false
        };
    }

    componentDidMount() {
        this.props.getSettings().then(() => {
            const mappingStatuses = this.props.settings.mappingStatuses;
            const selectedMappingStatuses = [];
            mappingStatuses.map(v => {
                v['checked'] = true;
                selectedMappingStatuses.push(v['id']);
            });

            const selectedBotIds = [];
            const bots = this.props.settings.bots;
            const botOptions = this.props.settings.botServices.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    checked: true,
                    subItem: bots.reduce((accumulator, currentValue) => {
                        if (currentValue.channelId === item.id) {
                            selectedBotIds.push(currentValue.id);
                            accumulator.push({ key: currentValue.id, value: currentValue.name, checked: true });
                        }
                        return accumulator;
                    }, [])
                }
            });

            const settings = {
                chatTypes: this.props.settings.chatTypes,
                mappingStatuses: mappingStatuses,
                languages: this.props.settings.languages,
                botServices: this.props.settings.botServices,
                bots: botOptions,
                holdBots: botOptions
            };

            this.setState(prevState => ({
                filter: {
                    ...prevState.filter,
                    ...{
                        mappingStatuses: selectedMappingStatuses.toString(),
                        botIds: selectedBotIds.toString(),
                        holdBotIds: selectedBotIds.toString()
                    },
                },
                settings: settings
            }), () => this.props.setGridParams(this.getParams()));
        });
    }

    onChange = (fieldName, fieldValue) => {
        this.setState(prevState => ({
            filter: { ...prevState.filter, ...{ [fieldName]: fieldValue } }
        }));
    };

    handleChangeBotService = value => {
        this.setState(prevState => ({
            filter: {...prevState.filter, botServiceId: value, botIds: this.getBotIds(value)},
            settings: {...prevState.settings, bots: this.getBotOptions(value)}
        }));
    };

    getBotIds = value => {
        const { holdBotIds } = this.state.filter;
        const { holdBots } = this.state.settings;
        if (value) {
            const botIds = [];
            const botOptions = holdBots.filter(item => item.id === parseInt(value));
            botOptions[0].subItem.forEach(item => { botIds.push(item.key) });
            return botIds.toString();
        }
        return holdBotIds;
    };

    getBotOptions = value => {
        const { holdBots } = this.state.settings;
        if (value) {
            return holdBots.filter(item => item.id === parseInt(value));
        }
        return holdBots
    };

    handleToggleFilter = value => {
        this.setState({ showFilter: value });
        window.dispatchEvent(new Event('resize'));
    };

    getParams = () => {
        const pageSize = this.props.gridParams.pageSize;
        const {
            chatType, botIds, botServiceId, name, groupHeadline,
            recipient, LetstalkIdOrUsername, mappingStatuses, active
        } = this.state.filter;
        return {
            chatType: chatType,
            botIds: botServiceId ? botIds : '',
            channelId: botServiceId,
            name,
            groupHeadline,
            recipientIds: recipient,
            LetstalkIdOrUsername,
            mappingStatuses,
            isActive: active,
            pageIndex: 1,
            pageSize: !pageSize ? 100 : pageSize
        };
    };

    isValidParams = () => this.state.filter.mappingStatuses !== '';

    submitHandler = e => {
        e.preventDefault();
        if (this.isValidParams()) {
            const params = this.getParams();
            this.props.setGridParams(params);
            this.props.getGridData(params);
        } else {
            toast.error(LangHelper.getResource('PleaseChooseMappingStatus'));
        }
    };

    renderOptions = (item, key) => <option key={key} value={item.id}>{item.name}</option>;

    render() {
        return (
            <Fragment>
                <Form className='form-filter' onSubmit={this.submitHandler}>
                    <Form.Row className='form-row'>
                        <Form.Group>
                            <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('BotService')}</Form.Label>
                            <Form.Control as="select" size="sm" className="shadow-none"
                                value={this.state.filter.botServiceId}
                                onChange={e => this.handleChangeBotService(e.target.value)}
                            >
                                <option value="">{LangHelper.getResource('All')}</option>
                                {this.state.settings.botServices.map(this.renderOptions)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('ChatType')}</Form.Label>
                            <Form.Control as="select" size="sm" className="shadow-none"
                                value={this.state.filter.chatType}
                                onChange={e => this.onChange('chatType', e.target.value)}
                            >
                                <option value="">{LangHelper.getResource('All')}</option>
                                {this.state.settings.chatTypes.map(this.renderOptions)}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="col-auto col-form-label">{LangHelper.getResource('DisplayName')}</Form.Label>
                            <Form.Control type="text" size="sm" className="shadow-none"
                                value={this.state.filter.name}
                                onChange={e => this.onChange('name', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="large-form">
                            <Form.Label className="col-auto col-form-label large-label">{LangHelper.getResource('LetstalkIDUsername')}</Form.Label>
                            <Form.Control type="text" size="sm" className="shadow-none"
                                value={this.state.filter.LetstalkIdOrUsername}
                                onChange={e => this.onChange('LetstalkIdOrUsername', e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="col-auto col-form-label">{LangHelper.getResource('GroupHeadline')}</Form.Label>
                            <Form.Control type="text" size="sm" className="shadow-none"
                                value={this.state.filter.groupHeadline}
                                onChange={e => this.onChange('groupHeadline', e.target.value)}
                            />
                        </Form.Group>
                        {
                            !this.state.showFilter &&
                            (
                                <Form.Group>
                                    <div className='col-auto pd-0'>
                                        <Button className='mr-2' variant='primary' size='sm' type='submit'>
                                            {LangHelper.getResource('Submit')}
                                        </Button>
                                    </div>
                                    {
                                        this.props.isHost &&
                                        <div className='col-auto'>
                                            <Button className='mr-2' variant='primary' size='sm' type='button' onClick={this.props.openInsertPersonalMappingPopup}>
                                                {LangHelper.getResource('InsertPersonal')}
                                            </Button>
                                        </div>
                                    }
                                </Form.Group>
                            )
                        }
                        {
                            this.state.showFilter &&
                            (
                                <Form.Row>
                                    <Form.Group>
                                        <Form.Label className="col-auto col-form-label">{LangHelper.getResource('Recipient')}</Form.Label>
                                        <Form.Control type="text" size="sm" className="shadow-none"
                                            value={this.state.filter.recipient}
                                            onChange={e => this.onChange('recipient', e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('BotName')}</Form.Label>
                                        <div className='form-control-wrapper'>
                                            <MultipleSelect
                                                initialValue={this.state.filter.botIds}
                                                dataSource={this.state.settings.bots}
                                                maxDisplayItemCount={1}
                                                keyField='id'
                                                valueField='name'
                                                statusField='checked'
                                                isSummited={false}
                                                isAllTextShown
                                                onChange={(currentItem, selectedItem) => this.onChange('botIds', selectedItem)}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className='col-auto col-form-label'>{LangHelper.getResource('MappingStatus')}</Form.Label>
                                        <div className='form-control-wrapper'>
                                            <MultipleSelect
                                                initialValue={this.state.filter.mappingStatuses}
                                                dataSource={this.state.settings.mappingStatuses}
                                                keyField='id'
                                                valueField='name'
                                                statusField='checked'
                                                isSummited={false}
                                                isAllTextShown
                                                onChange={(currentItem, selectedItem) => this.onChange('mappingStatuses', selectedItem)}
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="large-form">
                                        <Form.Label className='col-auto col-form-label large-label'>{LangHelper.getResource('Active')}</Form.Label>
                                        <Form.Control as="select" size="sm" className="shadow-none"
                                            value={this.state.filter.active}
                                            onChange={e => this.onChange('active', e.target.value)}
                                        >
                                            <option value="">{LangHelper.getResource('All')}</option>
                                            <option value="true">{LangHelper.getResource('Yes')}</option>
                                            <option value="false">{LangHelper.getResource('No')}</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className='col-auto pd-0'>
                                            <Button className='mr-2' variant='primary' size='sm' type='submit'>
                                                {LangHelper.getResource('Submit')}
                                            </Button>
                                        </div>
                                        {
                                            this.props.isHost &&
                                            <div className='col-auto'>
                                                <Button className='mr-2' variant='primary' size='sm' type='button' onClick={this.props.openInsertPersonalMappingPopup}>
                                                    {LangHelper.getResource('InsertPersonal')}
                                                </Button>
                                            </div>
                                        }
                                    </Form.Group>
                                </Form.Row>
                            )
                        }
                    </Form.Row>
                    <div className="filter-collapse text-center">
                        {
                            this.state.showFilter
                                ? <span className="fa fa-caret-up fa-sm" onClick={() => this.handleToggleFilter(false)} />
                                : <span className="fa fa-caret-down fa-sm" onClick={() => this.handleToggleFilter(true)} />
                        }
                    </div>
                </Form>
                {
                    this.props.insertPersonalMappingData.isShow &&
                    <InsertPersonalMappingPopup onClose={this.props.closePersonalMappingPopup} />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, settings, insertPersonalMappingData, insertPersonalMappingResult } = state;
    return {
        gridParams,
        settings,
        insertPersonalMappingData,
        insertPersonalMappingResult
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);