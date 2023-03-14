import React from 'react';
import AppContainer from './components/AppContainer';
import '@cssroot/pages/add-sma-personal-message/index.scss';

export default class index extends React.Component {
    render(){
        return(
            <div className='sma-personal-message'>
                <AppContainer />
            </div>
        );
    }
}