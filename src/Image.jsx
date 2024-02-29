import React, { useEffect, useMemo, useState } from "react";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { Uniform } from "three";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";

export const Image = () => {
  const [currentWall, setCurrentWall] = useState("/brick.webp");
  const [nextWall, setNextWall] = useState("/brick.webp");

  const texture1 = useTexture("/env.webp");

  const uniforms = useMemo(
    () => ({
      uEnvironment: new Uniform(texture1),
      uImageBrick1: new Uniform(),
      uImageBrick2: new Uniform(),
      uProgress: new Uniform(0),
    }),
    []
  );

  useTexture([currentWall, nextWall], (textures) => {
    uniforms.uImageBrick1.value = textures[0];
    uniforms.uImageBrick2.value = textures[1];
  });

  const test = useControls({
    wallType: {
      options: {
        brick: "/brick.webp",
        brick2: "/brick2.webp",
        plaster: "/plaster.webp",
        wood: "/wood.webp",
      },
      onChange: (e) => {
        setCurrentWall(nextWall);
        setNextWall(e);
        gsap.fromTo(uniforms.uProgress, { value: 0 }, { value: 1, ease: "linear" });
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
