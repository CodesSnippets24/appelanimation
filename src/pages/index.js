import Head from "next/head";
import { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import TextScroll from "../../components/TextAnimation";
export default function Home() {
  const scrollTextRef = useRef(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      // const scrollText = document.getElementById("scrollText");
      const windowHeight = window.innerHeight;
      // const textWidth = scrollText.clientWidth;
      // const totalScroll = document.body.scrollHeight - windowHeight;
      const canvas = document.getElementById("hero-lightpass");
      const context = canvas.getContext("2d");

      const frameCount = 148;
      const currentFrame = (index) =>
        `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index
          .toString()
          .padStart(4, "0")}.jpg`;

      const preloadImages = () => {
        for (let i = 1; i < frameCount; i++) {
          const img = new Image();
          img.src = currentFrame(i);
        }
      };

      const img = new Image();
      img.src = currentFrame(1);
      canvas.width = 1158;
      canvas.height = 770;
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };

      const updateImage = (index) => {
        img.src = currentFrame(index);
        context.drawImage(img, 0, 0);
      };

      window.addEventListener("scroll", () => {
        const scrollTop = html.scrollTop;
        const maxScrollTop = html.scrollHeight - window.innerHeight;
        const scrollFraction = scrollTop / maxScrollTop;
        const frameIndex = Math.min(
          frameCount - 1,
          Math.ceil(scrollFraction * frameCount)
        );

        requestAnimationFrame(() => updateImage(frameIndex + 1));
      });

      preloadImages();

      // window.addEventListener("scroll", () => {
      //   const scrollProgress = window.scrollY / totalScroll;
      //   const textPosition = -scrollProgress * (totalScroll - textWidth);

      //   scrollText.style.transform = `translateX(${textPosition}px)`;
      //   scrollText.style.opacity = 1 - scrollProgress;
      // });

      // const updateTextPosition = () => {
      //   const scrollY = window.scrollY;
      //   const scrollDelta = scrollY - lastKnownScrollY;
      //   lastKnownScrollY = scrollY;

      //   textPosition += scrollDelta;
      //   if (textPosition < -textWidth) {
      //     textPosition = totalScroll;
      //   }
      //   if (textPosition > totalScroll) {
      //     textPosition = -textWidth;
      //   }

      //   scrollText.style.transform = `translateX(${textPosition}px)`;
      //   scrollText.style.opacity = 1 - Math.abs(textPosition / (textWidth * 2));

      //   animationFrameId = requestAnimationFrame(updateTextPosition);
      // };

      // updateTextPosition(); // Start animation loop

      // return () => {
      //   cancelAnimationFrame(animationFrameId); // Clean up animation frame
      // };
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <script src="/animation.js" /> */}
      </Head>
      <canvas id="hero-lightpass">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <TextScroll />
    </>
  );
}