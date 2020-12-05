import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { Drawer } from 'react-native-paper';
import * as Linking from 'expo-linking';

class Anchor extends React.Component {
    _handlePress = () => {
      Linking.openURL(this.props.href);
      this.props.onPress && this.props.onPress();
    };
  
    render() {
      return (
        <Text {...this.props} onPress={this._handlePress}>
          {this.props.children}
        </Text>
      );
    }
}

export function DrawerContent({ navigation }) {
    return (
        <DrawerContentScrollView style={styles.all}>
            <View style={styles.header}>
                <Text style={styles.logo}>LOGO</Text>
            </View>
            <View style={styles.rotes}>
                <Drawer.Item
                    style={styles.items}
                    icon="home"
                    label="Início"
                    onPress={()=> navigation.navigate('Início') }
                />
                <Drawer.Item
                    style={styles.items}
                    icon="magnify"
                    label="Buscar"
                    onPress={()=> navigation.navigate('Pesquisa') }
                />
                <Drawer.Item
                    style={styles.items}
                    icon="thumb-up-outline"
                    label="Favoritos"
                    onPress={()=> navigation.navigate('Favoritos') }
                />
                <Drawer.Item
                    style={styles.items}
                    icon="clock-outline"
                    label="Histórico"
                    onPress={()=> navigation.navigate('Histórico') }
                />
            </View>
            <View style={styles.footer}>
                <View style={styles.fContent1}>
                    <Icon 
                        name="handshake-o"
                        size={20}
                    />
                    <Text style={styles.fText1}>Lojas Parceiras:</Text>
                </View>
                <View>
                <View style={styles.fContent2}>
                    <IconEntypo 
                        name="dot-single"
                        size={20}
                    />
                    <Anchor href="https://www.magazinevoce.com.br/magazinesrbarato/" style={styles.fText}>Magalu</Anchor>
                    </View>
                    <View style={styles.fContent2}>
                        <IconEntypo 
                            name="dot-single"
                            size={20}
                        />
                        <Anchor href="https://google.com" style={styles.fText}>Americanas</Anchor>
                    </View>
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    all:{
        flex: 1
    },
    header: {
        marginTop: 50,
        alignItems: 'center'
    },
    logo:{
        fontSize: 48
    },
    rotes: {
        marginTop: 10
    },
    items: {
        marginBottom: 30
    },
    footer: {
        marginTop: 20,
        marginBottom: 50,
        paddingLeft: 20
    },
    fContent1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    fContent2: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 80
    },
    fText1: {
        fontSize: 20,
        alignItems: 'center',
        marginLeft: 30
    },
    fText: {
        fontSize: 20,
        alignItems: 'center',
        color: '#004D6D'
    }
});