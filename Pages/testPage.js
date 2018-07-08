import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,Linking,TextInput,StyleSheet,TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

const oauthToken ='8829913f2b6d177a7e33e09df2e0d0ea1ddcabf6';

class testPage extends Component {
        //fetching name and following and followers count
        state = {
           data: []
        }
        componentDidMount = () => {
           fetch('https://api.github.com/users/charlieyyy/starred', {
              method: 'GET'
           })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log(responseJson);

              this.setState({
                 data: responseJson
              })
           })
           .catch((error) => {
              console.error(error);
           });
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
        paddingTop: 22,
       },
       item: {
         padding: 10,
         fontSize: 20,
         height: 44,
         fontWeight:"bold",
       },
       subitem: {
         padding: 10,
         fontSize: 8,
         height: 20,
         color:'blue'
       },
     })

export default testPage;
