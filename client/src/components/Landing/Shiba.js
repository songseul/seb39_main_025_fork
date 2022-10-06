/* eslint-disable */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: zixisun02 (https://sketchfab.com/zixisun51)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/shiba-faef9fe5ace445e7b2989d1c1ece361c
title: Shiba
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model(props) {
  const { nodes, materials } = useGLTF('/shiba.gltf');
  return (
    <group {...props} dispose={null} scale={3}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Group18985_default_0.geometry}
              material={materials['default']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Box002_default_0.geometry}
              material={materials['default']}
            />
          </group>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={nodes.Object001_default_0.geometry}
              material={materials['default']}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/shiba.gltf');
