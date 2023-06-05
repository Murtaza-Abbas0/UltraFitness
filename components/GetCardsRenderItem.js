import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DummyCard from "./DummyCard";
const GetCardsRenderItem = ({ item }) => {

    let expiryYear = String(item?.card?.exp_year)
    let expiryYearToRender = expiryYear.split(0, 3)

    // console.log(expiryYearToRender)

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log(item?.card?.last4)} >
                <DummyCard
                    name="John Doe"
                    number={item?.card?.last4}
                    expiry={`${item?.card?.exp_month}/${expiryYearToRender[1]}`}
                />
            </TouchableOpacity>
        </View>
    )
}

export default GetCardsRenderItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '2%'
    },
})