import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native'
import Colors from '../contants/color';
const header = props => (

    <View style={{
        ...styles.headerBase,
        ...Platform.select({
            ios: styles.headerIos,
            android: styles.headerAndroid
        })
    }}
    >
        <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
)

const styles = StyleSheet.create({
    headerBase: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIos: {
        backgroundColor: 'white',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    headerAndroid: {
        backgroundColor: Colors.primary
    },
    headerTitle: {
        color: Platform.OS === 'ios' ? 'black' : 'white',
        fontSize: 18
    }
})

export default header;