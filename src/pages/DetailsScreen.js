import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, StatusBar, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { detailsDataMean } from '../searchs/srcDetails';

const barHeight = StatusBar.currentHeight;
const screenWidth = Dimensions.get("window").width;

export function DetailsScreen({ navigation }) {
    //Algorithm for remount the screen content
    const [remount, setRefresh] = React.useState(1);
    let n = 1;

    function forceRefresh() {
        n++;
        setRefresh(n);
    }
    function WayRefresh() {
        if(detailsDataMean[0].title=="******************") {
            setTimeout(()=>{forceRefresh(); WayRefresh()}, 2000);
        }
    }
    //Event listener to know when this screen is iniciated
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            WayRefresh()
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity  style={styles.menu}   
                    onPress={() => navigation.goBack()}>
                        <Icon name="reply" size={20} color="#000" />
                </TouchableOpacity>
                <Text style={styles.logo} >LOGO</Text>
                <TouchableOpacity  style={styles.search} 
                    onPress={() => navigation.navigate('Pesquisa') }>
                        <Icon name="heart-o" size={22} color="#000" />
                </TouchableOpacity>
            </View>
            <View style={styles.MeanContent}>
                <Text style={styles.title}>{detailsDataMean[0].title.trim()}</Text>
                <Image style={styles.imgMean} source={{ uri: detailsDataMean[0].imgMean }} />
            </View>
            <View style={styles.prices}>
                <Text style={styles.priceBefore}>{detailsDataMean[0].priceBefore.trim()}</Text>
                <Text style={styles.priceNow}>{detailsDataMean[0].priceNow.trim()}</Text>
            </View>
            <View style={styles.firstInfo}>
                <Text style={styles.titleDescription}>Descrição</Text>
                <Text style={styles.description}>{detailsDataMean[0].description.trim()}</Text>
            </View>          
        </ScrollView>
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
    MeanContent: {
        marginTop: barHeight/2,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
    },
    imgMean: {
        width: screenWidth-30,
        aspectRatio: 1
    },
    prices: {
        marginTop: barHeight/2,
        marginLeft: screenWidth/6
    },
    priceBefore: {
        fontSize: 15,
        color: "#aaa"
    },
    priceNow: {
        fontSize: 20
    },
    firstInfo: {
        marginTop: barHeight/2
    },
    titleDescription: {
        fontSize: 17,
        textAlign: 'center'
    },
    description: {
        marginLeft: screenWidth/18,
        marginRight: screenWidth/18,
        textAlign: "justify"
    }
});