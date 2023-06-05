import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Rect, Text as SvgText } from 'react-native-svg';

const DummyCard = ({ name, number, expiry }) => {
  return (
    <Svg width="300" height="200">
      <Rect x="10" y="10" width="280" height="180" fill="white" />
      <SvgText x="20" y="40" fill="black" fontSize="18">{name}</SvgText>
      <SvgText x="20" y="70" fill="black" fontSize="14">{number}</SvgText>
      <SvgText x="20" y="100" fill="black" fontSize="14">{expiry}</SvgText>
    </Svg>
  );
};

export default DummyCard;
