import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { educationalComps } from "../../../Constants";

import "./style.scss";

let clock = new THREE.Clock();

function CubePane(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const navigate = useNavigate();

  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const [depth] = useState(Math.random() * (0.1 - 0) + 0);

  useFrame(() => {
    
  });

  const baseMaterial = new THREE.MeshPhongMaterial({
    color: props.color
      ? props.color
      : hovered || clicked
      ? "#c1678b"
      : "#f7f3f2",
  });

  const font = useLoader(FontLoader, "/fonts/STIX-Two-Text-SemiBold-Italic.json");
  const textGeometry = new TextGeometry(props.symbol, {
    font: font,
    size: 0.5,
    height: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0,
    bevelOffset: 0,
    bevelSegments: 1,
  });

  // compute the center of the TextGeometry
  const center = new THREE.Vector3();
  textGeometry.computeBoundingBox();
  textGeometry.boundingBox.getCenter(center);

  // shift the TextGeometry to the origin
  textGeometry.translate(-center.x, -center.y, -center.z);

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        {...props}
        onClick={(event) => {
          if (!props.color) navigate("/" + props.name);
          event.stopPropagation();
        }}
        onPointerOver={(event) => {
          hover(true);
          event.stopPropagation();
        }}
        onPointerOut={(event) => {
          hover(false);
          event.stopPropagation();
        }}
        onPointerMissed={(event) => {
          click(false);
          event.stopPropagation();
        }}
        material={baseMaterial}
      >
        <boxGeometry args={[1, 1, !clicked ? depth : depth + 0.5]} />
      </mesh>
      <mesh
        ref={ref}
        position={props.position}
        rotation={props.rotation}
        geometry={textGeometry}
      >
        <meshBasicMaterial
          color={
            props.color ? "#f7f3f2" : hovered || clicked ? "#f7f3f2" : "#c1678b"
          }
        />
      </mesh>
    </>
  );
}

function Cube() {
  const box = useRef();

  useFrame(() => {
    box.current.rotation.y += 0.001;
    const time = clock.getElapsedTime();
    box.current.position.y = Math.cos(time) * 0.4;
  });

  const sides = [];
  let count = 0;

  // front/back sides
  for (let x = 0; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      for (let z = -1; z < 2; z++) {
        sides.push(
          <CubePane
            key={"FBX" + x + "Y" + y + "Z" + z}
            sides={"FB"}
            position={[y, z, x ? 1.5 * -1 : 1.5]}
            color={z === 0 && y === 0 ? "#1f2022" : ""}
            symbol={educationalComps.Elementary[count].symbol}
            name={educationalComps.Elementary[count].name}
          />
        );
        if (z === 0 && y === 0) count--;
        count++;
      }
    }
    count = 0;
  }

  // left/right sides
  count = 0;
  for (let x = 0; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      for (let z = -1; z < 2; z++) {
        sides.push(
          <CubePane
            key={"LRX" + x + "Y" + y + "Z" + z}
            sides={"LR"}
            position={[x ? 1.5 * -1 : 1.5, y, z]}
            rotation={[0, Math.PI / 2, 0]}
            color={z === 0 && y === 0 ? "#1f2022" : ""}
            symbol={educationalComps.MiddleEducation[count].symbol}
            name={educationalComps.MiddleEducation[count].name}
          />
        );
        if (z === 0 && y === 0) count--;
        count++;
      }
    }
    count = 0;
  }

  // top/bottom sides
  count = 0;
  for (let x = 0; x < 2; x++) {
    for (let y = -1; y < 2; y++) {
      for (let z = -1; z < 2; z++) {
        sides.push(
          <CubePane
            key={"TBX" + x + "Y" + y + "Z" + z}
            sides={"TB"}
            position={[z, x ? 1.5 * -1 : 1.5, y]}
            rotation={[Math.PI / 2, 0, 0]}
            color={z === 0 && y === 0 ? "#1f2022" : ""}
            symbol={educationalComps.HigherEducation[count].symbol}
            name={educationalComps.HigherEducation[count].name}
          />
        );
        if (z === 0 && y === 0) count--;
        count++;
      }
    }
    count = 0;
  }

  return <mesh ref={box}>{sides}</mesh>;
}

export default function QuickMathsHome() {
  return (
    <div id="QuickMathsHome">
      <Canvas camera={{ fov: 75, position: [10, 0, 0] }}>
        <ambientLight intensity={0.25} />
        <spotLight position={[8, 10, 8]} angle={0.2} penumbra={1} />
        <spotLight position={[-5, -23, -8]} angle={0.2} penumbra={1} />
        <Cube />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={1}
          maxPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
