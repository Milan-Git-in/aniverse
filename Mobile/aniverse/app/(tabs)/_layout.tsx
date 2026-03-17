import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

function HeaderRight() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSearch = () => {
    if (query.trim()) {
      router.push(`/results?search_query=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <View style={styles.headerRight}>
      <TextInput
        style={styles.input}
        placeholder="Search videos..."
        placeholderTextColor="#666"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={onSearch} style={styles.searchBtn}>
        <Ionicons name="search" size={18} color="#a855f7" />
      </TouchableOpacity>
    </View>
  );
}

function HeaderLeft() {
  return (
    <View style={styles.headerLeft}>
      <Image
        source={require("../../assets/images/favicon.png")}
        style={{ width: 24, height: 24 }}
      />

      <Text style={styles.logoText}>Aniverse</Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#0f0f0f",
          borderTopColor: "#a855f7",
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: "#a855f7",
        tabBarInactiveTintColor: "#6b7280",
        headerStyle: { backgroundColor: "#0f0f0f" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
        headerLeft: () => <HeaderLeft />,
        headerRight: () => <HeaderRight />,
        headerTitle: () => null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboards"
        options={{
          title: "Populars",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: "Updates",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="manhwas"
        options={{
          title: "Manhwas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lightnovels"
        options={{
          title: "Lightnovels",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginLeft: 12,
  },
  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    gap: 6,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    width: 180,
    borderWidth: 1,
    borderColor: "#333",
    fontSize: 13,
  },
  searchBtn: {
    padding: 6,
  },
});
