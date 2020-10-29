import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { homeData, searchMain } from '../search';

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const spaceSize = screenWidth * 0.05;
const tSize = screenWidth - spaceSize * 3;
const tileSize = tSize / numColumns;

const barHeight = StatusBar.currentHeight;

function HomeScreen({ navigation }) {
    return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Icon.Button name="bars" style={styles.menu} size={20} color="#000" 
                    backgroundColor="#00BFFF" onPress={() => { navigation.openDrawer(); searchMain()}}>
                </Icon.Button>
                <Text style={styles.logo}>LOGO</Text>
                <Icon.Button name="search" style={styles.search} size={20} color="#000" 
                    backgroundColor="#00BFFF" onPress={() => navigation.navigate('Pesquisa')}></Icon.Button>
            </View>
            <View style={styles.grid}>
                <FlatList 
                    numColumns={numColumns}
                    style={styles.list}
                    keyExtractor={(obj)=> obj.title}
                    data={homeData}
                    renderItem={({ item })=>(
                        <View style={styles.grup}>
                            <Image style={styles.image} source={{ uri: item.image }}/>
                            <Text style={styles.title}>{item.title.trim()}</Text>
                            <Text style={styles.price}>{item.price.trim()}</Text>
                            <Text style={styles.installment}>{item.installment.trim()}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: barHeight,
        flex: 1
    },
    header: {
        height: 50,
        backgroundColor: '#00BFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    menu: {
        marginLeft: 10
    },
    logo: {
    },
    search: {
        marginRight: 5
    },
    grid: {
        flex: 1
    },
    grup: {
        maxWidth: tileSize,
        marginTop: spaceSize/2,
        marginLeft: spaceSize,
        marginBottom: spaceSize/2,
        justifyContent: 'space-between'
        
    },
    image: {
        width: tileSize*0.90,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    title: {
        fontSize: 13,
        textAlign: 'center'
    },
    price: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    installment: {
        fontSize: 12,
        textAlign: 'center',
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 5

    },
    
  });

export default HomeScreen;