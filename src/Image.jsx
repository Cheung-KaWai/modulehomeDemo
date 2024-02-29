import React, { useMemo } from "react";
import vertex from "./shaders/vertex.glsl";
import fragment from "./shaders/fragment.glsl";
import { Uniform } from "three";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import gsap from "gsap";

export const Image = () => {
  const texture1 = useTexture("/env.webp");
  const texture2 = useTexture("/brick.webp");
  const texture3 = useTexture("/wood.webp");

  const uniforms = useMemo(
    () => ({
      uEnvironment: new Uniform(texture1),
      uImageBrick1: new Uniform(texture2),
      uImageBrick2: new Uniform(texture3),
      uProgress: new Uniform(0),
    }),
    []
  );

  const test = useControls({
    wallType: {
      options: {
        brick: 0,
        wood: 1,
      },
      onChange: (e) => {
        gsap.to(uniforms.uProgress, { value: e, ease: "linear" });
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
