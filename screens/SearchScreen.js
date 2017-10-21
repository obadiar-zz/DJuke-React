import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
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
    fetch("https://rocky-brook-68243.herokuapp.com/discover")
    .then((response) => {
      console.log("response", response);
      if(response._bodyText) {
        this.setState({server: response._bodyText, socket: io('http://' + response._bodyText +':8228')}, () => {
            this.state.socket.emit('CONNECT');
        });
      }
    })
  }
  spotifySearch(term) {
    const query = encodeURIComponent(term);
    fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,artist&market=US', {
      headers: {
          "Authorization": "Bearer BQDsQEto9m7uKKoawN3_aTZEvw2Qdb1FKPPdjPEfRQ7skyLiLPQvQNVH_hgkdEIUpBSnxLe-R1QHNdop7e8A_XgHNMnMNvdbTy3zssisBXybe-WJBcE9okOsn21_VHOcvqrh56iljVBry6swvx2S70bX-p01TAEo1PUBlF-tvnq2E71GOKQVXOjHFVs7ae8f9IJjQaxpyUu_koe3E4FvcGgRLE2oz8XT2cCmA0doEk3I6Op1ZHlbm9qDHedE-tY3qSUC98Isvgx5EBZUQHMIOOSlNv0loEczjaHbki8pUW6oeoVcps3ZVv6-UNjJlW-3N4F6oD6YbM57laKUMun6HEA6gg"
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
      console.log("RESPONSE SOUNDCLOUD", responseJSON);
      this.setState({songs: responseJSON, usedAPI: 'soundcloud'});
    })
  }

  submitSongQueue(songObj) {
    this.state.socket.emit('ADD_SONG', songObj);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar soundcloudSearch={this.soundcloudSearch} spotifySearch={this.spotifySearch}/>
        <SongList submitSongQueue={this.submitSongQueue} usedAPI={this.state.usedAPI} songs={this.state.songs} />
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
