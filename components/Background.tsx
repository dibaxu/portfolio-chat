"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();

      const fov = 75;
      const aspect = 2; // the canvas default
      const near = 0.1;
      const far = 1000;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 75;

      const geometry = new THREE.TorusKnotGeometry(9, 3, 88, 19, 6, 3);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Render the scene and camera
      renderer.render(scene, camera);

      // Add this function inside the useEffect hook
      const renderScene = () => {
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.006;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      // Call the renderScene function to start the animation loop
      renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return <div ref={containerRef} />;
}

//  This component creates a spinning cube using Three.js. The cube is created in the  useEffect  hook, which is called only once when the component is mounted. The cube is rotated in the  animate  function, which is called recursively using  requestAnimationFrame .
//  The  Background  component is used in the  App  component.
