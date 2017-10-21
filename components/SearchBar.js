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

import Colors from '../constants/Colors';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';



export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usedAPI: 'spotify',
      term: '',
      openDropDown: false
    }
  }



  render() {
    return(
      <View style={{padding: 5}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          {this.state.usedAPI==='spotify' ?
            <View>
            <TouchableOpacity onPress={() => this.state.openDropDown ? this.setState({openDropDown: false}) : this.setState({openDropDown: true})} style={{marginTop: 20, padding: 10, marginRight: 7, backgroundColor: 'black', height: 40, borderRadius: 10}}><View style={{flex: 1, flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
            <MaterialCommunityIcons
              name="spotify"
              size={28}
              color="#1db954"
            /><Text style={{color: 'white'}}> Spotify</Text></View></TouchableOpacity></View> : <View><TouchableOpacity onPress={() => this.state.openDropDown ? this.setState({openDropDown: false}) : this.setState({openDropDown: true})} style={{marginTop: 20, padding: 10, marginRight: 7, backgroundColor: 'white', height: 40, borderRadius: 10}}><View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}><MaterialCommunityIcons
              name="youtube-play"
              size={28}
              color="red"
            /><Text> Youtube</Text></View></TouchableOpacity></View>
          }
          <TextInput
            style={{height: 40, paddingLeft: 10,fontSize: 15, borderColor: 'white', borderWidth: 1, borderRadius: 30,backgroundColor: 'white', marginTop: 20, flex: 2}}
            onChangeText={(term) => {this.setState({term}}; this.props.spotifySearch(term))}
            value={this.state.term}
            placeholder= "Search for a song to queue..."
          />
        </View>
        <View>
          {this.state.openDropDown ? <View style={{backgroundColor: 'white', flex: 1, marginTop: 10, padding: 10, width: 150, borderRadius: 10}}>
          {this.state.usedAPI === "spotify" ? <View><TouchableOpacity onPress={() => this.setState({usedAPI: 'spotify', openDropDown: false})}><View style={{flexDirection: 'row'}}><Octicons name="check" color="#2980b9" /><Text> Spotify </Text></View></TouchableOpacity><TouchableOpacity style={{marginTop: 15}} onPress={() => this.setState({usedAPI: 'youtube', openDropDown: false})}><View style={{flexDirection: 1}}><Octicons name="check" color="white" /><Text style={{marginLeft:10}}>Youtube</Text></View></TouchableOpacity></View>
            :  <View><TouchableOpacity onPress={() => this.setState({usedAPI: 'spotify', openDropDown: false})}><View style={{flexDirection: 'row'}}><Octicons name="check" color="white" /><Text>Spotify</Text></View></TouchableOpacity><TouchableOpacity style={{marginTop: 15}} onPress={() => this.setState({usedAPI: 'youtube', openDropDown: false})}><View style={{flexDirection: 'row'}}><Octicons name="check" color="#2980b9" /><Text>Youtube</Text></View></TouchableOpacity></View>}</View> : <View><Text></Text></View> }

        </View>
      </View>
    )
  }
}
