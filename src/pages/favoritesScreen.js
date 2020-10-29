import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function FavoriteScreen() {
    return (
        <View style={styles.container}>
            <Text>Favoritos</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default FavoriteScreen;