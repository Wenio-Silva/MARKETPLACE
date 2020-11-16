import React, { useState } from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, StatusBar, TouchableHighlight, TouchableOpacity } from 'react-native';
import { set } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { homeData } from '../searchs/srcHome';
import { searchDetailsMean } from '../searchs/srcDetails';

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const spaceSize = screenWidth * 0.05;
const tSize = screenWidth - spaceSize * 3;
const tileSize = tSize / numColumns;

const barHeight = StatusBar.currentHeight;

export function HomeScreen({ navigation }) {
    const [refreshing, setRefresh] = useState(false);

    function handleRefresh() {
        setRefresh(true);
        setTimeout(()=>{ setRefresh(false) }, 2000);
    }

    function wayRefresh() {
        if(homeData.length==0){
            setTimeout(()=>{wayRefresh()}, 500);
        }else if(homeData.length>0){
            handleRefresh();
        }
    }
    if(homeData.length==0){
        wayRefresh();
    }

    return (
            <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu} 
                    onPress={() => { navigation.openDrawer() }}>
                        <Icon name="bars" size={20} color="#000"/>
                </TouchableOpacity>
                <Text style={styles.logo} >LOGO</Text>
                <TouchableOpacity  style={styles.search}   
                    onPress={() => navigation.navigate('Pesquisa')}>
                        <Icon name="search" size={20} color="#000" />
                    </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                <FlatList 
                    numColumns={numColumns}
                    style={styles.list}
                    keyExtractor={(obj)=> obj.id}
                    data={homeData}
                    renderItem={({ item })=>(
                            <View style={styles.grup} >
                                <TouchableHighlight onPress={() => { searchDetailsMean(item.link), navigation.navigate('Detalhes') }} 
                                    underlayColor="skyblue" style={{ paddingTop: 5 }}>
                                    <View>
                                        <Image style={styles.image} source={{ uri: item.image }} />
                                        <Text style={styles.title}>{item.title.trim()}</Text>
                                        <Text style={styles.price}>{item.price.trim()}</Text>
                                        <Text style={styles.installment}>{item.installment.trim()}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                    )}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
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
        marginLeft: 20
    },
    logo: {
    },
    search: {
        marginRight: 20
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