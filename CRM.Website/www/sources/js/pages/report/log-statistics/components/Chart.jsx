import React, { Component } from 'react';
import colors from '@jsroot/common/colorColumnChart';
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { getBackGroundColor } from '@jsroot/common/shareScripts';

import {Form, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export class Chart extends Component {
    onCloseChart = () => {
        this.props.setChartData({show: false, title: '', data: ''});

    };
    getLabels = reports => {
        const labels = [];
        reports.mainCategories.forEach(report => {
            const index = labels.findIndex(label => label === report.name);
            if (index === -1) {
                labels.push(report.name);
            }
        });
        return labels;
    };
    renderChart = report => {
        const labels = this.getLabels(report);
        const data = report.communicationColumns.map((item, index) => {
            const obj = { name: item.name };
            report.mainCategories.map(category => {
                const listOfCommunicationSum = [];
                const communicationColumnCount = report.communicationColumns.length;
                const listOfCommunicationCount = category.listOfCommunicationCount;

                for (let i = 0; i < communicationColumnCount; i++) {
                    listOfCommunicationSum[i] = 0;
                    for (let j = i; j < listOfCommunicationCount.length; j = j + communicationColumnCount) {
                        listOfCommunicationSum[i] += listOfCommunicationCount[j];
                    }
                }
                obj[category.name] = listOfCommunicationSum[index] === 0 ? null : listOfCommunicationSum[index];
            });
            return obj;
        });

        return (
            <Form>
                <Modal.Body>
                <ResponsiveContainer width="100%" height={800}>
                    <BarChart
                        width={993}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: 20
                        }}
                        barCategoryGap={0}
                        barGap={0}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Feedback(s)', position: 'top', dy: -10 }} />                    
                    <Legend wrapperStyle={{ bottom: 5, left: 90, width: 993 }} />
                        {labels.map((label, index) => (                            
                            <Bar dataKey={label} key={index} label={{ position: 'top' }}
                                fill={colors[index % 20]}
                            />
                        )
                        )}
                    </BarChart>
                </ResponsiveContainer>
                </Modal.Body>
            </Form>
        );
    };
    render() {
        const {title, data} = this.props.chart;
        return (
            <Modal show className="chart-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{title}</Modal.Title>
                </Modal.Header>
                    {this.renderChart(data)}
            </Modal>
        );
    }
}

export default Chart;

