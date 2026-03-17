import React, { useMemo } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";

export default function ReadLightNovelScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();

  // We can use a simple hosted epub viewer and pass the URL,
  // or we can inject epub.js into the WebView. 
  // For simplicity matching the web app, let's inject a basic HTML reader 
  // that loads epub.js via CDN.
  
  const htmlContent = useMemo(() => {
    if (!url) return "";
    const decodedUrl = decodeURIComponent(url);
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
        <style>
          body { margin: 0; background: #ffffff; color: #000; overflow: hidden; font-family: sans-serif; }
          #viewer { width: 100vw; height: 100vh; }
          .loading { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
          .controls { position: absolute; bottom: 20px; left: 0; right: 0; display: flex; justify-content: space-between; padding: 0 20px; pointer-events: none; }
          button { pointer-events: auto; padding: 12px 24px; background: rgba(0,0,0,0.8); color: white; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div id="loading" class="loading">Loading Epub...</div>
        <div id="viewer"></div>
        <div class="controls" id="controls" style="display: none;">
          <button onclick="rendition.prev()">Prev</button>
          <button onclick="rendition.next()">Next</button>
        </div>
        <script>
          const book = ePub("${decodedUrl}");
          const rendition = book.renderTo("viewer", {
            width: "100%",
            height: "100%",
            spread: "none"
          });
          
          book.ready.then(() => {
            document.getElementById("loading").style.display = "none";
            document.getElementById("controls").style.display = "flex";
            rendition.display();
          }).catch(err => {
            document.getElementById("loading").innerText = "Error loading epub.";
          });
        </script>
      </body>
      </html>
    `;
  }, [url]);

  if (!url) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        allowsInlineMediaPlayback
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f0f0f" },
  webview: { flex: 1, backgroundColor: "#0f0f0f" },
});
