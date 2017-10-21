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

export default class QueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
      additionalBid: 0.00,
      selectedSong: '',
      modalVisible: false
    }
  }

  render() {
    const {thumbnail, id, artist, duration, payment, title, upvotes} = this.props.song;
    const {submitUpvote, submitAddBid} = this.props;
    console.log("what");
    return (
      <View style={{borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderColor: 'white'}}>
      <Modal
      animationType="slide"
      transparent={false}
      visible={this.state.modalVisible}
      onRequestClose={() => {alert("Modal has been closed")}}
      >
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding:10}}>
             <Text>Add to the bid for {title} by {artist}. Remember - the more you bid the more likely your song will be played!</Text>
             <TextInput
               style={{height: 40, width: 100,paddingLeft: 10,fontSize: 15, borderColor: 'grey', borderWidth: 1, borderRadius: 10,backgroundColor: 'white', marginTop: 20}}
               keyboardType = 'numeric'
               onChangeText={(bid) => {this.setState({additionalBid: parseInt(bid)})}}
               value={this.state.bid}
               placeholder= "$$"
             />

             <TouchableOpacity style={{marginTop: 15}} onPress={() => {
               this.setState({modalVisible: !this.state.modalVisible});
               submitAddBid(parseInt(this.state.additionalBid), id)
             }}>
               <Text style={{color: 'blue'}}>Submit</Text>
             </TouchableOpacity>
        </View>
    </Modal>
      <View style={{flex: 1, flexDirection: 'row', marginTop:15}}>
        {thumbnail ? <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={{uri: thumbnail}}
        /> :
        <Image
          style={{width: 50, height: 50, marginRight: 10}}
          source={require('../assets/images/robot-dev.png')}
        /> }
        <View>
          <Text style={{color: 'white'}}>{title} - {artist}</Text>
          <Text style={{color: 'white'}}>{duration}</Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
            <Text style={{color: 'white'}}> Current Payment: {payment}</Text>
            <Text style={{color: 'white'}}> Upvotes: {Object.keys(upvotes).length}</Text>
          </View>
          <View style={{flex:1, flexDirection: 'row', marginTop: 5, marginBottom: 15}}>

            <TouchableOpacity style={{height: 35, marginRight: 10, backgroundColor: 'coral', paddingTop:8, paddingLeft:6, paddingRight: 6, borderRadius: 3}} onPress={() => this.setState({modalVisible: true, selectedSong: id})}>
              <Text style={{color: 'white'}}>Add to bid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{height: 35, backgroundColor: 'purple', paddingTop:8, paddingLeft:6, paddingRight: 6, borderRadius: 3}} onPress={() => {this.setState({selectedSong: id}); submitUpvote(id)}}>
              <Text style={{color: 'white'}}>Upvote song</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    )
  }
}
