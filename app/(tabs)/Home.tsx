import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { FIREBASE_AUTH } from "@/config/FirebaseConfig";
import io from "socket.io-client";

// Conecte-se ao servidor Socket.IO usando o IP local
const socket = io("http://192.168.1.70:3000"); // Substitua pelo seu IP local

socket.on("connect", () => {
  console.log("socket Connected");
});

type ItemProps = { name: string; price: number };

const Item = ({ name, price }: ItemProps) => (
  <TouchableOpacity style={styles.item}>
    <View style={styles.itemRow}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>${price.toLocaleString()}</Text>
    </View>
  </TouchableOpacity>
);

export default function Home() {
  const [data, setData] = useState<any[]>([]); // Defina o tipo correto se possível
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    socket.on("crypto", (cryptoData) => {
      setData(cryptoData);
      setRefreshing(false); // Termina o "refreshing" assim que os dados são recebidos
    });
  }, []);

  const handleSignOut = () => {
    FIREBASE_AUTH.signOut().catch((error) =>
      console.error("Error signing out:", error)
    );
  };

  const handleRefresh = () => {
    setRefreshing(true); // Começa a animação de carregamento
    socket.emit("requestCryptoData"); // Solicita novos dados do backend
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data} // Exibe os dados recebidos pelo socket
          renderItem={({ item }) => (
            <Item name={item.name} price={item.price} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshing={refreshing}
          onRefresh={handleRefresh} // Função chamada ao puxar para baixo
        />
        <View style={styles.footer}>
          <Button onPress={handleSignOut} title="Sign Out" color="#ff5c5c" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: StatusBar.currentHeight || 16,
  },
  item: {
    backgroundColor: "#f0f8ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 18,
    color: "#555",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
});
