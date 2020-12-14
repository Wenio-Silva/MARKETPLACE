import * as React from 'react';
import { WebView } from 'react-native-webview';
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const barHeight = StatusBar.currentHeight;

// Receice the product link
let link = "";
export function handlerURI(l) {
    link="";
    link = l;
}

export function DetailsScreen({ navigation }) {
    //here are handling the state to reload this screen
    const [UsersEyes, setEye] = React.useState(false);
    function handlerEyes() {
        setEye(true);
        setTimeout(()=>{setEye(false)}, 500);
    }

    // function renderLoading
    const [loading, setLoading] = React.useState(false);
    function RenderLoading() {
        if(loading==false) {
            return (
                <View style={{ height: 0 }}></View>
            )
        }else{
            return (
                <View style={{ height: 50, paddingTop: 10, backgroundColor: '#fff'}}>
                    <ActivityIndicator size="large" color="#555" />
                </View>
            )
        }
    }
    //Event listener to know when this screen is iniciated
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(link);
            handlerEyes();
            setLoading(true);
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    return (
        <View style={{ flex: 1}}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.menu} 
                    onPress={() => { navigation.goBack() }}>
                        <Icon name="reply" size={20} color="#000"/>
                </TouchableOpacity>
                <Text style={styles.logo} >LOGO</Text>
                <TouchableOpacity  style={styles.search}   
                    onPress={()=>{ }}>
                        <Icon name="heart-o" size={22} color="#000" />
                </TouchableOpacity>
            </View>
            <RenderLoading />
            <WebView
                source={{ uri: link }}
                style={styles.WebView}
                // onLoadStart={()=>{}
                onLoadEnd={()=>{setLoading(false)}}
            />
      </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginTop: barHeight,
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
    WebView: {
        // marginTop: barHeight + 50
    }
});