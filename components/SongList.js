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
import AddQueueItem from './AddQueueItem';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

const SongList = ({songs, usedAPI, submitSongQueue}) => {
  const songItems = songs.map((song) => {
    if(usedAPI === 'spotify') {
      return (
        <AddQueueItem usedAPI={usedAPI} submitSongQueue={submitSongQueue} songImage={song.album.images[0].url} artist={song.artists.map(x => x.name).join(", ")} title={song.name} duration={song.duration_ms} id={song.id}/>
      )
    }
    if(usedAPI === 'soundcloud') {
      return (
        <AddQueueItem usedAPI={usedAPI} submitSongQueue={submitSongQueue} songImage={song.artwork_url} artist={song.user.username} title={song.title} duration={song.duration} id={song.id}/>
      )
    }

  })
  return(
    <View style={{padding: 15}}>
      <Text style={{fontSize: 14, color: '#ecf0f1'}}> Choose a song below to put into your DJuke queue </Text>
      {songItems}
    </View>

  )
};

export default SongList;
