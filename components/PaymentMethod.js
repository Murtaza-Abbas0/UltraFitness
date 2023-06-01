import React, { useState } from "react";
import { View, Text, TouchableOpacity } from 'react-native'
import { CardField, useStripe, } from '@stripe/stripe-react-native';

const PaymentMethod = () => {
    const [cardDetails, setCardDetails] = useState('')

    const stripe = useStripe();

    let cardDetailsToSend = {}

    const createPaymentIntent = async () => {
        console.log('cardDetails: ', cardDetails)
        cardDetailsToSend = {

        }
        // return
        try {
            await stripe
                .createPaymentMethod({
                    type: 'card',
                    card: {
                        number: '5555555555554444', // Replace with actual card number
                        exp_month: '02',
                        exp_year: '40',
                        cvc: '123', // Replace with actual CVC
                    },
                    billing_details: {
                        name: 'Murtaza Rizvi',
                    },
                    paymentMethodType: 'Card'
                })
                .then(function (result) {
                    console.log('result: ', result)
                });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={{
            height:'50%',
            backgroundColor: 'pink'
        }} >
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                    setCardDetails(cardDetails)
                }}
                style={{ width: '100%', height: '20%', backgroundColor: 'pink', marginBottom: '10%', zIndex:10000 }}
            />
        </View >
    )
}

export default PaymentMethod;