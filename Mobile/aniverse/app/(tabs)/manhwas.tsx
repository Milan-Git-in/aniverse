import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchManhwas } from "../../lib/api";
import { Manhwa } from "../../lib/types";

const { width } = Dimensions.get("window");
const COLS = width > 600 ? 4 : 2;
const CARD_WIDTH = (width - (COLS + 1) * 12) / COLS;

export default function ManhwasScreen() {
  const [manhwas, setManhwas] = useState<Manhwa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchManhwas()
      .then((data) => {
        setManhwas(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load manhwas.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.subtitle}>Loading manhwas…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={manhwas}
        keyExtractor={(item) => String(item.id)}
        numColumns={COLS}
        key={`manwha-${COLS}`}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <Text style={styles.heading}>📖 Manhwas</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { width: CARD_WIDTH }]}
            onPress={() =>
              router.push(
                `/manhwas/read?url=${encodeURIComponent(item.url)}&title=${encodeURIComponent(item.name)}`
              )
            }
            activeOpacity={0.85}
          >
            {/* PDF thumbnail placeholder */}
            <View style={[styles.cover, { height: CARD_WIDTH * 1.4 }]}>
              <Text style={styles.pdfIcon}>📄</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No manhwas found.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  center: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  subtitle: { color: "#9ca3af", fontSize: 14 },
  error: { color: "#f87171", fontSize: 14, textAlign: "center" },
  emptyText: { color: "#6b7280", fontSize: 16 },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  grid: { padding: 12 },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cover: {
    width: "100%",
    backgroundColor: "#1e0a2e",
    alignItems: "center",
    justifyContent: "center",
  },
  pdfIcon: { fontSize: 40 },
  info: { padding: 8 },
  title: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },
});
