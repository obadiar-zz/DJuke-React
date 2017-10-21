import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Picker,
  Modal
} from 'react-native';

import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default class AddQueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedItem: '',
      bid: 0.00,
      modalVisible: false
    }
    this.handleClick = this.handleClick.bind(this);
  }


  handleClick(id) {
    this.setState({modalVisible: true, clickedItem: id});
  }
  render() {
    const {songImage,title, artist, id, duration } = this.props;
    console.log("check", songImage, title, artist, id, duration);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return(
      <View key={id}>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding:10}}>
             <Text>Enter a bid for {title} by {artist}. Remember - the more you bid the more likely your song will be played!</Text>
             <TextInput
               style={{height: 40, width: 100,paddingLeft: 10,fontSize: 15, borderColor: 'grey', borderWidth: 1, borderRadius: 10,backgroundColor: 'white', marginTop: 20}}
               keyboardType = 'numeric'
               onChangeText={(bid) => {this.setState({bid: parseInt(bid)})}}
               value={this.state.bid}
               placeholder= "$$"
             />

             <TouchableOpacity style={{marginTop: 15}} onPress={() => {
               this.setState({modalVisible: !this.state.modalVisible})
             }}>
               <Text style={{color: 'blue'}}>Submit</Text>
             </TouchableOpacity>

        </View>
    </Modal>
      <TouchableOpacity onPress={() => this.handleClick(id)}>
      <View style={{flex: 1, flexDirection: 'row', marginTop:15}}>
        {songImage ? <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={{uri: songImage}}
        /> :
        <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={require('../assets/images/robot-dev.png')}
        /> }
        <View>
          <Text style={{color: 'white'}}>{title} - {artist}</Text>
          <Text style={{color: 'white'}}>{minutes}:{seconds}</Text>
        </View>
      </View>
      </TouchableOpacity>
      </View>
    )
  }

}
