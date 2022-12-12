import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Site from '@jsroot/common/site';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            tab: '',
            content: ''
        };
    }

    async componentDidMount() {
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            this.setState({languages: response, tab: firstLanguage, content:this.props.data.content});
        });
        
    }

    handleChangeContentById = id => {
        this.props.getTemplateById(id).then(data =>{
            const contentLanguage = data.contents.filter(x => x.language === this.state.tab);
            const content = !contentLanguage ? '' : contentLanguage[0].content;
            this.setState({content});
        });
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
        const templateId = this.props.data.notificationTemplateId;
        if(templateId){
            this.handleChangeContentById(templateId);
        }
    }

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const url = Site.resolveClientUrl(`www/dist/css/images/announcement/${fileName}`);
        window.open(url);
    }

    render() {
        const { data, onClose } = this.props;
        if(!this.state.languages || !data){
            return null;
        }
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={onClose} className='announcement-content-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>{`${LangHelper.getResource('AnnouncementID')}: ${data.announcementId}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{`${LangHelper.getResource('NotificationTemplate')}: ${data.notificationTemplate}`}</div>
                    <div>{`${LangHelper.getResource('Title')}: ${data.title}`}</div>
                    <Tabs
                        className='languages-text'
                        id="controlled-tab"
                        activeKey={this.state.tab}
                        onSelect={selected => this.handleChangeTab(selected)}
                    >
                        {
                            this.state.languages.map((language, key) =>
                                (<Tab key={key} eventKey={language.settingValue} title={language.settingValue}>
                                    <div className='border mb-3 announcement-content'>{data.content}</div>
                                </Tab>)
                            )
                        }
                    </Tabs> 
                        {
                            data.imageSource.map((image, key) =>(
                                <div key={key} className='d-flex'>
                                    <span className='fa fa-file-image-o mr-2  pt-1'/>
                                        <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image)}>
                                            {image}
                                        </span>
                                </div>
                            ))
                        }
                    <div>{`${LangHelper.getResource('GroupHeadline')}: ${data.groupHeadlines}`}</div>
                    <div>{`${LangHelper.getResource('SendDateTimeGMTA8')}: ${data.sendDateString} ${data.sendTimeString} `}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}