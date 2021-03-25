import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/pages/Register'
import Login from './src/pages/Login'
import Home from './src/pages/Home'
import ForgotPassword from './src/pages/ForgotPassword'
import AllMusics from './src/pages/AllMusics'
import Playlists from './src/pages/Playlists'
import Artists from './src/pages/Artists'
import PlaylistDescription from './src/pages/PlaylistDescription'
import CreatePlaylist from './src/pages/CreatePlaylist'
import AddMusicsPlaylist from './src/pages/AddMusicsPlaylist'
import AddMusics from './src/pages/AddMusics'
import AddMusicsDescription from './src/pages/AddMusicsDescription'
import ResetPassword from './src/pages/ResetPassword'

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="AllMusics" component={AllMusics}/>
        <Stack.Screen name="Playlists" component={Playlists}/>
        <Stack.Screen name="Artists" component={Artists}/>
        <Stack.Screen name="PlaylistDescription" component={PlaylistDescription}/>
        <Stack.Screen name="CreatePlaylist" component={CreatePlaylist}/>
        <Stack.Screen name="AddMusicsPlaylist" component={AddMusicsPlaylist}/>
        <Stack.Screen name="AddMusics" component={AddMusics}/>
        <Stack.Screen name="AddMusicsDescription" component={AddMusicsDescription}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}