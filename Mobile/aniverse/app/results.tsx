import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchSearch } from "../lib/api";
import { Videos } from "../lib/types";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function ResultsScreen() {
  const { search_query } = useLocalSearchParams<{ search_query: string }>();
  const [videos, setVideos] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (search_query) {
      fetchSearch(decodeURIComponent(search_query))
        .then((data) => {
          setVideos(data.results || []);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setError("Failed to load search results.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [search_query]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.loadingText}>Searching...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        keyExtractor={(item, i) => item.videoId ?? String(i)}
        numColumns={2}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <Text style={styles.header}>
            Results for "{decodeURIComponent(search_query || "")}"
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push(
                `/watch?v=${item.videoId}&title=${encodeURIComponent(
                  item.title
                )}`
              )
            }
            activeOpacity={0.85}
          >
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
              }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
            <View style={styles.cardInfo}>
              <Text style={styles.videoTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No results found.</Text>
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
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },
  loadingText: { color: "#9ca3af", marginTop: 12, fontSize: 14 },
  errorText: { color: "#f87171", fontSize: 14, textAlign: "center" },
  emptyText: { color: "#6b7280", fontSize: 16 },
  grid: { padding: 12 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  thumbnail: {
    width: "100%",
    height: CARD_WIDTH * 0.56,
    backgroundColor: "#2a2a2a",
  },
  cardInfo: { padding: 8 },
  videoTitle: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
  },
});
