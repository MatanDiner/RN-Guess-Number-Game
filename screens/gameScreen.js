import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import NumberContainer from '../components/numberContainer';
import Card from '../components/card';

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    if (rnd === exclude) {
        generateRandomNumber(min, max, exclude);
    }
    else {
        return rnd;
    }
}

const renderListItemFlatList = (listLength, itemData) => (
    <View style={styles.listItem}>
        <Text>#{listLength - itemData.index}</Text>
        <Text>{itemData.item}</Text>
    </View>
)

const renderListItem = (value, roundNumber) => (
    <View key={value} style={styles.listItem}>
        <Text>#{roundNumber}</Text>
        <Text>{value}</Text>
    </View>
)

const gameScreen = props => {
    const initialGuess = generateRandomNumber(1, 100, props.userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [detectiveDeviceWidth,setDetectiveDeviceWidth] = useState(Dimensions.get('window').width);
    const [detectiveDeviceHeight,setDetectiveDeviceHeight] = useState(Dimensions.get('window').height);
    const lowNumber = useRef(1);
    const highNumber = useRef(100);

    const { userNumber, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === props.userNumber) {
            props.onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(()=>{
        const updateLayout = () =>{
            setDetectiveDeviceWidth(Dimensions.get('window').width);
            setDetectiveDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change',updateLayout);
        return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
        } 
    })

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userNumber) ||
            (direction === 'greater' && currentGuess > props.userNumber)
        ) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
            return;
        }
        if (direction === 'lower') {
            highNumber.current = currentGuess;
        } else {
            lowNumber.current = currentGuess + 1;
        }
        const nextGuessNumber = generateRandomNumber(lowNumber.current, highNumber.current, currentGuess);
        setCurrentGuess(nextGuessNumber);
        setPastGuesses(currentPastGusses => [nextGuessNumber.toString(), ...currentPastGusses])
    }

    let listContainerStyle = styles.listContainer;
    if (detectiveDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if (detectiveDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.controls}>
                    <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
                </View>
                <View style={listContainerStyle}>
                    {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess,pastGuesses.length - index))}
                    </ScrollView> */}

                    <FlatList keyExtractor={(item, index) => item}
                        data={pastGuesses}
                        renderItem={renderListItemFlatList.bind(this, pastGuesses.length)}
                        contentContainerStyle={styles.list}
                    />

                </View>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.ButtonsContainer}>
                <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
                <Button title='GREATER' onPress={nextGuessHandler.bind(this, 'greater')} />
            </Card>
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess,pastGuesses.length - index))}
                    </ScrollView> */}

                <FlatList keyExtractor={(item, index) => item}
                    data={pastGuesses}
                    renderItem={renderListItemFlatList.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    ButtonsContainer: {
        flexDirection: 'row',
        width: 300,
        maxWidth: '80%',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5
    },
    controls:{
        flexDirection:'row',
        justifyContent:'space-around',
        width:'80%',
        alignItems:'center'
    },
    listContainer: {
        flex: 1,
        width: '60%'
    },
    listContainerBig: {
        flex: 1,
        width: '80%'
    },
    list: {
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    listItem: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        marginVertical: 10,
        padding: 15,
        justifyContent: 'space-between'
    }
})


export default gameScreen;