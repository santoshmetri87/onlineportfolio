import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePortfolio } from "@/lib/usePortfolio";

export default function HomeScreen() {
  const { portfolio, loading } = usePortfolio();
  const { profile, settings, skills } = portfolio;
  const name = profile?.full_name ?? settings?.site_title ?? "Portfolio";

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#e3b341" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.kicker}>{settings?.availability ?? "Portfolio"}</Text>
      <Text style={styles.title}>{profile?.headline ?? name}</Text>
      <Text style={styles.body}>{profile?.bio}</Text>
      {profile?.headshot_url ? <Image source={{ uri: profile.headshot_url }} style={styles.photo} /> : null}
      <Text style={styles.section}>Skills</Text>
      {skills.map((skill) => (
        <View key={skill.id} style={styles.row}>
          <Text style={styles.item}>
            {skill.name}
            <Text style={styles.muted}>  {skill.category}</Text>
          </Text>
          <Text style={styles.accent}>{"●".repeat(skill.level)}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0c0b09" },
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, backgroundColor: "#0c0b09", alignItems: "center", justifyContent: "center" },
  kicker: { color: "#e3b341", letterSpacing: 3, textTransform: "uppercase", fontSize: 12, marginBottom: 12 },
  title: { color: "#f4efe4", fontSize: 34, fontWeight: "600", lineHeight: 40 },
  body: { color: "#b9b0a2", fontSize: 17, lineHeight: 26, marginTop: 16 },
  photo: { width: "100%", height: 280, borderRadius: 24, marginTop: 24 },
  section: { color: "#f4efe4", fontSize: 24, marginTop: 32, marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  item: { color: "#f4efe4", fontSize: 16 },
  muted: { color: "#b9b0a2" },
  accent: { color: "#e3b341" },
});
