import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal, Tabs, Tab } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Site from '@jsroot/common/site';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            tab: '',
            content: '',
            data: null
        };
    }

    async componentDidMount() {
        await this.props.getLanguages().then(response => {
            const firstLanguage = response?.[0]?.settingValue;
            this.setState({languages: response, tab: firstLanguage});
        });

        Site.blockUI();
        await this.props.getAnnouncementById(this.props.id).then(response => {
            this.setState({data: response.data});
        }).catch(Site.handleAxiosError).then(() => Site.unblockUI());
    }

    handleChangeTab = selected =>{
        this.setState({tab: selected});
        const contentLanguage = this.state.data.contents.filter(x => x.language === this.state.tab);
        const content = !contentLanguage ? '' : contentLanguage[0].content;
        this.setState({content});
    }

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const url = Site.resolveClientUrl(`www/dist/css/images/announcement/${fileName}`);
        window.open(url);
    }

    render() {
        const {data} = this.state;
        if(!this.state.data){
            return null;
        }

        const fileNames = data.fileName.split(',');
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
                            fileNames.map((image, key) =>(
                                <div key={key} className='d-flex'>
                                    <span className='fa fa-file-image-o mr-2  pt-1'/>
                                        <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image)}>
                                            {image}
                                        </span>
                                </div>
                            ))
                        }
                    <div>{`${LangHelper.getResource('GroupHeadline')}: ${data.headlineNameList}`}</div>
                    <div>{`${LangHelper.getResource('SendDateTimeGMTA8')}: ${data.sendDateString} ${data.sendTimeString} `}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(Content);