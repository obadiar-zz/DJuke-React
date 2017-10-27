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
    let minutes = Math.floor(this.props.currentlyPlaying.durationS / 60);
    let seconds = Math.floor(this.props.currentlyPlaying.durationS - minutes * 60);
    this.state= {
      currentTimeStamp: 0,
      timeLeft: this.props.currentlyPlaying.duration,
      minutes,
      seconds
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.increment.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
  increment() {
    let minutes = this.state.minutes
    let seconds = this.state.seconds;
    let secondDisplay;
    if(seconds < 10){
      secondDisplay = seconds;
      if(seconds < 0) {
        minutes = minutes -1;
        seconds = 59;
        secondDisplay = seconds;
      }
      if(seconds > 0) {
        secondDisplay = '0' + seconds;
      }


    }

    seconds = seconds -1
    this.setState({currentTimeStamp: this.state.currentTimeStamp + 1, timeLeft: minutes +':' + seconds, minutes, seconds});
  }
  render() {
    const percentage = this.state.currentTimeStamp/(parseInt(this.props.currentlyPlaying.durationS));
    const queueItems = this.props.queue.map((song) => {
      return(
        <QueueItem submitAddBid={this.props.submitAddBid} submitUpvote={this.props.submitUpvote} song={song} />
      );
    });
    return(
      <View style={{marginBottom: 30}}>
          <View style={{marginTop:15, justifyContent: 'center', alignItems: 'center'}}>
            {this.props.currentlyPlaying.thumbnail ? <Image
              style={{width: 150, height: 150, borderRadius: 75}}
              source={{uri: this.props.currentlyPlaying.thumbnail}}
            /> :
            <Image
              style={{width: 150, height: 150, borderRadius: 75}}
              source={require('../assets/images/robot-dev.png')}
            /> }
            <View style={{ marginTop: 10, justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 20, textAlign:'center'}}>{this.props.currentlyPlaying.title} - {this.props.currentlyPlaying.artist}</Text>
              <View style={{ marginTop: 10, justifyContent: 'center'}}>
                <Progress.Bar progress={percentage} width={350} height={16} color="white" borderWidth={0} unfilledColor="grey" borderRadius={2} />
                <Text style={{color: 'white', marginLeft: 10, textAlign:'center', marginTop: 5}}>{this.state.timeLeft}</Text>
              </View>
            </View>
          </View>

        <View style={{marginTop: 30}}>
          {queueItems}
        </View>
      </View>
    )
  }
}
