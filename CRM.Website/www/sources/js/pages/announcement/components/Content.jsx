import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal, Form, Col, Row, Tabs, Tab} from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Site from '@jsroot/common/site';
import {
   mapLabelLanguage, getFileString
} from '../common.functions';

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            tab: '',
            content: '',
            announcement: null,
            currencies: '',
            headlineType: '',
            contentFiles: []
        };
    }

    async componentDidMount() {
        await this.initData(this.props.id);
    }

    initData = async id => {
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            const languages = mapLabelLanguage(response);
            this.setState({languages, tab: firstLanguage});
        });

        Site.blockUI();
        await this.props.getAnnouncementById(id).then(response => {
            const {data, contents} = response.data;
            const announcement = data[0];
            const contentFiles = getFileString(contents);
            this.setState({ announcement, contentFiles });
            this.getContentByLanguage(contents);
            if(announcement.siteNameList.length > 0){
                this.getSettingOption(announcement);
            }
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    }

    getSettingOption = async announcement =>{
        await this.props.getSettings().then(() =>{
            const currencies = [];
            let headlineType = '';
            this.props.settings.currencyList.map(x => {
                if(announcement.currencyIdList.split(',').includes(x.id.toString())){
                    currencies.push(x.name);
                }
            });

            const headlineTypes = [...this.props.settings.headlineTypeList, {id: 2, name: 'All'}];

            headlineTypes.map(x => {
                if(announcement.headlineType === x.id){
                    headlineType = x.name;
                }
            });

            this.setState({currencies: currencies.join(', '), headlineType});
        });
    }

    getContentByLanguage = contents =>{
        const contentObj = {};
        contents.length > 0 && contents.forEach(content =>{
            const replaceContent = content.languageCode.replace(/[^A-Z0-9]/ig, '');
            contentObj[replaceContent] = content.content;
        });
        this.setState({content: contentObj});
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
    }

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const id = this.props.id;
        const url = Site.resolveClientUrl(`www/dist/images/announcement/${id}/${fileName}`);
        window.open(url);
    }

    getFileNames = mapLabel => {
        const { contentFiles } = this.state;
        return contentFiles.filter(item => item.key === mapLabel);
    }

    render() {
        const { announcement, languages, content, tab, contentFiles } = this.state;
        const isInValidOption = this.state.announcement?.siteNameList?.length > 0 && !this.props.settings;
        if(!this.state.announcement || !languages || !content || isInValidOption){
            return null;
        }
        const styleBold = {fontWeight:'bold'};
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={this.props.onClose} className='announcement-content-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>{`${LangHelper.getResource('AnnouncementId')}: ${this.props.id}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='pb-2'>
                        <span>{LangHelper.getResource('Title')}: </span>
                        <span style={styleBold}>{announcement.title}</span>
                    </div>
                    {
                        <div className='pb-2'>
                            <div className="group-list white-br">
                                <div className="list-title">{LangHelper.getResource('Contents')}</div>
                                <div className="list-info">
                                    <Tabs
                                        className='languages-text'
                                        id="controlled-tab"
                                        activeKey={tab}
                                        onSelect={selected => this.handleChangeTab(selected)}
                                    >
                                        {
                                            languages.map((language, key) =>
                                                (<Tab key={key} eventKey={language.settingValue} title={language.settingValue}>
                                                    <div className='announcement-content'>
                                                        <div
                                                            className='announcement-text'
                                                            name={language.mapLabel}
                                                            dangerouslySetInnerHTML={{ __html: content[language.mapLabel] }}
                                                        />
                                                        <div className={this.getFileNames(language.mapLabel).length > 0 ? 'content-border pb-2 cl-file' : ''}>
                                                            {
                                                                this.getFileNames(language.mapLabel).length > 0 && this.getFileNames(language.mapLabel).map((image, key) =>(
                                                                    <div key={key} className='d-flex image-section'>
                                                                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-file-image.png')} />
                                                                        <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image.name)}>
                                                                            {image.name}
                                                                        </span>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </Tab>)
                                            )
                                        }
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    }
                    <div>
                        {
                            !announcement.siteNameList ?
                                <>
                                    <div className="group-list">
                                        <div className="list-title">{LangHelper.getResource('Site')}</div>
                                        <div className="list-info">{LangHelper.getResource('NotApply')}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title">{LangHelper.getResource('Currency')}</div>
                                        <div className="list-info">{LangHelper.getResource('NotApply')}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title headline-type">
                                            {LangHelper.getResource('HeadlineType')}:
                                            <span>{LangHelper.getResource('NotApply')}</span>
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="group-list">
                                        <div className="list-title">{LangHelper.getResource('Site')}</div>
                                        <div className="list-info">{announcement.siteNameList ? announcement.siteNameList.replaceAll(',', ', ') : ''}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title">{LangHelper.getResource('Currency')}</div>
                                        <div className="list-info">{this.state.currencies}</div>
                                    </div>
                                    <div className="group-list">
                                        <div className="list-title headline-type">
                                            {LangHelper.getResource('HeadlineType')}:
                                            <span>{this.state.headlineType}</span>
                                        </div>
                                    </div>
                                </>
                        }
                        {
                            announcement.headlineNameList && announcement.headlineNameList.length > 0 &&
                            <div className="group-list">
                                <div className="list-title">{LangHelper.getResource('AffectedGroupHeadline')}</div>
                                <div className="list-info">{announcement.headlineNameList ? announcement.headlineNameList.replaceAll(',', ', ') : ''}</div>
                            </div>
                        }
                        {
                            announcement.directAccounts && announcement.directAccounts.length > 0 &&
                            <div className="group-list">
                                <div className="list-title">{LangHelper.getResource('DirectAccount')}</div>
                                <div className="list-info">{announcement.directAccounts ? announcement.directAccounts.replaceAll(',', ', ') : ''}</div>
                            </div>
                        }
                        <div className="group-list">
                            <div className="list-title">{LangHelper.getResource('SendDateTimeGMTA8')}</div>
                            <div className="list-info">{announcement.sendDateString} {announcement.sendTimeString}</div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);