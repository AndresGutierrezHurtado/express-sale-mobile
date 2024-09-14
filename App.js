import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-violet-600">
      <StatusBar style="dark" />
      <Text className="font-extrabold text-white text-5xl text-center uppercase">Bienvenido a <Text className="inline-flex text-yellow-500">Express Sale</Text> </Text>
    </View>
  );
}
