import React from 'react';
import { Text, View, Image,StyleSheet,Button,FlatList,TouchableHighlight,Linking,Swipeout,AsyncStorage} from 'react-native';
import axios from 'axios';
import { BarChart } from 'react-native-svg-charts';

class visualPage extends React.Component {
   state = {
      data: []
   }
   componentDidMount = () => {
      fetch('https://api.github.com/repos/inducer/pudb/stats/commit_activity', {
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
                <View style = {styles.container}>
                    <Text style={styles.item}>{item.item.total}</Text>
                </View>
        );
    }

    render() {

            const fill = 'rgb(134, 65, 244)'
            const data    = [ 10, 4, 0, 0, 0, 0, 1, 0]

            return (
                   <View style = {styles.listContainer}>
                <BarChart
                    style={ { height: 200 } }
                    data={data}
                    svg={{ fill }}
                    contentInset={ { top: 30, bottom: 30 } }
                />

                <FlatList
                  data={this.state.data}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.total}
                  ItemSeparatorComponent={this.renderSeparator}
                />
                </View>
            )

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

export default visualPage
