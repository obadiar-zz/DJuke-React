import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import QueueList from '../components/QueueList';
import { MonoText } from '../components/StyledText';
const io = require('socket.io-client');
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props){
    super(props);
    this.state = {
      server: '',
      queue: [],
      socket: io(),
      currentlyPlaying: false
    }
    this.submitUpvote = this.submitUpvote.bind(this);
    this.submitAddBid = this.submitAddBid.bind(this);
    fetch("https://rocky-brook-68243.herokuapp.com/discover")
    .then((response) => {
      console.log("response", response);
      if(response._bodyText) {
        this.setState({server: response._bodyText, socket: io('http://' + response._bodyText +':8228')}, () => {
            this.state.socket.emit('CONNECT');
            this.state.socket.on('QUEUE_UPDATED', (data) => {
              console.log("all data", data);
              this.setState({currentlyPlaying: data.list[data.list.length - 1], queue: data.list});

            })
        });
      }
    })
  }

  submitUpvote(id) {
    this.state.socket.emit('UPVOTE_SONG', {id})
  }

  submitAddBid(amount, id) {
    this.state.socket.emit('PAY_SONG', {amount, id})
  }
  render() {
    console.log("RERENDER", this.state);
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image

              source={
                __DEV__
                  ? require('../assets/images/djuke-logo.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this.state.server ? this.state.currentlyPlaying ? <QueueList submitAddBid={this.submitAddBid} submitUpvote={this.submitUpvote} currentlyPlaying={this.state.currentlyPlaying} queue={this.state.queue}/> : <Text style={styles.getStartedText}> You have connected to a DJuke! The playlist is empty so add to it to start the fun. </Text> : <Text style={{marginTop: 20, color: 'white'}}> Connecting... </Text>}



          </View>


        </ScrollView>


      </View>
    );
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2980b9',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    marginTop: -30
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'center',
    marginTop: -30
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
