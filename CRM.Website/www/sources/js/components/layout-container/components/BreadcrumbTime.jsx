import React, { Component } from 'react';
import DateTimeService from '@jsroot/common/dateTimeService';
import moment from 'moment';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';

export default class BreadcrumbTime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: moment(new Date()).format('hh:mm:ss A MMM DD, YYYY')
        };
    }
    componentDidMount() {
        this.interval = setInterval(() => {
            const currentTime = DateTimeService.toClientDateTime(new Date());
            const currentTimeFormat = moment(currentTime).format('hh:mm:ss A MMM DD, YYYY');
            this.setState({ time: currentTimeFormat });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return(
            <div sm="3" md="3">
                <div className="pull-right timezone">
                    <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-clock.svg')} />
                    <span id="span-timezoneContainer">
                        {this.state.time + LangHelper.getResource('Gmt8')}
                    </span>
                </div>
            </div>
        );
    }
}