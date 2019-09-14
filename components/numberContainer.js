import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Colors from '../contants/color';
const numberContaiiner = props =>(
    <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
    </View>
)

const styles = StyleSheet.create({
container:{
    borderWidth:2,
    borderColor:Colors.accent,
    padding:10,
    borderRadius:10,
    marginVertical:10,
    justifyContent:'center',
    alignItems:'center'
},
number:{
    color:Colors.accent,
    fontSize:22,
    textAlign:'center'
}
})

export default numberContaiiner;
