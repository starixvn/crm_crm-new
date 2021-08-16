import React, { PureComponent } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';

export class FilterContactInforms extends PureComponent {
    render() {
        const { titleDetail, onChange, filterStatuses, onChangeStatus, onSearch, renderExportExcelText } = this.props;

        return (
            <>
                <div className="table-title d-flex justify-content-between align-items-center">
                    {titleDetail.title}
                    {renderExportExcelText()}
                </div>

                <Form onSubmit={onSearch} className="form-filter">
                    <Form.Group as={Row}>
                        <Form.Label className="col-form-label" style={{"paddingLeft":"10px"}}>
                            {LangHelper.getResource('Username')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                onChange={onChange}
                            />
                        </Col>

                        <Form.Label className="col-form-label" style={{"paddingLeft":"10px"}}>
                            {LangHelper.getResource('Status')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <MultipleSelect
                                dataSource={filterStatuses}
                                keyField='settingId' valueField='settingValue'
                                hasAllOption={filterStatuses.length > 0}
                                isAllTextShown={filterStatuses.length > 0}
                                hasSearchBox isNAOption
                                onChange={(currentItem, selectedItemsKey) => {
                                    onChangeStatus(selectedItemsKey);
                                }}
                            />
                        </Col>

                        <Col>
                            <Button variant="primary" size="sm" style={{width: '65px'}} onClick={onSearch}>
                                {LangHelper.getResource('Search')}
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </>
        );
    };
}

export default FilterContactInforms;
