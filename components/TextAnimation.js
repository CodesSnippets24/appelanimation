// components/TextScroll.js
import React from "react";
import { useSpring, animated } from "react-spring";

import styles from "../src/styles/Home.module.css";

const TextScroll = () => {
  const [{ x, opacity }, set] = useSpring(() => ({ x: 0, opacity: 1 }));

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollFraction = scrollY / window.innerHeight;
    const textX = scrollFraction * (window.innerWidth / 2);
    const textOpacity = 1 - scrollFraction;

    set({ x: textX, opacity: textOpacity });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <animated.div
      className={styles["scrollText"]}
      style={{
        transform: x.interpolate((x) => `translateX(${x}px)`),
        opacity: opacity,
      }}
    >
      <h1>AirPodsPro</h1>
    </animated.div>
  );
};

export default TextScroll;
