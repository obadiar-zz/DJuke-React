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
import * as Progress from 'react-native-progress';
import QueueItem from './QueueItem';
export default class QueueList extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS", props.currentlyPlaying);
    this.state= {
      queue: this.props.queue,
      currentlyPlaying: this.props.currentlyPlaying,
      currentTimeStamp: 0,
      timeLeft: this.props.currentlyPlaying.duration
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.increment.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  increment() {
    let minutes = Math.floor(this.state.currentlyPlaying.durationS / 60);
    let seconds = Math.floor(this.state.currentlyPlaying.durationS - minutes * 60) - 1;
    if(seconds < 10){

      seconds = '0' + seconds;
      if(seconds < 0) {
        minutes = minutes -1;
        seconds = 59;
      }
    }
    const newState = {...this.state.currentlyPlaying};
    newState.durationS = newState.durationS - 1;
    this.setState({currentTimeStamp: this.state.currentTimeStamp + 1, timeLeft: minutes +':' + seconds, currentlyPlaying: newState});
  }
  render() {
    const percentage = this.state.currentTimeStamp/(parseInt(this.state.currentlyPlaying.durationS));
    const queueItems = this.state.queue.map((song) => {
      <QueueItem song={song} />
    })
    console.log("queueItems", queueItems);
    return(
      <ScrollView style={{flex: 1}}>
          <View style={{flex: 1, marginTop:15, alignItems: 'center'}}>
            {this.state.currentlyPlaying.thumbnail ? <Image
              style={{width: 150, height: 150, borderRadius: 75}}
              source={{uri: this.state.currentlyPlaying.thumbnail}}
            /> :
            <Image
              style={{width: 150, height: 150, borderRadius: 75}}
              source={require('../assets/images/robot-dev.png')}
            /> }
            <View>
              <Text style={{color: 'white', fontSize: 20, textAlign:'center'}}>{this.state.currentlyPlaying.title} - {this.state.currentlyPlaying.artist}</Text>
              <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                <Progress.Bar progress={percentage} width={200} height={16} color="white" borderWidth={0} unfilledColor="grey" borderRadius={0} />
                <Text style={{color: 'white', marginLeft: 10}}>{this.state.timeLeft}</Text>
              </View>
            </View>
          </View>

        <View>
          {queueItems}
        </View>
      </ScrollView>
    )
  }
}
