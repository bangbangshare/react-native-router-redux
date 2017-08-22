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
  tintColor: props.selected ? props.tabStyles.tint : '#a3a3a3',
  width: 30,
});

const middleImageStyle = props => ({
  height: 42,
  resizeMode: 'contain',
  tintColor: '#16bba2',
  width: 46,
});

const tabBarStyle = props => ({
  backgroundColor: '#fff',
  height:50,
});

const tabContainerStyle = props => ({
  alignItems: 'center',
  justifyContent: 'center',
  height:50,
});

const middleTabContainerStyle = props => ({
  alignItems: 'center',
  justifyContent: 'center',
  width:50,
  height:50,
  borderRadius:50,
  backgroundColor: props.selected ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,255.7)',
});

const textStyle = props => ({
  color: props.selected ? props.tabStyles.tint : '#a3a3a3',
  fontSize: 10,
  letterSpacing: 0.2,
  marginBottom: 2,
  marginTop: 0,
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

class MiddleTab extends Component {
  render() {
    const { name, tabItem } = this.props;

    return (
      <View name={name} style={middleTabContainerStyle(this.props)}>
        {tabItem.icon &&
          <Image
            source={tabItem.icon}
            style={middleImageStyle(this.props)}
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
      if(tab.middle){
        return (
          <MiddleTab
            key={tabName}
            name={tabName}
            tabItem={tabItem}
            tabStyles={this.props.tabStyles}
            />
        );
      }else{
        return (
          <TabBarIcon
            key={tabName}
            name={tabName}
            tabItem={tabItem}
            tabStyles={this.props.tabStyles}
            />
        );
      }
    });

    return (
      <Tabs
        activeOpacity={1.0}
        onSelect={onSelect(this.props)}
        selected={this.props.activeTab}
        style={tabBarStyle(this.props)}
        scrolling={this.props.scrolling}
        >
        {tabBarItems}
      </Tabs>
    );
  }
}
