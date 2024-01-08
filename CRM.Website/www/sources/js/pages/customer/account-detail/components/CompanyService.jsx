import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import Site from '@jsroot/common/site';

export class CompanyService extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            companyService: null,
            chatTypeMapping: null
        };
    }
    async componentDidMount() {
        await this.props.getHeadlineCompanyService({ headlineID: this.props.customerInfo.custId });
        this.setState({
            companyService: this.props.headlineCompanyService.item1,
            chatTypeMapping: this.props.headlineCompanyService.item2
        });
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={460}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={120 }>{LangHelper.getResource('Offer')}</HeaderCell>
                <HeaderCell colspan={2} colWidth={120}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell className='display-colSpan' colWidth={300}></HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const data = [
            {
              id: 1,
              name: 'Abnormal Bet: Notify void abnormal bet message',
              offer: 'Letstalk',
              CommTool: 'Tool 1'
            },
            {
              id: 2,
              name: 'Others Products: Max Win/Lose reach RM1000,000 and above',
              offer: 'Letstalk',
              CommTool: '+66 222 333 444'
            },
            {
              id: 3,
              name: 'Settlement Issue',
              offer: 'Phone',
              CommTool: 'All Staff have authority to request'
            }
          ];

        if (data.length > 0) {
            return [
                <Fragment key={'body'}>
                    {data.map(item => this.renderRow(item))}
                </Fragment>
            ];
        }

        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={4}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = (item) => {
        return (
            <Row key={item.id}>
                <Cell>{item.name}
                <img className='icon-copy' src={Site.resolveClientUrl('www/dist/css/images/icon/icon-copy.svg')} alt="icon copy" /></Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={item.offer} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={item.offer} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={item.CommTool} autoComplete="off"/>
                </Cell>
            </Row>
        );
    };

    render() {
        const { headlineCompanyService } = this.props;
        if (!headlineCompanyService) {
            return null;
        }
        return (
            <Table
                width={1005}
                autoWidth={false}
                header={this.buildHeader()}
                body={this.buildBody()}
                isPaging={false}
                containerPadding={0}
                adjustedHeight={10}
            />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, getHeadlineCompanyService, communicationTool, headlineCompanyService } = state;
    return { allSettings, customerInfo, getHeadlineCompanyService, communicationTool, headlineCompanyService };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyService);