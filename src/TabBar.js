import React, { Component } from 'react';
import Tabs from 'react-native-tabs';
import { Image, StyleSheet, Text, View } from 'react-native';

const onSelect = props => el => {
  props.actions.changeTab({
    from: props.activeTab,
    name: el.props.name,
    navigator: props.navigator,
  });

  return {
    selectionColor: props.tabStyles.tint || '#037AFF',
  };
};

const imageStyle = props => ({
  height: 25,
  resizeMode: 'contain',
  tintColor: '#fff',
  width: 30,
});

const tabBarStyle = props => ({
  backgroundColor: 'transparent',
  height:80
});

const tabContainerStyle = props => ({
  alignItems: 'center',
  justifyContent: 'center',
  width:50,
  height:50,
  borderRadius:50,
  backgroundColor: props.selected ? 'rgba(0,173,238,0.7)' : 'rgba(0,0,0,0.7)',
  transform: props.selected ? [{scale:1}] : [{scale:0.7}],
  elevation: 20,
  shadowOffset: {width: 0, height: 0},
  shadowColor: 'black',
  shadowOpacity: 1,
  shadowRadius: 10,
});

const textStyle = props => ({
  color: '#fff',
  fontSize: 10,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 4,
});

class TabBarIcon extends Component {
  render() {
    const { name, tabItem } = this.props;

    return (
      <View name={name} style={tabContainerStyle(this.props)}>
        {tabItem.icon &&
          <Image
            source={tabItem.icon}
            style={imageStyle(this.props)}
            />
        }
        {tabItem.title &&
          <Text style={textStyle(this.props)}>{tabItem.title}</Text>
        }
      </View>
    );
  }
}

export default class TabBar extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    const { tabs } = this.props;

    const tabBarItems = Object.keys(tabs).map(tabName => {
      const tab = tabs[tabName];
      const tabItem = tab.tabItem || {};

      return (
        <TabBarIcon
          key={tabName}
          name={tabName}
          tabItem={tabItem}
          tabStyles={this.props.tabStyles}
          />
      );
    });

    return (
      <Tabs
        activeOpacity={1.0}
        onSelect={onSelect(this.props)}
        selected={this.props.activeTab}
        style={tabBarStyle(this.props)}
        >
        {tabBarItems}
      </Tabs>
    );
  }
}
