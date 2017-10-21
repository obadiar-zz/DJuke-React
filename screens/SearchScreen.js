import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SearchBar from '../components/SearchBar';
export default class SearchScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state ={
      server: '',
      previousPlayed: [],
      songs: []
    }
    this.spotifySearch = this.spotifySearch.bind(this);
  }
  spotifySearch(term) {
    const query = encodeURIComponent(term);
    fetch('https://api.spotify.com/v1/search?q=' + query, {
      headers: {
          "Authorization": "Bearer BQDs8qKOf5LMqYjekVudqB9GrbJPoWXqo5iFpb92QLt8-7S_f1jzkxlRhEBoKPux939PbygKP_6RKj4jt1QHrnWI2u74tqUUtoH18A6dqY3PJFsb4UkyLXYiLja40WEz5gEiJ79aZhcwbqh3nb0zlAU9N4ijB0vbRqLfGYAgp8cBmDc5bJPDHeimVtWGCQ8ckjQVE-rbfpI5kQ2gHl9QUFFVd1F4SIO5UHVBeDFlpB4hceP_CmxZTLQ155VsU_jsaF6T5h8IT3GcbwqTRslZU1Wdc7T7Y4aiDyKKbLgDY-_M6FesWGCiMvNHWt1SnfUGIOUzACtWlOKiN7aXwSgWa1AAxQ"
      }
    }).then((response) => response.json())
    .then((responseJSON) => {
        console.log("RESPNOSE", responseJSON);
    })
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <SearchBar spotifySearch={this.spotifySearch}/>
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
