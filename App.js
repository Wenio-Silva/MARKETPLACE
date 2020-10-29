import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {MyStack, MyDrawer} from './src/routes';

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>,
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}