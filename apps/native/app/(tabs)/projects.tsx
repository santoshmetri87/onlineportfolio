import { splitStack } from "@portfolio/shared";
import { ActivityIndicator, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePortfolio } from "@/lib/usePortfolio";

export default function ProjectsScreen() {
  const { portfolio, loading } = usePortfolio();

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#e3b341" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {portfolio.projects.map((project) => (
        <View key={project.id} style={styles.card}>
          {project.image_url ? <Image source={{ uri: project.image_url }} style={styles.image} /> : null}
          <Text style={styles.kicker}>{project.featured ? "Featured" : "Project"}</Text>
          <Text style={styles.title}>{project.title}</Text>
          <Text style={styles.body}>{project.summary}</Text>
          <Text style={styles.muted}>{splitStack(project.stack).join(" · ")}</Text>
          <View style={styles.row}>
            {project.live_url ? (
              <Pressable onPress={() => Linking.openURL(project.live_url!)}>
                <Text style={styles.link}>Live</Text>
              </Pressable>
            ) : null}
            {project.repo_url ? (
              <Pressable onPress={() => Linking.openURL(project.repo_url!)}>
                <Text style={styles.link}>Code</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0c0b09" },
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, backgroundColor: "#0c0b09", alignItems: "center", justifyContent: "center" },
  card: {
    borderWidth: 1,
    borderColor: "#2b261c",
    borderRadius: 24,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#161410",
  },
  image: { width: "100%", height: 160, borderRadius: 16, marginBottom: 12 },
  kicker: { color: "#e3b341", textTransform: "uppercase", letterSpacing: 2, fontSize: 11 },
  title: { color: "#f4efe4", fontSize: 24, fontWeight: "600", marginTop: 8 },
  body: { color: "#b9b0a2", marginTop: 8, lineHeight: 22 },
  muted: { color: "#8a8174", marginTop: 10 },
  row: { flexDirection: "row", gap: 16, marginTop: 12 },
  link: { color: "#e3b341", fontSize: 16 },
});
