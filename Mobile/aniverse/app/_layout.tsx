import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import LoadingScreen from "./LoadingScreen";
import "./globals.css";

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
    setTimeout(() => {
      setIsReady(true);
      SplashScreen.hideAsync();
    }, 3000); // Show loading for 3 seconds
  }, []);

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="watch"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0f0f" },
          headerTintColor: "#a855f7",
          title: "Watch",
        }}
      />
      <Stack.Screen
        name="manhwas/read"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0f0f" },
          headerTintColor: "#a855f7",
          title: "Reading",
        }}
      />
      <Stack.Screen
        name="lightnovels/read"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0f0f" },
          headerTintColor: "#a855f7",
          title: "Reading",
        }}
      />
      <Stack.Screen
        name="results"
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: "#0f0f0f" },
          headerTintColor: "#a855f7",
          title: "Search Results",
        }}
      />
    </Stack>
  );
}
