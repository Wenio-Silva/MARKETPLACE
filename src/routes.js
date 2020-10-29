import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
//Pages
import HomeScreen from './pages/homeScreen';
import SearchScreen from './pages/searchScreen';
import FavoritesScreen from './pages/favoritesScreen';
import HistoryScreen from './pages/historyScreen';
//Menu Drawer
import { DrawerContent } from './pages/DrawerContent';

//Stacked main pages
const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Início" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Início" component={HomeScreen} />
      <Stack.Screen name="Pesquisa" component={SearchScreen} />
    </Stack.Navigator>
  );
}
//Menu navigation secundary pages
const Drawer = createDrawerNavigator();

export function MyDrawer() {
    return (
        <Drawer.Navigator drawerStyle={{
			backgroundColor: '#CBE6EF', opacity: 0.95}} drawerContent={props => <DrawerContent {...props} />} >
            <Drawer.Screen name="Início" component={HomeScreen} />
            <Drawer.Screen name="Pesquisa" component={SearchScreen} />
            <Drawer.Screen name="Favoritos" component={FavoritesScreen} />
            <Drawer.Screen name="Histórico" component={HistoryScreen} />
        </Drawer.Navigator>
    );
}