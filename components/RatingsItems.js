import {View, Text} from 'react-native';
import React from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

const RatingsItems = ({averageRating}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Rating
        type="star"
        ratingCount={averageRating}
        imageSize={12}
        // showRating
        style={{marginTop: 5, paddingLeft: 3}}
        ratingTextColor="#000"
        backgroundColor="transparent"
        // onFinishRating={this.ratingCompleted}
        readonly
      />
      <Text style={{color: '#000', fontSize: 12, paddingLeft: 5, marginTop: 2}}>
        {averageRating}
      </Text>
    </View>
  );
};

export default RatingsItems;
