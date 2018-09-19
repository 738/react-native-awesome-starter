import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import styled from './theme';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const ContainerView = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #F5FCFF;
`;

const WelcomeText = styled(Text)`
    font-size: 20px;
    text-align: center;
    margin: 10px;
`;

const InstructionsText = styled(Text)`
    text-align: center;
    color: #333333;
    margin-bottom: 5px;
`;

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <ContainerView>
        <WelcomeText>Welcome to React Native!</WelcomeText>
        <InstructionsText>To get started, edit App.tsx</InstructionsText>
        <InstructionsText>{instructions}</InstructionsText>
      </ContainerView>
    );
  }
}

export default App;
