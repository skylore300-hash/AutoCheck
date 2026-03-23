import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>AutoCheck Mobile</Text>
      <Text style={styles.title}>Contrôle terrain en temps réel</Text>
      <Text style={styles.description}>
        Application React Native prête pour scanner plaque, QR code et documents.
      </Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  badge: {
    color: "#67e8f9",
    marginBottom: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  title: {
    color: "#f8fafc",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    color: "#cbd5e1",
    textAlign: "center",
    lineHeight: 22,
  },
});
