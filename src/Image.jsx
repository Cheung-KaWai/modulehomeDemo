import React, { useEffect, useMemo, useState } from "react";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { Uniform } from "three";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";

export const Image = () => {
  const [walls, setWalls] = useState({
    current: "/brick.webp",
    next: "/brick.webp",
  });

  const texture1 = useTexture("/env.webp");

  const uniforms = useMemo(
    () => ({
      uEnvironment: new Uniform(texture1),
      uImageWall1: new Uniform(),
      uImageWall2: new Uniform(),
      uProgress: new Uniform(1),
      uAnimationStyle: new Uniform(0),
      uTextureAspectRatio: new Uniform(0),
      uWindowAspectRatio: new Uniform(window.innerWidth / window.innerHeight),
    }),
    []
  );

  useTexture([walls.current, walls.next], (textures) => {
    uniforms.uImageWall1.value = textures[0];
    uniforms.uImageWall2.value = textures[1];
    uniforms.uTextureAspectRatio.value = textures[0].image.width / textures[0].image.height;

    console.log(uniforms);

    gsap.fromTo(uniforms.uProgress, { value: 0 }, { value: 1, ease: "lineair", duration: uniforms.uAnimationStyle.value === 0 ? 1 : 3 });
  });

  useEffect(() => {
    const updateAspectRatio = () => {
      uniforms.uWindowAspectRatio.value = window.innerWidth / window.innerHeight;
    };

    window.addEventListener("resize", updateAspectRatio);

    return () => {
      window.removeEventListener("resize", updateAspectRatio);
    };
  }, []);

  useControls({
    wallType: {
      options: {
        brick: "/brick.webp",
        brick2: "/brick2.webp",
        plaster: "/plaster.webp",
        wood: "/wood.webp",
      },
      onChange: (e) => {
        setWalls((prev) => ({ current: prev.next, next: e }));
      },
    },
    animation: {
      options: {
        default: 0,
        circle: 1,
      },
      onChange: (e) => {
        uniforms.uAnimationStyle.value = e;
      },
    },
  });

  return (
    <mesh>
      <planeGeometry />
      <shaderMaterial vertexShader={vertex} fragmentShader={fragment} uniforms={uniforms} />
    </mesh>
  );
};
