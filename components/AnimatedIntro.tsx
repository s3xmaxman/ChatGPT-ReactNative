import { View, Text } from "react-native";
import React from "react";
import { ReText } from "react-native-redash";
import Colors from "@/constants/Colors";
import { StyleSheet, useWindowDimensions } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const content = [
  {
    title: "Let's create.",
    bg: Colors.lime,
    fontColor: Colors.pink,
  },
  {
    title: "Let's brainstorm.",
    bg: Colors.brown,
    fontColor: Colors.sky,
  },
  {
    title: "Let's discover.",
    bg: Colors.orange,
    fontColor: Colors.blue,
  },
  {
    title: "Let's go.",
    bg: Colors.teal,
    fontColor: Colors.yellow,
  },
  {
    title: "ChatGPT.",
    bg: Colors.green,
    fontColor: Colors.pink,
  },
];

/**
 * AnimatedIntroコンポーネント
 *
 * このコンポーネントは、テキストとボールのアニメーションを表示します。
 * テキストとボールの色と位置がアニメーションで変化し、テキストが順番に表示されます。
 *
 * 使用されているフック:
 * - useWindowDimensions: 画面の幅を取得するために使用
 * - useSharedValue: アニメーションで共有する値を定義
 * - useDerivedValue: 動的に計算された値を取得
 * - useAnimatedStyle: スタイルのアニメーションを定義
 * - useAnimatedReaction: 値の変化に応じてアニメーションを実行
 */

const AnimatedIntro = () => {
  const { width } = useWindowDimensions(); // 画面の幅を取得
  const ballWidth = 34; // ボールの幅
  const half = width / 2 - ballWidth / 2; // ボールの初期位置を中央に設定

  // アニメーションに使用する共有値を定義
  const currentX = useSharedValue(half);
  const currentIndex = useSharedValue(0);
  const isAtStart = useSharedValue(true);
  const labelWidth = useSharedValue(0);
  const canGoToNext = useSharedValue(false);
  const didPlay = useSharedValue(false);

  // 現在のテキストを取得
  const text = useDerivedValue(() => {
    const index = currentIndex.value;
    return content[index].title;
  }, [currentIndex]);

  // 次の色のインデックスを取得
  const newColorIndex = useDerivedValue(() => {
    if (!isAtStart.value) {
      return (currentIndex.value + 1) % content.length;
    } else {
      return currentIndex.value;
    }
  }, [currentIndex]);

  // テキストスタイルのアニメーションを定義
  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        "RGB"
      ),
      transform: [
        {
          translateX: interpolate(
            currentX.value,
            [half, half + labelWidth.value / 2],
            [half + 4, half - labelWidth.value / 2]
          ),
        },
      ],
    };
  }, [currentIndex, currentX]);

  // ボールスタイルのアニメーションを定義
  const ballStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [
          content[newColorIndex.value].fontColor,
          content[currentIndex.value].fontColor,
        ],
        "RGB"
      ),
      transform: [{ translateX: currentX.value }],
    };
  });

  // マスクのスタイルのアニメーションを定義
  const mask = useAnimatedStyle(
    () => ({
      backgroundColor: interpolateColor(
        currentX.value,
        [half, half + labelWidth.value / 2],
        [content[newColorIndex.value].bg, content[currentIndex.value].bg],
        "RGB"
      ),
      transform: [{ translateX: currentX.value }],
      width: width / 1.5,
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    }),
    [currentIndex, currentX, labelWidth]
  );

  // 背景スタイルのアニメーションを定義
  const style1 = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      currentX.value,
      [half, half + labelWidth.value / 2],
      [content[newColorIndex.value].bg, content[currentIndex.value].bg],
      "RGB"
    ),
    opacity: interpolate(1, [1, 0], [1, 0, 0, 0, 0, 0, 0]),
    transform: [
      {
        translateX: interpolate(
          1,
          [1, 0],
          [0, -width * 2, -width, -width, -width, -width, -width]
        ),
      },
    ],
  }));

  // ラベルの幅が変更されたときのアニメーションを定義
  useAnimatedReaction(
    () => labelWidth.value,
    (newWidth) => {
      currentX.value = withDelay(
        1000,
        withTiming(
          half + newWidth / 2,
          {
            duration: 800,
          },
          (finished) => {
            if (finished) {
              canGoToNext.value = true;
              isAtStart.value = false;
            }
          }
        )
      );
    },
    [labelWidth, currentX, half]
  );

  // 次に進めるときのアニメーションを定義
  useAnimatedReaction(
    () => canGoToNext.value,
    (next) => {
      if (next) {
        canGoToNext.value = false;
        currentX.value = withDelay(
          1000,
          withTiming(
            half,
            {
              duration: 800,
            },
            (finished) => {
              if (finished) {
                currentIndex.value = (currentIndex.value + 1) % content.length;
                isAtStart.value = true;
                didPlay.value = false;
              }
            }
          )
        );
      }
    },
    [currentX, labelWidth]
  );

  // コンポーネントをレンダリング
  return (
    <Animated.View style={[styles.wrapper, style1]}>
      <Animated.View style={[styles.content]}>
        <Animated.View style={[styles.ball, ballStyle]} />
        <Animated.View style={[styles.mask, mask]} />
        <ReText
          onLayout={(e) => {
            labelWidth.value = e.nativeEvent.layout.width + 4;
          }}
          style={[styles.title, textStyle]}
          text={text}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mask: {
    zIndex: 1,
    position: "absolute",
    left: "0%",
    height: 44,
  },
  ball: {
    width: 40,
    zIndex: 10,
    height: 40,
    backgroundColor: "#000",
    borderRadius: 20,
    position: "absolute",
    left: "0%",
  },
  titleText: {
    flexDirection: "row",
  },
  title: {
    fontSize: 36,
    fontWeight: "600",
    left: "0%",
    position: "absolute",
  },
  content: {
    marginTop: 300,
  },
});

export default AnimatedIntro;
