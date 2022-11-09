import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import React, { PureComponent } from 'react';
import { Modal } from 'react-bootstrap';
import { getBackGroundColor } from '@jsroot/common/shareScripts';
import { Bar, BarChart, Legend, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default class Chart extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            labels: []
        };
    }

    componentDidMount() {
        const { chartInfo } = this.props;
        const data = this.getDataChart(chartInfo);
        const labels = this.getLabels(chartInfo);
        this.setStateData(data, labels);
    }

    setStateData = (data, labels) =>{
        this.setState({data, labels});
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
        const {data, labels} = this.state;
        if(!data || !labels || (data.length === 0 || labels.length === 0)){
            return null;
        }
        const { chartInfo } = this.props;
        return (
            <Modal className='chart-modal-feedback-statistics' show dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="xl"
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{chartInfo.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ResponsiveContainer width="100%" height={data.length > 5 ? 820 : 700}>
                    <BarChart
                        width={1100}
                        data={data}
                        margin={{
                            top: 30, right: 30, left: 30, bottom: data.length > 5 ? 250 : 30
                        }}
                        barCategoryGap={data.length > 5 ? -10 : 0}
                        barGap={data.length > 5 ? -10 : 0}
                    >
                        <XAxis dataKey="name" scaleToFit verticalAnchor= "start" textAnchor="end" height={labels.length > 50 ? 60 : 20}
                            interval={0} angle= {data.length > 5 ? -90 : 0} dy={10}
                        />
                        <YAxis label={{ position: 'top', dy: -10, value: 'Feedback(s)'}} allowDataOverflow/>
                        <Legend wrapperStyle={{ bottom: 5, left: 75, height: labels.length > 50 ? 300 : 100}}/>
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