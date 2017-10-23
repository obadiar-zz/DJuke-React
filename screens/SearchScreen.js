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
      usedAPI: 'spotify'
    }
    this.spotifySearch = this.spotifySearch.bind(this);
    this.soundcloudSearch = this.soundcloudSearch.bind(this);
    this.submitSongQueue = this.submitSongQueue.bind(this);
    console.log("thisprops", props);
    fetch("https://rocky-brook-68243.herokuapp.com/discover")
    .then((response) => {

      response.body_Text = "172.16.1.46";
      console.log("response", this.state);
      if(response._bodyText) {
        this.setState({server: response._bodyText, socket: io('http://' + response.body_Text +':8228')}, () => {
            this.state.socket.emit('CONNECT');
        });
      }
    })
  }

  componentDidMount() {
    console.log("WHAT");
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
          "Authorization": "Bearer BQB-skZCSTcDmV6NvBVb0Po7U5B2P1koYPZGe734mKc8L2cX0_fHl8l2rrJ6PN09U2zEY9HqeXwk5fVekBXfSyHVpZqay_rdwrBlHN3UDIpRxy3R2R3A3lVGc3kgyQvTir6R6RCyUBadzZLB_LPqHDmgJKC-eEJIl5UQFsqljxIoAtl6RTpvQSlDwEp4gHUx69wn_tAjdYIRh9334vsNOdWgWO_cyQd_5yKpZKwrhSf7z3Vcx5utmnx8sDaR5QLTXQPnDDeB2V3ENjcl88gevHGQJJ2YVl0ZbFjYmWGlRAwlquiq6VdnC4Xk3iRM4bLmcyp5JxwZ5sSDSBUiY9t8GGOZWQ"
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
