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

    handleSearch = event => {
        event.preventDefault();
        const contactParams = this.contactParams();
        this.props.setGridParams({pageIndex: 1, pageSize: this.props.gridParams.pageSize});
        this.props.setEditedInforms([]);
        this.props.getContactInforms(contactParams);
    };

    handleExportExcel = () => {
        const contactParams = this.contactParams();
        this.props.exportContactInforms(contactParams);
    };

    render() {
        const { titleDetail, contactInforms, contactInformSettings } = this.props;
        if (!contactInformSettings) {
            return null;
        }
        const filterStatuses = contactInformSettings.filterStatuses.map(item => {
            return {
                settingId: item.settingId,
                settingValue: item.settingValue,
                checked: this.state.selectedStatusId.split(',').includes(item.settingId.toString())
            };
        });

        return (
            <Fragment>
                <div className="table-title-v2 d-flex justify-content-between align-items-center">
                    {titleDetail.title}
                    {
                        contactInforms.length > 0 && (
                            <ExcelIcon
                                handleExportExcel={this.handleExportExcel}
                            />
                        )
                    }
                </div>

                <Form onSubmit={this.handleSearch} className="form-filter-v2">
                    <Form.Row>
                        <Form.Group>
                            <Form.Label>
                                {LangHelper.getResource('Username')}
                            </Form.Label>

                            <Form.Control type="input" size="sm" className="shadow-none"
                                autoComplete="off"
                                name="username"
                                value={this.state.username}
                                onChange={event => this.handleChangeFilter(event)}
                                onKeyPress={event => event.key === 'Enter' && this.handleSearch(event)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>
                                {LangHelper.getResource('Status')}
                            </Form.Label>

                            <MultipleSelect
                                dataSource={filterStatuses}
                                keyField='settingId' valueField='settingValue'
                                hasAllOption={filterStatuses.length > 0}
                                isAllTextShown={filterStatuses.length > 0}
                                hasSearchBox isNAOption
                                maxDisplayItemCount={1}
                                onChange={(currentItem, selectedItemsKey) => {
                                    this.handleChangeStatus(selectedItemsKey);
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" size="sm" onClick={this.handleSearch}>
                                {LangHelper.getResource('Search')}
                            </Button>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { titleDetail, contactInforms, gridParams } = state;
    return { titleDetail, contactInforms, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterContactInforms);