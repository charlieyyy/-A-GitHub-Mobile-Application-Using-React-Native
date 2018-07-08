import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator,Linking,TextInput,Button,AsyncStorage } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import axios from 'axios';

const oauthToken ='8829913f2b6d177a7e33e09df2e0d0ea1ddcabf6';

class FollowingPage extends Component {
        //fetching name and following and followers count

        state = {
           data:[],
        }

        componentDidMount = () => {
           fetch('https://api.github.com/users/charlieyyy/following', {
              method: 'GET'
           })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log(responseJson);
              //store the data
              AsyncStorage.setItem('followings', JSON.stringify(responseJson));
              this.setState({
                 data: responseJson,
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
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.login}
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

export default FollowingPage;
