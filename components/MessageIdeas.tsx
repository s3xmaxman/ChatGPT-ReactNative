import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const PredefinedMessages = [
  {
    title: "React Nativeを説明する",
    text: "5歳の子供に説明するように",
  },
  {
    title: "楽しいアクティビティを提案する",
    text: "サンフランシスコを訪れる家族のために",
  },
  {
    title: "大阪の美味しいごはん屋さん",
    text: "大阪で人気のごはん屋さんを紹介",
  },
];

type Props = {
  onSelectCard: (message: string) => void;
};

const MessageIdeas = ({ onSelectCard }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 10,
        }}
      >
        {PredefinedMessages.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => onSelectCard(`${item.title} ${item.text}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.input,
    padding: 14,
    borderRadius: 10,
  },
});

export default MessageIdeas;
