import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CardField, useStripe, } from '@stripe/stripe-react-native';
import { useNavigation } from "@react-navigation/native";
import { Checkbox, FAB, TouchableRipple } from 'react-native-paper';
import { Colors } from '../assets/constants/Colors';
import { WIDTH } from '../assets/constants/Dimensions';
import { Fonts } from '../assets/constants/Fonts';
import { attachCard } from "../https";

const HeaderComponent = ({ navigation, hedtext }) => {
    return (
        <View style={[styles.headerContainer, {}]}>
            <FAB
                style={[
                    styles.btn,
                    {
                        height: WIDTH < 375 ? 40 : 55,
                        width: WIDTH < 375 ? 40 : 55,
                    },
                ]}
                size="small"
                icon="arrow-left"
                color={Colors.tertiary}
                onPress={() => navigation.goBack()}
            />

            <Text style={styles.headertex}>Cards</Text>
            <Text style={{ opacity: 0 }} >heyyy</Text>
        </View>
    );
};

let pmId = ''
const AddCardsScreen = () => {

    const navigation = useNavigation();

    const [cardDetails, setCardDetails] = useState('')

    const stripe = useStripe();

    const attachCardToServer = async() => {

       await createPaymentIntent()

        const data = { "pmId": pmId }

        attachCard(data, {}, (response) => {
            console.log('response: ', response?.data)
        })
    }

    const createPaymentIntent = async () => {
        console.log('cardDetails: ', cardDetails)
        // return
        try {
            await stripe
                .createPaymentMethod({
                    type: 'card',
                    card: {
                        number: cardDetails?.last4,
                        exp_month: cardDetails?.expiryMonth,
                        exp_year: cardDetails?.expiryYear,
                        cvc: cardDetails?.validCVC,
                    },
                    billing_details: {
                        name: 'Murtaza Rizvi',
                    },
                    paymentMethodType: 'Card'
                })
                .then(function (result) {
                    console.log('result: ', result)
                    pmId = result?.paymentMethod?.id
                    
                });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer} >
            <HeaderComponent hedtext={'Attach Card'} navigation={navigation} />
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                onCardChange={(cardDetails) => {
                    // console.log('cardDetails', cardDetails);
                    setCardDetails(cardDetails)
                    // onCardDetailsChange(cardDetails)
                }}
                style={styles.cardField}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
            />
            <TouchableOpacity onPress={() => {
                attachCardToServer()
            }} >
                <Text>Add Card</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default AddCardsScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor:'pink'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: wp('5%')
    },
    btn: {
        height: 50,
        width: 50,
        borderRadius: 10,
        // marginLeft: 20,
        // marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        shadowColor: Colors.tertiary,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    headertex: {
        fontSize: 22,
        color: Colors.tertiary,
        fontFamily: Fonts.default,
        fontWeight: '600',
        fontSize: 22,
        color: Colors.tertiary,
        textAlign: 'center',
        // letterSpacing: 0.9,
    },
    cardField: {
        width: '100%',
        height: '10%',
        backgroundColor: 'pink',
        marginTop: wp('5%'),
    }
})