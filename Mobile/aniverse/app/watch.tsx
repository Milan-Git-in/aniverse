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
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import YoutubePlayer from "react-native-youtube-iframe";
import { fetchSimilarVideos } from "../lib/api";
import { Videos } from "../lib/types";

const { width } = Dimensions.get("window");

export default function WatchScreen() {
  const { v, title } = useLocalSearchParams<{ v: string; title: string }>();
  const [similar, setSimilar] = useState<Videos[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (title) {
      fetchSimilarVideos(decodeURIComponent(title))
        .then((data) => {
          setSimilar(data.results || []);
          setLoading(false);
        })
        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [title]);

  const decodedTitle = title ? decodeURIComponent(title) : "Unknown Video";

  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <YoutubePlayer videoId={v} height={(width * 9) / 16} play={false} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{decodedTitle}</Text>

        <Text style={styles.sectionTitle}>Similar Videos</Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color="#a855f7"
            style={{ marginTop: 20 }}
          />
        ) : (
          <FlatList
            data={similar}
            keyExtractor={(item, i) => item.videoId ?? String(i)}
            contentContainerStyle={styles.list}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() =>
                  router.push(
                    `/watch?v=${item.videoId}&title=${encodeURIComponent(
                      item.title,
                    )}`,
                  )
                }
              >
                <Image
                  source={{
                    uri: `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`,
                  }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No similar videos found.</Text>
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  videoWrapper: { width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000" },
  content: { flex: 1, padding: 12 },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  list: { paddingBottom: 20 },
  card: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  thumbnail: {
    width: 140,
    height: 79,
    borderRadius: 8,
    backgroundColor: "#2a2a2a",
  },
  cardInfo: { flex: 1, justifyContent: "center" },
  cardTitle: {
    color: "#d1d5db",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
  },
  emptyText: { color: "#6b7280", fontSize: 14 },
});
