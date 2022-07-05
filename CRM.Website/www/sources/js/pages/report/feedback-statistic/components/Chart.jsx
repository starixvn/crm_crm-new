import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { getBackGroundColor } from '@jsroot/common/shareScripts';
import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default class Chart extends Component {
    constructor(props) {
        super(props);
    }

    getDataChart = chartInfo => {
        const data = [];
        chartInfo.feedbackCategories.forEach(feedback => {
            const objectData = { name: feedback.name };
            chartInfo.usernames.forEach((username, index) =>{
                if(feedback.subTotal.resolves[index] > 0){
                    objectData[username.name] = feedback.subTotal.resolves[index];
                }
            });
            data.push(objectData);
        });
        return data;
    };


    getLabels = chartInfo => {
        const labels = [];
        chartInfo.usernames.forEach(item =>{
            labels.push(item.name);
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
                    <Modal.Title as="div">{chartInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ResponsiveContainer width="100%" height={data.length > 5 ? 710 : 750}>
                    <BarChart
                        width={1100}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: data.length > 5 ? 250 : 30
                        }}
                        barCategoryGap={0}
                        barGap={0}
                    >
                        <XAxis dataKey="name" scaleToFit="true" verticalAnchor= "start"
                            interval={0} angle= {data.length > 5 ? -90 : 0} dy={data.length > 5 ? 120 : 0}
                        />
                        <YAxis label={{ position: 'top', dy: -10, value: 'Feedback(s)'}} />
                        <Legend wrapperStyle={{ bottom: 5, left: 75 }} />
                        {labels.map((label, key) => (
                            <Bar label={{ position: 'top'}} dataKey={label} key={key}
                                maxBarSize={20} fill={getBackGroundColor(key)}
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