import React from 'react';
import { Text, View, Image,StyleSheet,Button,FlatList,TouchableHighlight,Linking,Swipeout,AsyncStorage} from 'react-native';
import axios from 'axios';

class RepoPage extends React.Component {
   state = {
      data: []
   }
   componentDidMount = () => {
      fetch('https://api.github.com/users/charlieyyy/repos', {
         method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         //store the repo
         AsyncStorage.setItem('repo', JSON.stringify(responseJson));
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
    fontSize: 18,
    height: 44,
    fontWeight:"bold",
  },
  subitem: {
    padding: 10,
    fontSize: 10,
    height: 30,
    color:'blue',
  },
})

export default RepoPage
