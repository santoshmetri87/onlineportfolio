import { ActivityIndicator, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePortfolio } from "@/lib/usePortfolio";

export default function ContactScreen() {
  const { portfolio, loading } = usePortfolio();
  const email = portfolio.settings?.contact_email;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#e3b341" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Let’s talk</Text>
      <Text style={styles.body}>
        {email ? `The fastest way to reach me is ${email}.` : "Add a contact email in the web admin."}
      </Text>
      {email ? (
        <Pressable onPress={() => Linking.openURL(`mailto:${email}`)}>
          <Text style={styles.link}>Email</Text>
        </Pressable>
      ) : null}
      {portfolio.socialLinks.map((link) => (
        <Pressable key={link.id} onPress={() => Linking.openURL(link.url)}>
          <Text style={styles.link}>{link.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0c0b09" },
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, backgroundColor: "#0c0b09", alignItems: "center", justifyContent: "center" },
  title: { color: "#f4efe4", fontSize: 34, fontWeight: "600" },
  body: { color: "#b9b0a2", fontSize: 17, lineHeight: 26, marginVertical: 16 },
  link: { color: "#e3b341", fontSize: 18, marginBottom: 12 },
});
