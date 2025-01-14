import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './src/screens/AuthScreen';
import PostFeed from './src/screens/PostFeed';
import SignupScreen from './src/screens/Signup';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Posts" component={PostFeed} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
