import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import DynamicIconChange from './src/screen/dynamicIconChange';

const App = () => {

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0B0B0F"
        translucent={false}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <DynamicIconChange/>
      </SafeAreaView>
    </>
  );
};

export default App;
