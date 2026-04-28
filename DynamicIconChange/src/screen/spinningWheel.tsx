import React, { useMemo } from "react";
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Svg, { G, Path, Image as SvgImage } from "react-native-svg";
import * as d3Shape from "d3-shape";
import { useSpinWheel } from "../hook/useSpinnWheel";
import Knob from '../assets/downArrow.svg'
const items = [
  { id: "Guitar", image: require("../assets/guitar.png") },
  { id: "Piano", image: require("../assets/piano.png") },
  { id: "Drum", image: require("../assets/drum.png") },
  { id: "Violin", image: require("../assets/violin.png") },
];

const SpinWheel = () => {
  const {
    angle,
    spin,
    enabled,
    angleOffset,
    angleBySegment,
    wheelSize,
    winnerIndex,
  } = useSpinWheel(items.length);

  const oneTurn = 360;

  /** ---------------------------
   * 🎡 WHEEL PATHS
   * --------------------------- */
  const arcs = d3Shape
    .pie<any>()
    .value(() => 1)(items);

  const arcGenerator = d3Shape
    .arc<any>()
    .outerRadius(wheelSize / 2)
    .innerRadius(40)
    .padAngle(0.02);

  /** ---------------------------
   * 🔘 KNOB
   * --------------------------- */
  const renderKnob = () => {
    const knobSize = 50;

    const segmentProgress = Animated.modulo(
      Animated.divide(
        Animated.modulo(
          Animated.subtract(angle, angleOffset),
          oneTurn
        ),
        new Animated.Value(angleBySegment)
      ),
      1
    );

    return (
      <Animated.View
        style={{
          width: knobSize,
          height: knobSize * 2,
          justifyContent: "flex-end",
          zIndex: 10,
          transform: [
            {
              rotate: segmentProgress.interpolate({
                inputRange: [-1, -0.5, -0.0001, 0.0001, 0.5, 1],
                outputRange: [
                  "0deg",
                  "0deg",
                  "35deg",
                  "-35deg",
                  "0deg",
                  "0deg",
                ],
              }),
            },
          ],
        }}
      >
              <Knob width={knobSize} height={knobSize} />

      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {renderKnob()}

      <Animated.View
        style={{
          transform: [
            {
              rotate: angle.interpolate({
                inputRange: [-360, 0, 360],
                outputRange: ["-360deg", "0deg", "360deg"],
              }),
            },
          ],
        }}
      >
        <Svg width={wheelSize} height={wheelSize}>
          <G
            x={wheelSize / 2}
            y={wheelSize / 2}
            rotation={-angleOffset}
          >
            {arcs.map((arc, index) => {
              const [x, y] = arcGenerator.centroid(arc);
              return (
                <G key={index}>
                  <Path d={arcGenerator(arc)!} fill="#d3d3b8" />
                  <SvgImage
                    href={items[index].image}
                    x={x - 30}
                    y={y - 30}
                    width={60}
                    height={60}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </G>
              );
            })}
          </G>
        </Svg>
      </Animated.View>

      {/* ✅ RESULT */}
      <Text style={styles.resultText}>
        {winnerIndex !== null
            ? `Selected: ${items[winnerIndex].id}`
            : "Spin the wheel"}
        </Text>

      <TouchableOpacity
        style={[styles.button, !enabled && { opacity: 0.6 }]}
        onPress={spin}
        disabled={!enabled}
      >
        <Text style={styles.buttonText}>Spin</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SpinWheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: "#FFD200",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
  },
  resultText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#FFD200",
  },
});
