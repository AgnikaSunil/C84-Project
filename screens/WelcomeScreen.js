import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import PeopleAnimation from '../components/PeopleAnimation';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            password : '',
            isModalVisible: 'false',
            firstName: '',
            lastName: '',
            address: '',
            contact: '',
            confirmPassword: ''
        }
    }

    userLogin=(emailId, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
           this.props.navigation.navigate('HomeScreen')
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }

    userSignUp=(emailId, password, confirmPassword)=>{
        if(password !== confirmPassword){
            return Alert.alert("Password doesn't match\n Check your password")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password).then(()=>{
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    emailId: this.state.emailId,
                    address: this.state.address
                })
                return Alert.alert('User added successfully','',
                    [
                        {text: 'OK', onPress: ()=>this.setState({"isModalVisible": false})},
                    ]
                )
            })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
        }
    }

    showModal=()=>{
        return(
            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {this.state.isModalVisible}
            >
                <View style = {styles.modalContainer}>
                   <ScrollView style = {{width: '100%'}}>
                       <KeyboardAvoidingView style = {styles.KeyboardAvoidingView}>
                            <Text style = {styles.modalTitle}>Registration</Text>

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"first name"}
                                maxLength = {8}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        firstName: text
                                    })
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"last name"}
                                maxLength = {8}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"contact"}
                                maxLength = {10}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        contact: text
                                    })
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"address"}
                                multiline = {true}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        address: text
                                    })
                                }}
                            />

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"email"}
                                keyboardType = {'email-address'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        emailId: text
                                    })
                                }}
                            />   

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"password"}
                                secureTextEntry = {true}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        password: text
                                    })
                                }}
                            />   

                            <TextInput
                                style = {styles.formTextInput}
                                placeholder = {"confirm password"}
                                secureTextEntry = {true}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        confirmPassword: text
                                    })
                                }}
                            />

                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity 
                                    style = {styles.registerButton}
                                    onPress = {()=>this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)}
                                >
                                    <Text style = {styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>

                            <View style = {styles.modalBackButton}>
                                <TouchableOpacity 
                                    style = {styles.cancelButton}
                                    onPress = {()=>this.setState({"isModalVisible": false})}
                                >
                                    <Text style = {{color: '#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                       </KeyboardAvoidingView>
                   </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View style = {styles.container}>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>

                </View>

                {
                    this.showModal()
                }

                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    <PeopleAnimation/>
                    <Text style = {styles.title}>Barter</Text>
                </View>

                <View>
                    <TextInput
                        style = {styles.loginBox}
                        placeholder = "abc@abc.com"
                        keyboardType = 'email-address'
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId: text
                            })
                        }}
                    />

                    <TextInput
                        style = {styles.loginBox}
                        secureTextEntry = {true}
                        placeholder = "password"
                        onChangeText = {(text)=>{
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <TouchableOpacity 
                    style = {[styles.button,{marginBottom: 20, marginTop: 20}]}
                    onPress = {()=>{
                        this.userLogin(this.state.emailId, this.state.password)
                    }}>
                        <Text style = {styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style = {styles.button}
                    onPress = {()=>this.setState({isModalVisible: true})}>
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
})
  