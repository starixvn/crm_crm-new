import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DateTimeService from '@jsroot/common/dateTimeService';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Panel, { PanelHeader } from '@jsroot/components/panel/index';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import Site from '@jsroot/common/site';
import { toast } from 'react-toastify';

export class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandPanels: false
        };
        this.panels = [];
    }

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={13}>{LangHelper.getResource('CreatedDateGM8')}</HeaderCell>
                <HeaderCell colWidth={22}>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Level')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Function')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('ReviewStatus')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Comment')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('DiscussionSolution')}</HeaderCell>
                {
                    isHost && <HeaderCell colWidth={12}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        )
    };

    
}