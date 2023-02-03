import React, { PureComponent } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Col, Form, Row, Tabs, Tab } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';

export default class ContentTab extends PureComponent {
  render() {
    const {languages, handleChangeTab, tab, isValidContent, content, setFieldValue} = this.props;
    return (
        <Form.Group as={Row}>
            <Form.Label column sm="2" md="2" className="required" htmlFor="content">
                {LangHelper.getResource('Content')}
            </Form.Label>
            <Col sm="10" md="10">
                <Tabs
                    className='languages-text'
                    id="controlled-tab"
                    activeKey={tab}
                    onSelect={selected => handleChangeTab(selected)}
                >
                    {
                        languages.map((language, key) =>
                            (<Tab key={key} eventKey={language.settingValue} title={language.settingValue}>
                                {
                                    <CkEditor
                                        name={language.settingValue}
                                        isInvalid={isValidContent}
                                        data={content}
                                        username={window.currentUsername}
                                        onChange={value => setFieldValue(language.settingValue, value)}
                                    />
                                }
                            </Tab>)
                        )
                    }
                </Tabs>               
            </Col>
    </Form.Group>
    );
  }
}
