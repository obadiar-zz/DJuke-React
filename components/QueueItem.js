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
} from 'react-native';

export default class QueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false
    }
  }

  render() {
    const {thumbnail, id, artist, duration, payment, title} = this.props.song;
    console.log("what");
    return (
      <View style={{borderTopWidth: 2, borderBottomWidth: 2, borderLeftWidth: 0, borderRightWidth: 0, borderColor: 'white'}}>
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
          <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{marginTop: 5}}> Current Payment: {payment}</Text>
          <Text> Upvotes: {Object.keys('client_id').length}</Text>
          </View>
        </View>
      </View>
      </View>
    )
  }
}
