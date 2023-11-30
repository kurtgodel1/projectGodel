import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store/store'; // Update the path as needed
import { fetchGraphData } from '../store/actions/graphDataActions'; // Update the path as needed

// Map Redux state to component props
const mapStateToProps = (state: RootState) => ({
  graphData: state.graphData
});

// Map Redux actions to component props
const mapDispatchToProps = { fetchGraphData };

// Create a connector
const connector = connect(mapStateToProps, mapDispatchToProps);

// Infer props from the connector
type PropsFromRedux = ConnectedProps<typeof connector>;

// Define component props type
type ThreeDSurfaceGraphProps = PropsFromRedux & {
  width: number;
  height: number;
};

const ThreeDSurfaceGraph: React.FC<ThreeDSurfaceGraphProps> = ({ width, height, graphData, fetchGraphData }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchGraphData();
  }, [fetchGraphData]);

  useEffect(() => {
    if (!graphData.data) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const { x, y, z } = graphData.data;
    const vertices = [];
    for (let i = 0; i < x.length - 1; i++) {
      for (let j = 0; j < y[i].length - 1; j++) {
        vertices.push(x[i][j], z[i][j], y[i][j]);
        vertices.push(x[i + 1][j], z[i + 1][j], y[i + 1][j]);
        vertices.push(x[i][j + 1], z[i][j + 1], y[i][j + 1]);

        vertices.push(x[i + 1][j], z[i + 1][j], y[i + 1][j]);
        vertices.push(x[i + 1][j + 1], z[i + 1][j + 1], y[i + 1][j + 1]);
        vertices.push(x[i][j + 1], z[i][j + 1], y[i][j + 1]);
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const surface = new THREE.Mesh(geometry, material);
    scene.add(surface);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const currentRef = mountRef.current;

  return () => {
    currentRef?.removeChild(renderer.domElement);
  };
  }, [graphData, width, height]);

  return <div ref={mountRef} style={{ width, height }} />;
};


export default connector(ThreeDSurfaceGraph);