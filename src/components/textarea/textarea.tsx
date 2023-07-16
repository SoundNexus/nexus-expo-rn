// Generate an input component  with a label and a text input

import React from "react"
import { View, Text } from "react-native"
import { TextInput } from "react-native-gesture-handler"

interface Props {
  label: string;
  placeholder: string;
  textarea?: boolean;
}
export const TextArea = ({ label, placeholder, textarea = false }: Props) => {
  return (
    <View >
      <Text className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        { label }
      </Text>
      <TextInput 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder={placeholder}
        multiline={textarea}
      />
    </View>
  )
}