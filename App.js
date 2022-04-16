/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/routers/Tabs";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      {/*<Stack.Navigator initialRouteName="Guid">*/}
      <Stack.Navigator
        initialRouteName="Tabs"
        // screenOptions={{
        //   headerLeft: props => <NavigationBackView {...props} />,
        // }}
      >
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={Tabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
