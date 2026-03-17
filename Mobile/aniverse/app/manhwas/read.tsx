import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function ReadManhwaScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  // Use Google Docs Viewer to render PDF in WebView
  const googleDocsUrl = useMemo(() => {
    if (!url) return null;
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
      decodeURIComponent(url)
    )}`;
  }, [url]);

  if (!url) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: googleDocsUrl! }}
        style={styles.webview}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#a855f7"
            style={styles.loader}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  webview: { flex: 1, backgroundColor: "#0f0f0f" },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});
