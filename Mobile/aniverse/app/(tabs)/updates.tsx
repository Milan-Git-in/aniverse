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
  Linking,
} from "react-native";
import { fetchUpdates } from "../../lib/api";
import { AiringSchedule, MediaItem, News } from "../../lib/types";

const { width } = Dimensions.get("window");
const COLS = width > 600 ? 4 : 2;
const CARD_WIDTH = (width - (COLS + 1) * 12) / COLS;

export default function UpdatesScreen() {
  const [tab, setTab] = useState<"airing" | "recent">("airing");
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUpdates()
      .then((data: News) => {
        setNews(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load updates.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.subtitle}>Loading updates…</Text>
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

  const airingData = news?.data?.airingToday?.airingSchedules ?? [];
  const recentData = news?.data?.recent?.media ?? [];

  return (
    <View style={styles.container}>
      {/* Tab Selector */}
      <View style={styles.tabRow}>
        {(["airing", "recent"] as const).map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTab(t)}
            style={[styles.tabBtn, tab === t && styles.tabBtnActive]}
          >
            <Text
              style={[styles.tabText, tab === t && styles.tabTextActive]}
            >
              {t === "airing" ? "Airing Today" : "Recent Activity"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab === "airing" ? (
        <FlatList
          data={airingData}
          keyExtractor={(_, i) => String(i)}
          numColumns={COLS}
          key={`airing-${COLS}`}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }: { item: AiringSchedule }) => (
            <TouchableOpacity
              style={[styles.card, { width: CARD_WIDTH }]}
              onPress={() => item.media.siteUrl && Linking.openURL(item.media.siteUrl)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.media.coverImage?.large }}
                style={[styles.cover, { height: CARD_WIDTH * 1.4 }]}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.media.title?.english || item.media.title?.romaji}
                </Text>
                <Text style={styles.meta}>Ep {item.episode}</Text>
                <Text style={styles.meta}>
                  {new Date(item.airingAt * 1000).toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <FlatList
          data={recentData}
          keyExtractor={(_, i) => String(i)}
          numColumns={COLS}
          key={`recent-${COLS}`}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: 12 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }: { item: MediaItem }) => (
            <TouchableOpacity
              style={[styles.card, { width: CARD_WIDTH }]}
              onPress={() => item.siteUrl && Linking.openURL(item.siteUrl)}
              activeOpacity={0.85}
            >
              <Image
                source={{ uri: item.coverImage?.large }}
                style={[styles.cover, { height: CARD_WIDTH * 1.4 }]}
                resizeMode="cover"
              />
              <View style={styles.info}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title?.english || item.title?.romaji}
                </Text>
                <Text style={styles.meta}>Since {item.startDate?.year}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
  tabRow: {
    flexDirection: "row",
    margin: 12,
    gap: 10,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333",
  },
  tabBtnActive: {
    backgroundColor: "#a855f7",
    borderColor: "#a855f7",
  },
  tabText: { color: "#9ca3af", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#fff" },
  grid: { paddingHorizontal: 12, paddingBottom: 20 },
  card: {
    backgroundColor: "#1a1a1a",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cover: { width: "100%", backgroundColor: "#2a2a2a" },
  info: { padding: 8 },
  title: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    marginBottom: 2,
  },
  meta: { color: "#9ca3af", fontSize: 11 },
});
