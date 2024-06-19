import React from 'react';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import { AuthStackParamList } from '../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../constants';
import { StackScreenProps } from '@react-navigation/stack';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
    return (
      <SafeAreaView>
        <View>
          <Button 
            title="로그인 화면으로 이동" 
            onPress={() => navigation.navigate(authNavigations.AUTH_HOME)}
          />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;