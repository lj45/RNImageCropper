'use strict';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabMine from '../pages/tab_mine';
import TabHome from '../pages/tab_home';
import {Image} from 'react-native';

const iconDic = {
  Home_icon_Default: require('../images/tab_icons/home.png'),
  Home_icon_Selected: require('../images/tab_icons/home_select.png'),
  Mine_icon_Default: require('../images/tab_icons/mine.png'),
  Mine_icon_Selected: require('../images/tab_icons/mine_select.png'),
};

function Ionicons({name, focused, color, size}) {
  return (
    <Image
      style={{width: 20, height: 20}}
      source={iconDic[name + '_icon_' + (focused ? 'Selected' : 'Default')]}
    />
  );
}

const Tabs = ({darkMode}) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        tabBarInactiveTintColor: '#333',
        tabBarActiveTintColor: '#333',
        tabBarIcon: ({focused, color, size}) => (
          <Ionicons
            name={route.name}
            focused={focused}
            size={size}
            color={color}
          />
        ),
      })}>
      <Tab.Screen
        name={'Home'}
        component={TabHome}
        options={{
          title: '首页',
        }}
      />
      <Tab.Screen
        name={'Mine'}
        component={TabMine}
        options={{
          title: '我的',
          // header: () => <HeaderProfiles />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
