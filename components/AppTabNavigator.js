import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExchangeScreen from '../screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: <Image source = {require("../assets/home-icon.png")} style = {{width: 25, height: 25}}/>,
            tabBarLabel: "HomeScreen"
        }
    },
    Exchange: {
        screen: ExchangeScreen,
        navigationOptions: {
            tabBarIcon: <Image source = {require("../assets/ads-icon.png")} style = {{width: 25, height: 25}}/>,
            tabBarLabel: "Exchange"
        }
    }
})