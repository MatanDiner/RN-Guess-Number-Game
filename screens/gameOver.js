import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const gameOver = props => (
    <View style={styles.screen}>

        <Text>Game Over!</Text>
        <Text>Number of rounds : {props.roundsNumber}</Text>
        <Text>Number was : {props.userNumber}</Text>
        <Button title="NEW GAME" onPress={props.onNewGame} />
    </View>
)

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:10
    }
})

export default gameOver;