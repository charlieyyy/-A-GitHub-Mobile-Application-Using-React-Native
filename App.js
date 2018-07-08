import React from 'react';
import { Text, View, Image,StyleSheet,Button,AppRegistry } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ProfilePage from './Pages/ProfilePage.js';
import RepoPage from './Pages/RepoPage.js';
import FollowerPage from './Pages/FollowerPage.js';
import FollowingPage from './Pages/FollowingPage.js';
import Login from './Pages/LoginPage.js';
import testPage from './Pages/testPage.js';
import searchPage from './Pages/searchPage.js';
import searchPage2 from './Pages/searchPage.js';
import notif from './Pages/notif.js';
import visualPage from './Pages/visual.js';

const Secured = TabNavigator({
  Repositories: {
          screen: RepoPage ,
          navigationOptions: {
                  tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />
          },
  },
  Profile: {
          screen: ProfilePage,
          navigationOptions: {
                  tabBarIcon: ({ tintColor }) => <Icon name="home" size={35} color={tintColor} />
          },
  },
  Followers: {
          screen: FollowerPage,
          navigationOptions: {
                  tabBarIcon: ({ tintColor }) => <Icon name="people" size={35} color={tintColor} />
          },
  },
  Following: {
          screen: FollowingPage,
          navigationOptions: {
                  tabBarIcon: ({ tintColor }) => <Icon name="people" size={35} color={tintColor} />
          },
  },
  star:{
          screen: testPage,
          navigationOptions: {
                  tabBarIcon: ({ tintColor }) => <Icon name="star" size={35} color={tintColor} />
          },

   },
   search:{
           screen: searchPage,
           navigationOptions: {
                   tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
           },

    },
    search2:{
            screen: searchPage2,
            navigationOptions: {
                    tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} color={tintColor} />
            },

     },
     notification:{
             screen: notif,
             navigationOptions: {
                     tabBarIcon: ({ tintColor }) => <Icon name="archive" size={35} color={tintColor} />
             },

      },
      visualization:{
              screen: visualPage,
              navigationOptions: {
                      tabBarIcon: ({ tintColor }) => <Icon name="image" size={35} color={tintColor} />
              },

       },
});


export default class App extends React.Component{

        state = {
                isLoggedIn: false
        }

        render() {

          if (this.state.isLoggedIn)
            return <Secured
                onLogoutPress={() => this.setState({isLoggedIn: false})}
              />;
          else
            return <Login
                onLoginPress={() => this.setState({isLoggedIn: true})}
              />;
        }



}

AppRegistry.registerComponent('Myapp', () => App);
