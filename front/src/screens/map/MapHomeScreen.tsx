import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useAuth from '@/hooks/queries/useAuth';
import { SafeAreaView } from 'react-native-safe-area-context';

function MapHomeScreen(){
  const {logoutMutation} = useAuth();
  
  return(
    <SafeAreaView>
      <Text>맵 스크린</Text>
      <Button title="로그아웃" onPress={() => logoutMutation.mutate(null)} />
    </SafeAreaView>
  )
}

const style = StyleSheet.create({});

export default MapHomeScreen;