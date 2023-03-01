import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal} from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Site from '@jsroot/common/site';
import {
   mapLabelLanguage
} from '../common.functions';

import ContentTab from './ContentTab';

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            tab: '',
            content: '',
            announcement: null,
            currencies: '',
            headlineType: ''
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
            this.setState({announcement});
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

    render() {
        const {announcement, languages, content, tab} = this.state;
        const isInValidOption = this.state.announcement?.siteNameList?.length > 0 && !this.props.settings;
        if(!this.state.announcement || !languages || !content || isInValidOption){
            return null;
        }
        const fileNames = !announcement.fileName ? '' : announcement.fileName.split(',');
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
                    <div>
                        <span>{LangHelper.getResource('NotificationTemplate')}: </span>
                        <span style={styleBold}>{announcement.notificationTemplateName}</span>
                    </div>
                    <div>
                        <span>{LangHelper.getResource('Title')}: </span>
                        <span style={styleBold}>{announcement.title}</span>
                    </div>
                    {
                        <ContentTab
                            isValidContent={false} content={content} isReadOnly
                            languages={languages} tab={tab} handleChangeTab={this.handleChangeTab} 
                        />
                    }
                    {
                        fileNames.length > 0 && fileNames.map((image, key) =>(
                            <div key={key} className='d-flex image-section'>
                                <span className='fa fa-file-image-o mr-2  pt-1'/>
                                    <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image)}>
                                        {image}
                                    </span>
                            </div>
                        ))
                    }
                    {
                        !announcement.siteNameList ?
                        <>
                            <div>
                                <span>{`${LangHelper.getResource('Site')}: N/A`}</span>
                            </div>
                            <div>
                                <span>{`${LangHelper.getResource('Currency')}: N/A`}</span>
                            </div>
                            <div>
                                <span>{`${LangHelper.getResource('HeadlineType')}: N/A`}</span>
                            </div>
                        </> :
                        <>
                            <div>
                                <span>{`${LangHelper.getResource('Site')}: `}</span>
                                <span style={styleBold}>{announcement.siteNameList ? announcement.siteNameList.replaceAll(',', ', ') : ''}</span>
                            </div>
                            <div>
                                <span>{`${LangHelper.getResource('Currency')}: `}</span>
                                <span style={styleBold}>{this.state.currencies}</span>
                            </div>
                            <div>
                                <span>{`${LangHelper.getResource('HeadlineType')}: `}</span>
                                <span style={styleBold}>{this.state.headlineType}</span>
                            </div>
                        </>
                    }
                    <div>
                        {
                            announcement.headlineNameList && announcement.headlineNameList.length > 0 &&
                            <>
                                <span>{`${LangHelper.getResource('AffectedGroupHeadline')}: `}</span>
                                <span style={styleBold}>{announcement.headlineNameList ? announcement.headlineNameList.replaceAll(',', ', ') : ''}</span>
                            </>
                        }
                    </div>
                    <div>
                        {
                            announcement.directAccounts && announcement.directAccounts.length > 0 &&
                            <>
                                <span>{`${LangHelper.getResource('DirectAccount')}: `}</span>
                                <span style={styleBold}>{announcement.directAccounts ? announcement.directAccounts.replaceAll(',', ', ') : ''}</span>
                            </>
                        }
                    </div>
                    <div>
                        <span>{`${LangHelper.getResource('SendDateTimeGMTA8')}: `}</span>
                        <span style={styleBold}>{announcement.sendDateString} {announcement.sendTimeString}</span>
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