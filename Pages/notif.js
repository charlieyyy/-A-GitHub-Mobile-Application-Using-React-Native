import React, { Component } from 'react';
import {Text,View,ScrollView,StyleSheet,Linking,Keyboard,TextInput,RefreshControl,AsyncStorage,Alert,FlatList} from 'react-native';
import { Tile, List, ListItem, Button, Header } from 'react-native-elements';
import axios from 'axios';


const oauthToken ='8829913f2b6d177a7e33e09df2e0d0ea1ddcabf6';

export default class notif extends Component {
        constructor(){
           super();
           this.state = {
            data:[]
           }
           this.componentDidMount = this.componentDidMount.bind(this)
          }

          componentDidMount(){

                  axios.get('/notifications', null, {
                  baseURL: "https://api.github.com",
                  headers: { 'Authorization': 'token ' + oauthToken,
                            }
                  })
                  .then(function(response) {

                  })
                  .catch(function(error) {
                          console.log(error)
                  })

            }

            renderSeparator = () => {
                   return (
                     <View
                       style={{
                         height: 1,
                         width: "86%",
                         backgroundColor: "#CED0CE",
                         marginLeft: "14%"
                       }}
                     />
                   );
             };



            renderItem = (item) =>{

                return  (
                        <TouchableHighlight onPress={() => Linking.openURL(item.item.html_url)}>
                        <View style = {styles.container}>
                            <Text style={styles.item}>{item.item.name}</Text>
                            <Text style={styles.subitem}>{item.item.owner.login}</Text>
                            <Text style={styles.subitem}>({item.item.language}) {item.item.description}</Text>
                        </View>
                        </TouchableHighlight>

                );
            }

            render() {

                return (
                  <View style = {styles.listContainer}>
                    <FlatList
                      data={this.state.data}
                      renderItem={this.renderItem}
                      keyExtractor={item => item.name}
                      ItemSeparatorComponent={this.renderSeparator}
                    />
                  </View>
                );
         }

}


const styles = StyleSheet.create({
  container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',

  },
});
