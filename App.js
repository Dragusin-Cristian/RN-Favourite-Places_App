import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen'; // npx expo install expo-splash-screen
import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import Map from './screens/Map';
import { init } from './util/database';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator()

export default function App() {

  const [dbInitialised, setDbInitialised] = useState()

  useEffect(() => {
    init().then(() => setDbInitialised(true)).catch(e => console.log(e))
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (!dbInitialised) {
      await SplashScreen.hideAsync();
    }
  }, [dbInitialised]);

  return (
    <>
      <StatusBar style={'dark'} />
      <NavigationContainer>
        <View
          style={{ flex: 1 }}
          onLayout={onLayoutRootView}
        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: Colors.primary500,
              },
              headerTintColor: Colors.gray700,
              contentStyle: {
                backgroundColor: Colors.gray700,
              },
              headerBackTitle: 'Back',
            }}
          >
            <Stack.Screen
              name='AllPlaces'
              component={AllPlaces}
              options={({ navigation }) => ({
                title: 'Your Favourite Places',
                headerRight: ({ tintColor }) => (
                  <IconButton
                    icon={'add'}
                    color={tintColor}
                    size={24}
                    onPress={() => navigation.navigate('AddPlace')}
                  />)
              })}
            />
            <Stack.Screen
              name='AddPlace'
              component={AddPlace}
              options={{
                title: 'Add a New Place'
              }}
            />
            <Stack.Screen
              name='Map'
              component={Map}
            />
            <Stack.Screen
              name='PlaceDetails'
              component={PlaceDetails}
              options={{
                title: 'Loading Place...'
              }}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer >
    </>
  );
}

