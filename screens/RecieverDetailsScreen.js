import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, Header, Icon } from 'react-native-elements';
import firebase from 'firebase'
import db from '../config'

export default class RecieverDetailsScreen extends Component{
    constructor(){
        super(props);
        this.state = {
            userId: firebase.auth().currentUser,
            recieverId: this.props.navigation.getParam('details')["user_id"],
            requestId: this.props.navigation.getParam('details')["request_id"],
            itemName: this.props.navigation.getParam('details')["item_name"],
            description: this.props.navigation.getParam('details')["description"],
            recieverName: '',
            recieverContact: '',
            recieverAddress: '',
            recieverRequestDocId: ''
        }
    }

    getRecieverDetails(){
        db.collection('users').where('email_id','==',this.state.recieverId).get().then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName: doc.data().first_name,
                    recieverContact: doc.data().contact,
                    recieverAddress: doc.data().address,
                })
            })
        })

        db.collection('exchange_requests').where('request_id','==',this.state.requestId).get().then(snapshot=>[
            snapshot.forEach(doc=>{
                this.setState({
                    recieverRequestDocId: doc.id
                })
            })
        ])
    }

    updateItemStatus=()=>{
        db.collection('all_donations').add({
            item_name: this.state.itemName,
            request_id: this.state.requestId,
            request_by: this.state.recieverName,
            donor_id: this.state.userId,
            request_status: "Donor Interested"
        })
    }

    addNotification=()=>{
      var message = this.state.userName + "has shown interest in donating the item"
      db.collection("all_notifications").add({
        "targeted_user_id"    : this.state.recieverId,
        "donor_id"            : this.state.userId,
        "request_id"          : this.state.requestId,
        "item_name"           : this.state.itemName,
        "date"                : firebase.firestore.FieldValue.serverTimestamp(),
        "notification_status" : "unread",
        "message"             : message
      })
    }

    componentDidMount(){
        this.getRecieverDetails();
    }

    render(){
        return(
          <View style={styles.container}>
            <View style={{flex:0.1}}>
              <Header
                leftComponent ={<Icon name='arrow-left' type='feather' color='#696969'  onPress={() => this.props.navigation.goBack()}/>}
                centerComponent={{ text:"Donate Items", style: { color: '#90A5A9', fontSize:20,fontWeight:"bold", } }}
                backgroundColor = "#eaf8fe"
              />
            </View>
            <View style={{flex:0.3}}>
              <Card
                  title={"Item Information"}
                  titleStyle= {{fontSize : 20}}
                >
                <Card >
                  <Text style={{fontWeight:'bold'}}>Name : {this.state.itemName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Reason : {this.state.reason_for_requesting}</Text>
                </Card>
              </Card>
            </View>
            <View style={{flex:0.3}}>
              <Card
                title={"Reciever Information"}
                titleStyle= {{fontSize : 20}}
                >
                <Card>
                  <Text style={{fontWeight:'bold'}}>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Contact: {this.state.recieverContact}</Text>
                </Card>
                <Card>
                  <Text style={{fontWeight:'bold'}}>Address: {this.state.recieverAddress}</Text>
                </Card>
              </Card>
            </View>
            <View style={styles.buttonContainer}>
              {
                this.state.recieverId !== this.state.userId
                ?(
                  <TouchableOpacity
                      style={styles.button}
                      onPress={()=>{
                        this.updateItemStatus()
                        this.addNotification()
                        this.props.navigation.navigate('MyDonations')
                      }}>
                    <Text>I want to Donate</Text>
                  </TouchableOpacity>
                )
                : null
              }
            </View>
          </View>
        )
      }
    
    }
    
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
      },
      buttonContainer : {
        flex:0.3,
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        width:200,
        height:50,
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 10,
        backgroundColor: 'orange',
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8
         },
        elevation : 16
      }
    })
    
