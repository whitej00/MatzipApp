import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputField from '../../components/InputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../utils';
import { TextInput } from 'react-native-gesture-handler';


function LoginScreen(){
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValue: {email: '', password: ''},
    validate: validateLogin,
  })

  const handleSubmit = () => {
    console.log('values', login.values);
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField 
          autoFocus
          placeholder='이메일' 
          error={login.errors.email}
          touched={login.touched.email}
          inputMode='email'
          returnKeyType='next'
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
          {...login.getTextInputProps('email')}
        /> 
        <InputField 
          ref={passwordRef}
          placeholder='비밀번호' 
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry
          returnKeyType='join'
          blurOnSubmit={false}
          onSubmitEditing={handleSubmit}
          {...login.getTextInputProps('password')}
        />
      </View>
      <CustomButton 
        label='로그인'
        variant='filled'
        size='large'
        onPress={handleSubmit}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  }
});

export default LoginScreen;