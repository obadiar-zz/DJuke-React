import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SearchBar from '../components/SearchBar';
import SongList from '../components/SongList';

export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state ={
      server: '',
      previousPlayed: [],
      songs: [],
      usedAPI: 'spotify'
    }
    this.spotifySearch = this.spotifySearch.bind(this);
    this.soundcloudSearch = this.soundcloudSearch.bind(this);
  }
  spotifySearch(term) {
    const query = encodeURIComponent(term);
    fetch('https://api.spotify.com/v1/search?q=' + query + '&type=track,artist&market=US', {
      headers: {
          "Authorization": "Bearer BQBR8JyENEwbTgHJi8Y9jkbOLwWlowHZCcPfOSCcF-dNEehfbwnOfmGkAOzjQn_icgGoXa4Pox1K_iHxrOcM_LtkwWFu9ELBKg9d_xZDnzLtAb9RwCt3o98ZhRxVxLZnr5H8fY3ID96yOi8W0gnnxxvn2F_MnT1nJor75BNb3kXY2--QA4snlHPDLbhO-FNrzXRGAV13VcAdehV4_bQdaurvXDRCh0gR8hSF7Tmd_yuoMDZiLxIaXvIDHM-CAQyYJ_EJWsCMgZGCWkU5KdKVytBeEc2Ud3apV4xhyYDzWJPl5tkJN63Dx4JLVeHTCZpBteFFJtbRSDN6LMDwMVAKBHtyKg"
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar soundcloudSearch={this.soundcloudSearch} spotifySearch={this.spotifySearch}/>
        <SongList usedAPI={this.state.usedAPI} songs={this.state.songs} />
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
