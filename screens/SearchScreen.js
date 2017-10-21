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
          "Authorization": "Bearer BQBjjbs39kill1ROio_-1vmFdJmXs55yOsWF6-xp0iQDBwh7WLse74C9HdXHaqXTA_5zMoGkZam1NdfXPcqcRL-f1JGGSNgVVJPBCZuY_C5UhgDBN8AK6VvxljLtuwi-Xlwk1YHJlIaL_dZpgA0ivjnMFeA177B_TosCxbOGME2VYr-K5EdT47PPGpUE4q5i0JXVBy5wTqOkY7Tmz7H9irtRSkAaNsZeoU2FeGXNunIHiS8sVlqmHEATf_fMO-aFY3vJLK0MVuCNGFf4F-PB4PGZdVGNbW3LXqDKLDjElcYdrR0XQHP2gM8zrdtW7qu5e3zbR5rui7gT0EoB46LA-HZpOA"
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


  // saveSongAsync(song) {
  //   AsyncStorage.getItem('previousPlayed')
  //   .then((arrayList) => {
  //     const newArrayList = [...arrayList, song];
  //     AsyncStorage.setItem('previousPlayed', JSON.stringify(newArrayList));
  //   })
  //
  // }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar soundcloudSearch={this.soundcloudSearch} spotifySearch={this.spotifySearch}/>
        <SongList  submitSongQueue={this.submitSongQueue} usedAPI={this.state.usedAPI} songs={this.state.songs} />
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
