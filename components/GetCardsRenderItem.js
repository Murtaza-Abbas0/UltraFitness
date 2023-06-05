import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DummyCard from "./DummyCard";
const GetCardsRenderItem = ({ item }) => {

    return (
        <View style={styles.container}>
            <DummyCard
                name="John Doe"
                number="1234 5678 9012 3456"
                expiry="12/24"
            />
        </View>
    )
}

export default GetCardsRenderItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})