import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';
const io = require('socket.io-client');
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state ={
      socket: io(),
      server: '',
      previousPlayed: [],
      songs: [],
      usedAPI: 'spotify',
      token: ''
    }
    this.spotifySearch = this.spotifySearch.bind(this);
    this.soundcloudSearch = this.soundcloudSearch.bind(this);
    this.submitSongQueue = this.submitSongQueue.bind(this);

    fetch("https://rocky-brook-68243.herokuapp.com/discover")
    .then((response) => {

      response.body_Text = "10.2.106.91";
      console.log("response", response);
      if(response._bodyText) {
        this.setState({server: response._bodyText, socket: io('http://' + "10.2.106.91" +':8228')}, () => {
            this.state.socket.emit('CONNECT');
            this.state.socket.emit('RECEIVE_TOKEN');
            this.state.socket.on('SEND_APP_TOKEN', token => {
              console.log("TOKEN?", token);
              this.setState({token});
            })
        });
      }
    })
  }

  componentDidMount() {
    AsyncStorage.getItem('previousPlayed')
    .then((arrayList) => {
      console.log('arrayList', arrayList);
      if(arrayList) {
        arrayList = JSON.parse(arrayList);
        this.setState({previousPlayed: arrayList});
      }

    })
  }

  spotifySearch(term) {
    const query = encodeURIComponent(term);
    fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,artist&market=US', {
      headers: {
          "Authorization": "Bearer " + this.state.token
      }
    }).then((response) => response.json())
    .then((responseJSON) => {

        console.log("RESPNOSE", responseJSON);
        console.log("resp 2", responseJSON["tracks"].items[0].album);
        this.setState({songs: responseJSON["tracks"].items.slice(0,10), usedAPI: 'spotify'});
    })
  }

  soundcloudSearch(term) {
    const query = encodeURIComponent(term);
    fetch('https://api.soundcloud.com/tracks?client_id=309011f9713d22ace9b976909ed34a80&q=' + query)
    .then((response) => response.json())
    .then((responseJSON) => {
      // console.log("RESPONSE SOUNDCLOUD", responseJSON);
      this.setState({songs: responseJSON, usedAPI: 'soundcloud'});
    })
  }

  submitSongQueue(songObj) {
    this.state.socket.emit('ADD_SONG', songObj);
  }


  saveSongAsync(song) {
    console.log(song);
    AsyncStorage.getItem('previousPlayed')
    .then((arrayList) => {
      console.log('arrayList', arrayList);
      let newArrayList;
      if(arrayList) {
        arrayList = JSON.parse(arrayList);
        newArrayList = [...arrayList, song];
        console.log("newArrayList", newArrayList);
        AsyncStorage.setItem('previousPlayed', JSON.stringify(newArrayList));
      } else{
        AsyncStorage.setItem('previousPlayed', JSON.stringify([song]));
      }

    })

  }

  render() {
    console.log(this.state.previousPlayed);
    console.log(this.state.songs)
    return (
      <ScrollView style={styles.container}>
        <SearchBar soundcloudSearch={this.soundcloudSearch} spotifySearch={this.spotifySearch}/>
        {this.state.songs.length === 0 ? <SongList saveSongAsync={this.saveSongAsync} submitSongQueue={this.submitSongQueue} usedAPI="alreadyPlayed" songs={this.state.previousPlayed} /> : <SongList saveSongAsync={this.saveSongAsync} submitSongQueue={this.submitSongQueue} usedAPI={this.state.usedAPI} songs={this.state.songs} />}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#2980b9',
  },
});
