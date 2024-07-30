import Colors from "@/constants/Colors";
import { Drawer } from "expo-router/drawer";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Header,
  getHeaderTitle,
  useHeaderHeight,
} from "@react-navigation/elements";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  RollInLeft,
} from "react-native-reanimated";
import React from "react";
import { sections } from "@/constants/Sections";
import { apps } from "@/constants/Apps";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(sections[0]);
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Drawer.Screen
        options={{
          headerBackground: () => (
            <BlurView
              intensity={60}
              tint={"light"}
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: "rgba(0256,256,256,0.5)" },
              ]}
            />
          ),
          headerTransparent: true,
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Ionicons name="search" size={24} color={Colors.grey} />
            </TouchableOpacity>
          ),
          header: ({ options, route }) => (
            <View>
              <Header
                {...options}
                title={getHeaderTitle(options, route.name)}
              />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                }}
              >
                {sections.map((section, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSelected(section);
                    }}
                    style={
                      selected === section
                        ? styles.sectionBtnSelected
                        : styles.sectionBtn
                    }
                  >
                    <Text
                      style={
                        selected === section
                          ? styles.sectionBtnTextSelected
                          : styles.sectionBtnText
                      }
                    >
                      {section.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ),
        }}
      />
      <ScrollView contentContainerStyle={{ paddingTop: headerHeight }}>
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {selected === section && (
              <Animated.View
                style={styles.section}
                entering={FadeIn.duration(600).delay(400)}
                exiting={FadeOut.duration(400)}
              >
                <ShimmerPlaceholder width={160} height={20} visible={!loading}>
                  <Text style={styles.title}>{selected.title}</Text>
                </ShimmerPlaceholder>
                <ShimmerPlaceholder
                  width={280}
                  height={20}
                  visible={!loading}
                  shimmerStyle={{ marginVertical: 10 }}
                >
                  <Text style={styles.label}>{selected.label}</Text>
                </ShimmerPlaceholder>

                {Array.from({ length: 5 }).map((_, index) => (
                  <View key={index} style={styles.card}>
                    <ShimmerPlaceholder
                      width={60}
                      height={60}
                      shimmerStyle={{ borderRadius: 30 }}
                      visible={!loading}
                    >
                      <Image
                        source={{ uri: apps[index].image }}
                        style={styles.cardImage}
                      />
                    </ShimmerPlaceholder>

                    <View style={{ flexShrink: 1, gap: 4 }}>
                      <ShimmerPlaceholder
                        width={160}
                        height={20}
                        visible={!loading}
                      >
                        <Text style={styles.cardTitle}>
                          {apps[index].title}
                        </Text>
                      </ShimmerPlaceholder>

                      <ShimmerPlaceholder
                        width={160}
                        height={20}
                        visible={!loading}
                      >
                        <Text style={styles.cardDesc}>
                          {apps[index].description}
                        </Text>
                      </ShimmerPlaceholder>

                      <ShimmerPlaceholder
                        width={250}
                        height={20}
                        visible={!loading}
                      >
                        <Text style={styles.cardAuthor}>
                          {apps[index].author}
                        </Text>
                      </ShimmerPlaceholder>
                    </View>
                  </View>
                ))}
              </Animated.View>
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  section: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  sectionBtn: {
    backgroundColor: Colors.input,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnSelected: {
    backgroundColor: Colors.grey,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  sectionBtnText: {
    color: "#000",
    fontWeight: "500",
  },
  sectionBtnTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  card: {
    borderRadius: 8,
    backgroundColor: Colors.input,
    padding: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 14,
    color: "#000",
  },
  cardAuthor: {
    fontSize: 14,
    color: "#666",
  },
});

export default Page;
