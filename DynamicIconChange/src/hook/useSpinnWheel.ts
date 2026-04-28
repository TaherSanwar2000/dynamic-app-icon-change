import { useRef, useState } from "react";
import { Animated, Easing, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ONE_TURN = 360;

export const useSpinWheel = (dataLength: number) => {
  const angle = useRef(new Animated.Value(0)).current;
  const angleRef = useRef(0);

  const [enabled, setEnabled] = useState(true);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const angleBySegment = ONE_TURN / dataLength;
  const angleOffset = angleBySegment / 2;

  const spin = () => {
    if (!enabled) return;

    const randomIndex = Math.floor(Math.random() * dataLength);

    const targetAngle =
      (ONE_TURN - ((randomIndex + 0.5) * angleBySegment) + angleOffset) %
      ONE_TURN;

    const finalAngle = ONE_TURN * 5 + targetAngle;

    setEnabled(false);
    setWinnerIndex(null); // ✅ CLEAR PREVIOUS RESULT
    angle.setValue(0);
    angleRef.current = 0;

    Animated.timing(angle, {
      toValue: finalAngle,
      duration: 6000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      angleRef.current = finalAngle % ONE_TURN;

      // ✅ SET WINNER ONLY AFTER ANIMATION
      setWinnerIndex(randomIndex);
      setEnabled(true);
    });
  };

  return {
    angle,
    spin,
    enabled,
    winnerIndex,
    angleBySegment,
    angleOffset,
    wheelSize: width * 0.9,
  };
};
