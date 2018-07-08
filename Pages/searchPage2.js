import React, { Component } from 'react';
import { Text, StyleSheet, View, ListView, TextInput, ActivityIndicator, Alert,FlatList,AsyncStorage } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

const oauthToken ='8829913f2b6d177a7e33e09df2e0d0ea1ddcabf6';

export default class searchPage2 extends Component {

        state = {
           isLoading: true,
           data:[],
        }

        searchrepo(text){
                fetch('https://api.github.com/search/users?q='+text+'&sort=stars&order=desc', {
                   method: 'GET'
                })
                .then((response) => response.json())
                .then((responseJson) => {
                   console.log(responseJson);
                   //store the data
                   AsyncStorage.setItem('repo', JSON.stringify(responseJson));
                   this.setState({
                      isLoading: false,
                      data:responseJson,
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

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round
                      onSubmitEditing={(event) => this.searchrepo(event.nativeEvent.text)}
            />
  };

  render() {

    return (

            <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
              <FlatList
                data={this.state.data}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.name}
                    avatar={{ uri: item.avatar_url }}
                    containerStyle={{ borderBottomWidth: 0 }}
                    onPress={
                            () => Linking.openURL(item.html_url).catch(err => console.error('An error occurred', err))
                    }
                  />
                )}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}

              />
            </List>
          );
  }
}

const styles = StyleSheet.create({

 MainContainer :{

  justifyContent: 'center',
  flex:1,
  margin: 7,
  alignSelf:'stretch',
  },

 rowViewContainer: {
   fontSize: 17,
   padding: 10,
  },

  TextInputStyleClass:{

   textAlign: 'center',
   height: 10,
   borderWidth: 1,
   borderColor: '#009688',
   borderRadius: 7 ,
   backgroundColor : "#FFFFFF",
   padding: 20,
   }

});
