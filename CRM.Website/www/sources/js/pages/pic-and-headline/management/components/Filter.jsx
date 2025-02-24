import LangHelper from '@jsroot/common/langHelper';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { ActionCreators } from '../actions';

export class Filter extends PureComponent {
    static propTypes = {
        setting: PropTypes.shape({ roleListWithInActive: PropTypes.array }).isRequired,
        gridParams: PropTypes.object.isRequired,
        getAllSetting: PropTypes.func,
        setGridParams: PropTypes.func,
        getGridData: PropTypes.func,
        isHost: PropTypes.bool.isRequired
    };

    static defaultProps = {
        setting: {
            roleListWithInActive: []
        },
        gridParams: {},
        getAllSetting: function () {
            // nothing
        },
        setGridParams: function () {
            //nothing
        },
        getGridData: function () {
            // nothing
        },
        isHost: false
    };

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                username: '',
                headlineName: '',
                role: ''
            },
            settingRoles: []
        };
    }

    componentDidMount() {
        this.props.getAllSetting().then(() => {
            const { roleListWithInActive } = this.props.setting;
            const selectedRole = [];
            const role = roleListWithInActive.map(r => {
                selectedRole.push(r.settingId);
                return ({ ...r, checked: true });
            });
            this.setState(prevState => ({
                filter: { ...prevState.filter, role: selectedRole.toString() },
                settingRoles: role
            }));
        });
    }

    async componentDidUpdate() {
        if (window.headlineName !== undefined) {
            const { filter } = this.state;
            filter.headlineName = window.headlineName;
            await this.setState({
                filter: filter
            });
            window.headlineName = undefined;
            const params = this.getParams();
            this.props.setGridParams(params);
            this.props.getGridData(params);
            window.headlineName = undefined;
        }
    }

    handleOpenCreatePopup = () => {
        this.props.setCreatePicPopup({ show: true });
    };

    handleChangeFilter = (name, value) => {
        this.setState(prevState => ({
            filter: { ...prevState.filter, [name]: value }
        }));
    };

    getParams = () => {
        const { filter } = this.state;
        return {
            username: filter.username,
            headlineName: filter.headlineName,
            role: filter.role,
            pageIndex: 1,
            pageSize: this.props.gridParams.pageSize
        };
    };

    submitHandler = event => {
        event.preventDefault();
        if (!this.state.filter.role) {
            toast.error(LangHelper.getResource('PleaseChooseRole'));
            return;
        }
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    render() {
        const { filter, settingRoles } = this.state;
        return (
            <Form className="form-filter-v2" onSubmit={this.submitHandler}>
                <Form.Row bsPrefix="form-row">
                    <Form.Group className='field-name'>
                        <Form.Label htmlFor="NamePIC">{LangHelper.getResource('Name')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="NamePIC" autoComplete="off"
                            value={filter.username}
                            onChange={event => this.handleChangeFilter('username', event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="GroupHeadline" className="fixed-width">{LangHelper.getResource('GroupHeadline')}</Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            id="GroupHeadline" autoComplete="off"
                            value={filter.headlineName}
                            onChange={event => this.handleChangeFilter('headlineName', event.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="roleIds">{LangHelper.getResource('Role')}</Form.Label>
                        <div className='form-control-wrapper role-width'>
                            <MultipleSelect
                                id="roleIds"
                                name="roleIds"
                                dataSource={settingRoles}
                                initialValue={filter.role}
                                keyField='settingId'
                                isSummited={false}
                                isAllTextShown
                                valueField='settingValue'
                                statusField='checked'
                                onChange={(currentItem, selectedItem) => this.handleChangeFilter('role', selectedItem)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" size="sm" className="mr-4" onClick={this.submitHandler} type="submit">
                            {LangHelper.getResource('Submit')}
                        </Button>
                        {
                            this.props.isHost &&
                            <Button variant="primary" size="sm" onClick={this.handleOpenCreatePopup}>
                                {LangHelper.getResource('Insert')}
                            </Button>
                        }
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { setting, gridParams } = state;
    return { setting, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);