import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Button, SafeAreaView } from 'react-native';
import { AuthStackParamList } from '../../navigations/stack/AuthStackNavigator';
import { authNavigations } from '../../constants/navigations';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

function AuthHomeScreen({navigation}: AuthHomeScreenProps) {
    return (
      <SafeAreaView>
        <View>
          <CustomButton
            label="로그인하기"
            inValid={false}
            onPress={() => navigation.navigate(authNavigations.LOGIN)}
            />
          <CustomButton 
            label="회원가입하기" 
            variant="outlined"
            inValid={false}
            onPress={() => navigation.navigate(authNavigations.SIGNUP)}
          />
        </View>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;