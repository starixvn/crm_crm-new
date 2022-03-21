import colors from '@jsroot/common/colorColumnChart';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { getBackGroundColor } from '@jsroot/common/shareScripts';
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default class Chart extends PureComponent {
    constructor(props) {
        super(props);
    }

    getDataChart = chartInfo => {
        const countries = [];
        chartInfo.total.childReports.forEach(item =>{
            countries.push(item.countryInfo);
        });
        const data = [];

        chartInfo.childReports.forEach(dateReport => {
            dateReport.childReports.forEach((timeReport, index) => {
                const objectData = { name: `${dateReport.shortName} - ${timeReport.shortName}` };
                 const countryInfo = this.getCountriesData(timeReport, countries, objectData);
                 data.push(countryInfo);
            });
        });
        return data;
    };

    getCountriesData = (timeReport, countries, objectData) =>{
        const countryReport = timeReport.childReports;
        countryReport.forEach((country, index) => {
            if(country.numberOfIssues > 0){
                objectData[countries[index].name] = country.numberOfIssues;
            }
        });
        return objectData;
    }

    getLabels = reports => {
        const labels = [];
        reports.total.childReports.forEach(item =>{
            const index = labels.findIndex(label => label === item.countryInfo.name);
            if (index === -1) {
                labels.push(item.countryInfo.name);
            }
        });
        return labels;
    };

    render() {
        const { chartInfo } = this.props;
        const data = this.getDataChart(chartInfo);
        const labels = this.getLabels(chartInfo);
        return (
            <Modal show dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{chartInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ResponsiveContainer width="100%" height={700}>
                    <BarChart
                        width={1100}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: 20
                        }}
                        barCategoryGap={0}
                        barGap={0}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Issue(s)', position: 'top', dy: -10 }} />
                        <Legend wrapperStyle={{ bottom: 5, left: 75 }} />
                        {labels.map((label, index) => (
                            <Bar dataKey={label} key={index} label={{ position: 'top'}}
                                fill={getBackGroundColor(index)} maxBarSize={20}
                            />
                        )
                        )}
                    </BarChart>
                </ResponsiveContainer>
                </Modal.Body>
            </Modal>
        );
    }
}