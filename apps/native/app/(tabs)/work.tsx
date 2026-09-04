import { formatDateRange, splitLines } from "@portfolio/shared";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { usePortfolio } from "@/lib/usePortfolio";

export default function WorkScreen() {
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
      {portfolio.experiences.map((job) => (
        <View key={job.id} style={styles.card}>
          <Text style={styles.dates}>{formatDateRange(job.start_date, job.end_date)}</Text>
          <Text style={styles.title}>{job.role}</Text>
          <Text style={styles.muted}>
            {job.company}
            {job.location ? ` · ${job.location}` : ""}
          </Text>
          {splitLines(job.highlights).map((line) => (
            <Text key={line} style={styles.body}>
              • {line}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0c0b09" },
  content: { padding: 24, paddingBottom: 48 },
  center: { flex: 1, backgroundColor: "#0c0b09", alignItems: "center", justifyContent: "center" },
  card: { marginBottom: 28 },
  dates: { color: "#e3b341", marginBottom: 6 },
  title: { color: "#f4efe4", fontSize: 22, fontWeight: "600" },
  muted: { color: "#b9b0a2", marginTop: 4, marginBottom: 10 },
  body: { color: "#b9b0a2", lineHeight: 22, marginBottom: 4 },
});
