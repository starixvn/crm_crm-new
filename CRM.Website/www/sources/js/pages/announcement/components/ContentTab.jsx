import React, { PureComponent } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Col, Form, Row, Tabs, Tab } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';

export default class ContentTab extends PureComponent {
    render() {
    const {languages, handleChangeTab, tab, isValidContent, content, setFieldValue, isReadOnly = false} = this.props;
    return (
        <Form.Group as={Row}>
            {
                isReadOnly ?
                <Form.Label className='pl-3 pr-3' htmlFor="content">
                    {LangHelper.getResource('Content')}
                </Form.Label> :
                <Form.Label column sm="2" md="2" className='required' htmlFor="content">
                    {LangHelper.getResource('Content')}
                </Form.Label>
            }
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
                                <CkEditor
                                    name={language.mapLabel}
                                    isInvalid={isValidContent}
                                    data={content[language.mapLabel]}
                                    username={window.currentUsername}
                                    onChange={value => {
                                        setFieldValue(`content.${[language.mapLabel]}`, value);
                                        setFieldValue(`cloneContent.${[language.mapLabel]}`, value);
                                    }}
                                    readOnly={isReadOnly}
                                />
                            </Tab>)
                        )
                    }
                </Tabs>               
            </Col>
        </Form.Group>
    );
  }
}
