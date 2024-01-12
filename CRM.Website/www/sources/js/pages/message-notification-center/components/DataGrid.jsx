import React, { Component } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { Form } from 'react-bootstrap';

export default class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    buildHeader = isHost => (
        <HeaderRow>
            <HeaderCell colWidth={4}>{LangHelper.getResource('NotificationID')}</HeaderCell>
            <HeaderCell colWidth={6}>{LangHelper.getResource('Event Info')}</HeaderCell>
            <HeaderCell colWidth={5}>{LangHelper.getResource('Sites')}</HeaderCell>
            <HeaderCell colWidth={30}>{LangHelper.getResource('Content')}</HeaderCell>
            <HeaderCell colWidth={5}>{LangHelper.getResource('Sender/SendDate')}</HeaderCell>
            {
                isHost && <HeaderCell colWidth={4}>{LangHelper.getResource('Action')}</HeaderCell>
            }
        </HeaderRow>
    );



    render() {
        return (
            <div>hi</div>
        )
    }
};