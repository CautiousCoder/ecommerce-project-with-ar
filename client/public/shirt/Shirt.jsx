/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 shirt.gltf 
Author: CTR Design (https://sketchfab.com/continuumreed)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/shirt-scott-alt-2-game-ready-80e8c3ff182240518f5b9dd34bc541bc
Title: Shirt: Scott Alt 2 - Game-Ready
*/

import { useGLTF } from "@react-three/drei";
import React from "react";

export default function Model(props) {
  const { nodes, materials } = useGLTF("/shirt/shirt.gltf");
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.Object_396.geometry}
            material={materials.Lining}
            skeleton={nodes.Object_396.skeleton}
          />
          <skinnedMesh
            geometry={nodes.Object_398.geometry}
            material={materials.Shirt}
            skeleton={nodes.Object_398.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/shirt/shirt.gltf");
