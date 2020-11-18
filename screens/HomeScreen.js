import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class BookDonateScreen extends Component{
    constructor(){
        super();
        this.state = {
            allRequests: []
        }
        this.requestRef = null
    }

    getAllRequests = () => {
        this.requestRef = db.collection("exchange_requests").onSnapshot((snapshot)=>{
            var allRequests = snapshot.docs.map(document => document.data());
            this.setState({
                allRequests: allRequests
            })
        })
    }

    componentDidMount(){
        this.getAllRequests();
    }

    componentWillUnmount(){
        this.requestRef();
    }

    keyExtractor = (item, index) => index.toString();
    
    renderItem = ({item, i}) => {
        return(
            <ListItem
                key = {i}
                title = {item.book_name}
                subtitle = {item.reason_to_request}
                titleStyle = {{color: 'black', fontWeight: "bold"}}
                rightElement = {
                    <TouchableOpacity style = {styles.button}>
                        <Text style = {{color: '#ffff'}}>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <MyHeader title = "Barter App"/>
                <View style = {{flex: 1}}>
                    {this.state.allRequests.length === 0
                    ? (
                        <View style = {styles.subContainer}>
                            <Text style = {{fontSize: 20}}>List of all exchange requests</Text>
                        </View>
                    )
                    : (
                        <FlatList
                            keyExtractor = {this.keyExtractor}
                            data = {this.state.allRequests}
                            renderItem = {this.renderItem}
                        />
                    )
                    }
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
})