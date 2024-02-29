import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Image } from "./Image";

function App() {
  return (
    <Container>
      <Canvas>
        <OrthographicCamera position={[0, 0, 1]} left={-0.5} right={0.5} top={0.5} bottom={-0.5} makeDefault manual />
        <Image />
      </Canvas>
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100svw;
  height: 100svh;
`;
