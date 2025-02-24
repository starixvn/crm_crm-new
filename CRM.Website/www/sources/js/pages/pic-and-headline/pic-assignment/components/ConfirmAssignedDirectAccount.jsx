import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Modal } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import functions from '../common.functions';
import SweetModalDialog from '../../../../components/SweetModalDialog';

export class ConfirmAssignedDirectAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitting: false,
            directAccountPopup: {
                show: false
            }
        };
    }

    buildHeader = () =>
        <HeaderRow>
            <HeaderCell colWidth={30}>{LangHelper.getResource('PIC')}</HeaderCell>
            <HeaderCell colWidth={70}>{LangHelper.getResource('DirectAccount')}</HeaderCell>
        </HeaderRow>;

    buildBody = () =>
        this.props.confirmAssignedDirectAccountPopup.data.map((item, index) =>
            <Row key={index}>
                <Cell>{`${item.picName} (${item.role})`}</Cell>
                <Cell>{this.renderDirectAccount(item.directAccount)}</Cell>
            </Row>);

    renderDirectAccount = data => {
        const directAccount = data.split(',');
        if (directAccount.length > 20) {
            return (
                <a className='link-color cursor-pointer' onClick={() => this.openDirectAccountPopup(directAccount)}>
                    {directAccount.length} custommers
                </a>
            );
        }

        return data;
    };

    openDirectAccountPopup = directAccount =>
        this.setState({
            directAccountPopup: {
                show: true,
                data: directAccount
            }
        });

    closeDirectAccountPopup = () =>
        this.setState({
            directAccountPopup: {
                show: false
            }
        });

    onClose = () => {
        this.props.setConfirmAssignedDirectAccountPopup({ show: false });
        this.props.setAssignPicPopup({
            ...this.props.assignPicPopup,
            isSubmitting: false
        });
    };

    assignPic = isKeepAssign => {
        this.props.setConfirmAssignedDirectAccountPopup({ show: false });
        functions.assignPic({
            headlineId: this.props.assignPicFilter.headline.value,
            picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
            isKeepAssign,
            directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
        }, this.callbackAssignPic);
    };

    callbackAssignPic = data => {
        const { isSuccessful, message } = data;
        this.props.setAssignPicResult({
            show: true,
            isSuccessful,
            message: isSuccessful ? LangHelper.getResource('AssignPICSuccessfully') : message
        });

        if (data.isSuccessful) {
            setTimeout(this.refreshGrid, 2000);
        } else {
            this.props.setAssignPicPopup({
                ...this.props.assignPicPopup,
                isSubmitting: false
            });
        }
    };

    refreshGrid = () => {
        this.props.setAssignPicPopup({ show: false });
        this.props.getGridData(this.props.gridParams, data => functions.handleNewRemoveOptions(data, this.props.setRemoveOptions));
        this.props.setAssignPicFilter({
            headline: null,
            pics: [],
            directAccount: [],
            isSelectedAll: false
        });
    };

    render() {
        return (
            <Fragment>
                <Modal
                    show backdrop='static' keyboard={false} size='lg' centered
                    onHide={() => this.onClose()} dialogAs={DraggableModalDialog}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as='div'>
                            {LangHelper.getResource('ListOfAssignedDirectAccounts')}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='list-assign-modal'>
                        <Table
                            maxWidth={772}
                            header={this.buildHeader()}
                            body={this.buildBody()}
                            containerPadding={0}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='primary' size='sm'
                            disabled={this.state.isSubmitting}
                            onClick={() => this.assignPic(false)}
                        >
                            {LangHelper.getResource('RemoveAndAssign')}
                        </Button>
                        <Button variant='primary' size='sm'
                            disabled={this.state.isSubmitting}
                            onClick={() => this.assignPic(true)}
                        >
                            {LangHelper.getResource('KeepAssign')}
                        </Button>
                        <Button variant='primary' size='sm' onClick={() => this.onClose()}>
                            {LangHelper.getResource('Cancel')}
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    this.state.directAccountPopup.show &&
                    <SweetModalDialog
                        onClose={this.closeDirectAccountPopup}
                        contents={this.state.directAccountPopup.data}
                        buttons={[<Button variant='primary' size='sm' onClick={this.closeDirectAccountPopup}>
                            {LangHelper.getResource('Close')}
                        </Button>]}
                        title={LangHelper.getResource('DirectAccount')}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        confirmAssignedDirectAccountPopup,
        gridParams,
        assignPicFilter,
        assignPicPopup
    } = state;

    return {
        confirmAssignedDirectAccountPopup,
        gridParams,
        assignPicFilter,
        assignPicPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAssignedDirectAccount);