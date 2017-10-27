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
  AsyncStorage
} from 'react-native';
import AddQueueItem from './AddQueueItem';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';

const SongList = ({songs, usedAPI, submitSongQueue, saveSongAsync}) => {
  const songItems = songs.map((song) => {
    if(usedAPI === 'spotify') {
      return (
        <AddQueueItem saveSongAsync={saveSongAsync} usedAPI={usedAPI} submitSongQueue={submitSongQueue} songImage={song.album.images[0].url} artist={song.artists.map(x => x.name).join(", ")} title={song.name} duration={song.duration_ms} id={song.id}/>
      )
    }
    if(usedAPI === 'soundcloud') {
      return (
        <AddQueueItem saveSongAsync={saveSongAsync} usedAPI={usedAPI} submitSongQueue={submitSongQueue} songImage={song.artwork_url} artist={song.user.username} title={song.title} duration={song.duration} id={song.id}/>
      )
    }
    if(usedAPI ==='alreadyPlayed') {
      return (
        <AddQueueItem saveSongAsync={saveSongAsync} showAlreadyPlayed ={true} submitSongQueue={submitSongQueue} songImage={song.songImage} artist={song.artist} title={song.title} duration={song.duration} id={song.id} />
      )
    }

  });



  return(

    <View style={{padding: 15}}>
      {usedAPI === 'alreadyPlayed' ? <View><Text style={{color: '#ecf0f1', marginTop: 20, fontSize: 14, fontWeight: 'bold'}}>Below is a list of your previously playedSongs</Text></View> : <View><Text style={{fontSize: 14, color: '#ecf0f1'}}> Choose a song below to put into your DJuke queue </Text></View>}
      {songItems}
    </View>

  )
};

export default SongList;
