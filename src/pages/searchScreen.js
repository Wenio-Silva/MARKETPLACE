import React, {useState} from 'react';
import { FlatList, View, Text, Image, StyleSheet, Dimensions, StatusBar, TextInput } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { call } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import { searchData, handle } from '../search';

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const spaceSize = screenWidth * 0.05;
const tSize = screenWidth - spaceSize * 3;
const tileSize = tSize / numColumns;

const barHeight = StatusBar.currentHeight;

export function SearchScreen({ navigation }) {
    const [value, setValue] = useState(' ');
    const [refreshing, setRefresh] = useState(false);

    function handleRefresh() {
        setRefresh(true);
        // console.log("true");
        setTimeout(()=>{ setRefresh(false) }, 2000);
        // console.log("false");
    }

    function wayRefresh() {
        if(searchData.length==0){
            setTimeout(()=>{wayRefresh()}, 500);
        }else if(searchData.length>0){
            handleRefresh();
        }
    }

    return (
            <View style={styles.container}>
            <View style={styles.header}>
                <Icon.Button name="reply" style={styles.menu} size={20} color="#000" 
                    backgroundColor="#00BFFF" onPress={() => navigation.goBack()}>
                </Icon.Button>
                <TextInput
                    style={{ height: 20, width: 200, backgroundColor: '#FFF', borderRadius: 10 }}
                    onChangeText={(value) => setValue(value)}
                    placeholder={'  Pesquisar... '}
                />
                <Icon.Button name="search" style={styles.search} size={20} color="#000" 
                    backgroundColor="#00BFFF" onPress={() => { handle(value), wayRefresh()} }></Icon.Button>
            </View>
            <View style={styles.grid}>
                <FlatList 
                    numColumns={numColumns}
                    style={styles.list}
                    keyExtractor={(obj)=> obj.id}
                    data={searchData}
                    renderItem={({ item })=>(
                        <View style={styles.grup}>
                            <Image style={styles.image} source={{ uri: item.image }}/>
                            <Text style={styles.title}>{item.title.trim()}</Text>
                            <Text style={styles.price}>{item.price.trim()}</Text>
                            <Text style={styles.installment}>{item.installment.trim()}</Text>
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