import { View, Text } from 'react-native'
import React from 'react'
import InputComponent from './InputComponent'

export default function Inputs() {
  return (
    <View>
      <InputComponent title='Название' />
      <InputComponent title='Ссылка' />
      <InputComponent title='Описание' />
    </View>
  )
}