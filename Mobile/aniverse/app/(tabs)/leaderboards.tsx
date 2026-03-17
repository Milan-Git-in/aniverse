import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { fetchLeaderboards } from "../../lib/api";
import { LeaderBoardCard } from "../../lib/types";

const { width } = Dimensions.get("window");
const COLS = width > 600 ? 4 : 2;
const CARD_WIDTH = (width - (COLS + 1) * 12) / COLS;

export default function LeaderboardsScreen() {
  const [cards, setCards] = useState<LeaderBoardCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboards()
      .then((data) => {
        const list: LeaderBoardCard[] =
          data?.data?.Page?.media ?? [];
        const sorted = [...list].sort((a, b) => b.popularity - a.popularity);
        setCards(sorted);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to load leaderboards.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#a855f7" />
        <Text style={styles.subtitle}>Loading populars…</Text>
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
        data={cards}
        keyExtractor={(item, i) =>
          item.title?.english ?? item.title?.romaji ?? String(i)
        }
        numColumns={COLS}
        key={`cols-${COLS}`}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <Text style={styles.heading}>🏆 Popular Anime</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.card, { width: CARD_WIDTH }]}>
            <Image
              source={{ uri: item.coverImage?.large }}
              style={[styles.cover, { height: CARD_WIDTH * 1.4 }]}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title?.english || item.title?.romaji}
              </Text>
              <Text style={styles.pop}>
                {item.popularity?.toLocaleString()} fans
              </Text>
            </View>
          </View>
        )}
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
    backgroundColor: "#2a2a2a",
  },
  info: { padding: 8 },
  title: {
    color: "#e5e7eb",
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
    marginBottom: 2,
  },
  pop: { color: "#a855f7", fontSize: 11 },
});
