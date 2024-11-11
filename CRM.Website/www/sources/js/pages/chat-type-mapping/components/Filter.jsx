import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { ActionCreators } from '../actions/index';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '../../../components/multiple-select/index';
import InsertPersonalMappingPopup from './InsertPersonalMappingPopup';
import { toast } from 'react-toastify';

export class Filter extends PureComponent {
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

    handleChangeBotName = (currentItem, selectedItem) =>{
        let botIds = [];
        const selectedList = selectedItem.split(',');
        this.state.settings.botServices.forEach(item => {
            botIds = selectedList.filter(element => element !== item.id?.toString());
        });
        this.onChange('botIds', botIds.join(','));
        const bots = this.state.settings.bots.map(bot => {
            let checkFlag = true;

            if (bot.subItem.length > 0) {
                bot.subItem.forEach(sub => {
                    if (!selectedList.includes(sub.key.toString())) {
                        checkFlag = false;
                    }
                });
            } else {
                if (!selectedList.includes(bot.id.toString())) {
                    checkFlag = false;
                }
            }
            return {
                ...bot,
                checked: checkFlag,
                subItem:
                    bot.subItem?.map(sub => {
                        return {
                            ...sub, checked: selectedList.includes(sub.key.toString()) ? true : false
                        }
                })
            }
        });
        const settings = {...this.state.settings, bots: bots};
        this.setState({settings});
    }

    handleChangeMappingStatus = (currentItem, selectedItem) =>{
        this.onChange('mappingStatuses', selectedItem);
        const mappingStatuses = this.state.settings.mappingStatuses.map(status => {
            return {
                ...status, checked: selectedItem.includes(status.id.toString()) ? true : false
            }
        });
        const settings = {...this.state.settings, mappingStatuses};
        this.setState({settings});
    }

    getBotOptions = value => {
        const { holdBots } = this.state.settings;
        if (value) {
            return holdBots.filter(item => item.id === parseInt(value));
        }
        return holdBots
    };

    handleToggleFilter = isToggle => {
        this.setState({ showFilter: isToggle });
        window.dispatchEvent(new Event('resize'));
        if(isToggle){
            document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        }
    };

    getParams = () => {
        const pageSize = this.props.gridParams.pageSize;
        const {
            chatType, botIds, botServiceId, name, groupHeadline,
            recipient, LetstalkIdOrUsername, mappingStatuses, active
        } = this.state.filter;
        const { holdBotIds } = this.state.filter;

        return {
            chatType: chatType,
            botIds: (botServiceId === '' && botIds === holdBotIds) ? '' : botIds,
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

    isValidParams = () => {
        const errMsg = [];
        let isValid = true;
        const { filter } = this.state;

        if (!filter.mappingStatuses) {
            isValid = false;
            errMsg.push(LangHelper.getResource('PleaseChooseMappingStatus'));
        }
        if (!filter.botIds) {
            isValid = false;
            errMsg.push(LangHelper.getResource('PleaseChooseBotName'));
        }

        return { isValid, errMsg };
    }

    submitHandler = e => {
        e.preventDefault();
        if (this.isValidParams().isValid) {
            const params = this.getParams();
            this.props.setGridParams(params);
            this.props.getGridData(params);
        } else {
            this.isValidParams().errMsg.forEach(item => {
                toast.error(item);
            });
        }
    };

    renderOptions = (item, key) => <option key={key} value={item.id}>{item.name}</option>;

    render() {
        return (
            <Fragment>
                <Form className={`form-filter-v2 ${this.state.showFilter ? 'show-filter' : ''}`} onSubmit={this.submitHandler}>
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
                        <Form.Group>
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
                                <Form.Group style={{width: '250px'}}>
                                    <Button className='mr-4' variant='primary' size='sm' type='submit'>
                                        {LangHelper.getResource('Submit')}
                                    </Button>
                                    {
                                        this.props.isHost &&
                                            <Button style={{width: 'auto'}} className='mr-2' variant='primary' size='sm' type='button' onClick={this.props.openInsertPersonalMappingPopup}>
                                                {LangHelper.getResource('InsertPersonal')}
                                            </Button>
                                    }
                                </Form.Group>
                            )
                        }
                        {
                            this.state.showFilter &&
                                (
                                    <>
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
                                                    onChange={(currentItem, selectedItem) => this.handleChangeBotName(currentItem, selectedItem)}
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
                                                    onChange={(currentItem, selectedItem) => this.handleChangeMappingStatus(currentItem, selectedItem)}
                                                />
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
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
                                        <Form.Group style={{width: '250px'}}>
                                            <Button className='mr-2' variant='primary' size='sm' type='submit'>
                                                {LangHelper.getResource('Submit')}
                                            </Button>
                                            {
                                                this.props.isHost &&
                                                <Button style={{width: 'auto'}} variant='primary' size='sm' type='button' onClick={this.props.openInsertPersonalMappingPopup}>
                                                    {LangHelper.getResource('InsertPersonal')}
                                                </Button>
                                            }
                                        </Form.Group>
                                    </>
                                )
                        }
                    </Form.Row>
                    {
                        this.state.showFilter
                            ? <span className="fa fa-caret-up fa-sm icon-toggle" onClick={() => this.handleToggleFilter(false)} />
                            : <span className="fa fa-caret-down fa-sm icon-toggle" onClick={() => this.handleToggleFilter(true)} />
                    }
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