import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import ExcelIcon from '@jsroot/components/ExcelIcon';

export class FilterContactInforms extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            selectedStatusId: this.props.selectedStatuses
        };
    }

    handleChangeFilter = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        });
    };

    handleChangeStatus = selectedItemsKey => {
        this.setState({
            selectedStatusId: selectedItemsKey
        });
    };

    contactParams = () => {
        const params = {
            titleId: this.props.titleDetail.titleId,
            username: this.state.username,
            statusId: this.state.selectedStatusId
        };
        return params;
    };

    handleSearch = () => {
        const contactParams = this.contactParams();
        this.props.setGridParams({pageIndex: 1, pageSize: 100});
        this.props.setEditedInforms([]);
        this.props.getContactInforms(contactParams);
    };

    handleExportExcel = () => {
        const contactParams = this.contactParams();
        this.props.exportContactInforms(contactParams);
    };

    render() {
        const { titleDetail, contactInforms, contactInformSettings } = this.props;
        const filterStatuses = contactInformSettings.filterStatuses.map(item => {
            return {
                settingId: item.settingId,
                settingValue: item.settingValue,
                checked: this.state.selectedStatusId.split(',').includes(item.settingId.toString())
            };
        });

        return (
            <Fragment>
                <div className="table-title d-flex justify-content-between align-items-center">
                    {titleDetail.title}
                    {
                        contactInforms.length > 0 && (
                            <ExcelIcon
                                handleExportExcel={this.handleExportExcel}
                            />
                        )
                    }
                </div>

                <Form onSubmit={this.handleSearch} className="form-filter">
                    <Form.Group as={Row}>
                        <Form.Label className="col-form-label" style={{paddingLeft:'10px'}}>
                            {LangHelper.getResource('Username')}
                        </Form.Label>

                        <Col sm="2" md="2">
                            <Form.Control type="text" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                onChange={this.handleChangeFilter}
                            />
                        </Col>

                        <Form.Label className="col-form-label" style={{paddingLeft:'10px'}}>
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
                                    this.handleChangeStatus(selectedItemsKey);
                                }}
                            />
                        </Col>

                        <Col>
                            <Button variant="primary" size="sm" style={{width: '65px'}} onClick={this.handleSearch}>
                                {LangHelper.getResource('Search')}
                            </Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, contactInforms, contactInformSettings } = state;
    return { titleDetail, contactInforms, contactInformSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContactInforms);