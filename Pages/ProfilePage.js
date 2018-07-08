import React from 'react';
import { Text, View, Image,StyleSheet,Button,TextInput,AsyncStorage} from 'react-native';
import axios from 'axios';

const oauthToken ='8829913f2b6d177a7e33e09df2e0d0ea1ddcabf6';

export default class ProfilePage extends React.Component {

        //fetching name and following and followers count
        state = {
           name: '',
           following:'',
           followers:'',
           repo:'',
           data:[],
           email:'',
        }
        componentDidMount = () => {
           fetch('https://api.github.com/users/charlieyyy', {
              method: 'GET'
           })
           .then((response) => response.json())
           .then((responseJson) => {
              console.log(responseJson);
              //store the data
              AsyncStorage.setItem('profile', JSON.stringify(responseJson));
              this.setState({
                 username: responseJson.login,
                 name:responseJson.name,
                 email:responseJson.email,
                 following: responseJson.following,
                 followers: responseJson.followers,
                 repo:responseJson.public_repos,
                 avatar_url:responseJson.avatar_url,
              })
           })
           .catch((error) => {
              console.error(error);
           });
        }

        follow(text){
                axios.put("/user/following/"+text, null, {
                baseURL: "https://api.github.com",
                headers: { 'Authorization': 'token ' + oauthToken,
                            'Content-Length': 0 }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                        console.log(error)
                })
        }

        unfollow(test){
                axios.delete("/user/following/"+test, null, {
                baseURL: "https://api.github.com",
                headers: { 'Authorization': 'token ' + oauthToken}
                })
                .then(function(response) {
                })
                .catch(function(error) {
                        console.log(error)
                })


        }

        star(text){
                axios.put('user/starred/'+text, null, {
                baseURL: "https://api.github.com",
                headers: { 'Authorization': 'token ' + oauthToken,
                            'Content-Length': 0 }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                        console.log(error)
                })
        }

        unstar(text){
                axios.delete('user/starred/'+text, null, {
                baseURL: "https://api.github.com",
                headers: { 'Authorization': 'token ' + oauthToken,
                            'Content-Length': 0 }
                })
                .then(function(response) {

                })
                .catch(function(error) {
                        console.log(error)
                })
        }
  //render the profile page
  render() {

          return (
            <View style={styles.profilebg}>
                   <View style={{flex: 1, backgroundColor: 'steelblue',}} />
                    <Image source={{uri:this.state.avatar_url}} style={{width: 50, height: 50}}/>
                    <Text>{this.state.username}</Text>
                    <Text>{this.state.name}</Text>
                    <Text>charlie2014rha@gmail.com{this.state.email}</Text>
                    <Text>@2017</Text>


                    <View style={styles.counter}>
                              <View style={{ alignItems: 'center' }}>
                                  <Button
                                      title = 'Ropositories'
                                      color = 'white'
                                      onPress={() => this.props.navigation.navigate('Repositories')}
                                  />
                                  <Text>{this.state.repo}</Text>
                              </View>
                              <View style={{ alignItems: 'center' }}>
                                      <Button
                                          title = 'Followers'
                                          color = 'white'
                                          onPress={() => this.props.navigation.navigate('Followers')}
                                      />
                                      <Text>{this.state.followers}</Text>

                              </View>
                              <View style={{ alignItems: 'center' }}>
                                <Button
                                  title = 'Following'
                                  color = 'white'
                                  onPress={() => this.props.navigation.navigate('Following')}
                                />
                                <Text>{this.state.following}</Text>
                              </View>
                    </View>

                    <View style={styles.function}>
                    <TextInput
                     onSubmitEditing={(event) => this.follow(event.nativeEvent.text)}
                     keyboardType="default"
                     underlineColorAndroid='transparent'
                     placeholder="follow someone"
                    />
                    <TextInput
                     onSubmitEditing={(event) => this.unfollow(event.nativeEvent.text)}
                     keyboardType="default"
                     underlineColorAndroid='transparent'
                     placeholder="unfollow someone"
                    />
                    <TextInput
                     onSubmitEditing={(event) => this.star(event.nativeEvent.text)}
                     keyboardType="default"
                     underlineColorAndroid='transparent'
                     placeholder="star some repo"
                    />

                    <TextInput
                     onSubmitEditing={(event) => this.unstar(event.nativeEvent.text)}
                     keyboardType="default"
                     underlineColorAndroid='transparent'
                     placeholder="unstar some repo"
                    />
                    </View>

                    <View style={{flex: 2, backgroundColor: 'steelblue'}} />
            </View>
          );
  }
}


const styles = StyleSheet.create({
  profilebg: {
          flex: 1, width: null, backgroundColor: 'steelblue',alignSelf:'stretch',
          justifyContent: 'center',
          alignItems: 'center',
  },
  button: {
          flex: 1, backgroundColor: 'steelblue',
          flexDirection: 'row',
  },
  counter: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end'
  },

  function:{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'flex-end'
  },
});
