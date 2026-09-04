import { SymbolView } from "expo-symbols";
import { Tabs } from "expo-router";

import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#0c0b09" },
        headerTintColor: "#f4efe4",
        tabBarStyle: { backgroundColor: "#0c0b09", borderTopColor: "#2b261c" },
        tabBarActiveTintColor: Colors.dark.tint,
        tabBarInactiveTintColor: Colors.dark.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "person", android: "person", web: "person" }} tintColor={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="work"
        options={{
          title: "Work",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "briefcase", android: "work", web: "work" }} tintColor={color} size={26} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color }) => (
            <SymbolView
              name={{ ios: "square.grid.2x2", android: "apps", web: "apps" }}
              tintColor={color}
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <SymbolView name={{ ios: "envelope", android: "mail", web: "mail" }} tintColor={color} size={26} />
          ),
        }}
      />
    </Tabs>
  );
}
