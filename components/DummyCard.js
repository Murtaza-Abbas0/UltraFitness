import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

const DummyCard = ({ name, number, expiry }) => {
  return (
    <LinearGradient
      colors={['#ec0073', '#fbb034']}
      style={{ flex: 1, borderRadius: 12 }}
    >
      <Svg width="300" height="200">
        {/* <Rect x="10" y="10" width="280" height="180" fill="white" rx="12" ry="12" /> */}
        <SvgText x="20" y="40" fill="black" fontSize="18">{name}</SvgText>
        <SvgText x="20" y="70" fill="black" fontSize="14">**** **** **** {number}</SvgText>
        <SvgText x="20" y="100" fill="black" fontSize="14">{expiry}</SvgText>
        <SvgText x="200" y="150" fill="black" fontSize="14">Mastercard</SvgText>
        <Svg
          x="200"
          y="120"
          width="50"
          height="30"
          viewBox="0 0 50 30"
        >
          {/* <Rect width="50" height="30" fill="#ff5f00" />
          <Text
            x="7"
            y="18"
            fill="white"
            fontSize="12"
            fontWeight="bold"
            fontFamily="Arial"
          >
            MC
          </Text> */}
        </Svg>
      </Svg>
    </LinearGradient>
  );
};

export default DummyCard;
