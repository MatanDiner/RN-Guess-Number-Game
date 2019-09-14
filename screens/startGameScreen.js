import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import Card from '../components/card';
import Colors from '../contants/color';
import Input from '../components/input';
import NumberContainer from '../components/numberContainer';

const startGameScreen = props => {

    const [inputValue, setInputValue] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth,setButtonWidth] = useState(Dimensions.get('window').width / 4);

    const numberInputHandler = value => {
        setInputValue(value.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () => {
        setInputValue('');
        setIsConfirmed(false);
    }

    useEffect(()=>{
        const updateLayout = () =>{
            setButtonWidth(Dimensions.get('window').width / 4);
         }
     
         Dimensions.addEventListener('change',updateLayout);

         return ()=>{
            Dimensions.removeEventListener('change',updateLayout);
         }
    })

    const confirmedInputHandler = value => {
        const chosenNumber = parseInt(inputValue);
        if (isNaN(chosenNumber) || chosenNumber < 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number!", "number has to be a number between 1 to 99.",
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        setIsConfirmed(true);
        setInputValue('');
        setSelectedNumber(chosenNumber);
        Keyboard.dismiss();
    }

    let confirmOutPut;
    if (isConfirmed) {
        confirmOutPut = <Card style={styles.summaryContainer}>
            <Text>Selected Number</Text>
            <NumberContainer>{selectedNumber}</NumberContainer>
            <Button title='START GAME' onPress={props.onSelectedNumber.bind(this, selectedNumber)} />
        </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                            <Text>Select a Number</Text>
                            <Input style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={inputValue}
                            />
                            <View style={styles.buttonsContainer}>
                                <View style={{width:buttonWidth}}>
                                    <Button title='Reset'
                                        color={Colors.accent}
                                        onPress={resetInputHandler}
                                    />
                                </View>
                                <View style={{width:buttonWidth}}>
                                    <Button title='Confirm'
                                        color={Colors.primary}
                                        onPress={confirmedInputHandler}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmOutPut}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
        //  maxWidth: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    Button: {
        //width: '40%',
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default startGameScreen;