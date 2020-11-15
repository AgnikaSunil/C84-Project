import React from 'react';
import LottieView from 'lottie-react-native';

export default class PeopleAnimation extends React.Component{
    render(){
        return(
            <LottieView
                source = {require('../assets/35132-people-with-mobile-phones.json')}
                style = {{width: '100%'}}
                autoPlay loop
            />
        )
    }
}

