import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";

export default function Home() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Sign Out" />
      <Text>home</Text>
    </View>
  );
}
