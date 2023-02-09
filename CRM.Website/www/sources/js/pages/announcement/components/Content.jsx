import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Site from '@jsroot/common/site';
import {
   mapLabelLanguage, setValueContent
} from '../common.functions';

import ContentTab from './ContentTab';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            tab: '',
            content: '',
            announcement: null
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
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    }

    getContentByLanguage = contents =>{
        const contentObj = {};
        contents.length > 0 && contents.forEach(content =>{
                const key = content.languageCode === 'EN & SC' ? 'ENSC' : content.languageCode;
                contentObj[key] = content.content;
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
        if(!this.state.announcement || !languages || !content){
            return null;
        }
        const fileNames = announcement.fileName.split(',');
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={this.props.onClose} className='announcement-content-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>{`${LangHelper.getResource('AnnouncementId')}: ${this.props.id}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{`${LangHelper.getResource('NotificationTemplate')}: ${announcement.notificationTemplateName}`}</div>
                    <div>{`${LangHelper.getResource('Title')}: ${announcement.title}`}</div>
                    {
                        <ContentTab
                            isValidContent={false} content={content} isReadOnly
                            languages={languages} tab={tab} handleChangeTab={this.handleChangeTab} 
                        />
                    }
                    {
                        fileNames.map((image, key) =>(
                            <div key={key} className='d-flex'>
                                <span className='fa fa-file-image-o mr-2  pt-1'/>
                                    <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image)}>
                                        {image}
                                    </span>
                            </div>
                        ))
                    }
                    <div>
                        <span>{`${LangHelper.getResource('GroupHeadline')}: `}</span>
                        <span style={{fontWeight:'bold'}}>{announcement.headlineNameList}</span>
                    </div>
                    <div>
                        <span>{`${LangHelper.getResource('SendDateTimeGMTA8')}: `}</span>
                        <span style={{fontWeight:'bold'}}>{announcement.sendDateString} {announcement.sendTimeString}</span>
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

export default connect(null, mapDispatchToProps)(Content);