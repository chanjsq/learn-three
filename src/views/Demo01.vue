<template>
  <div class="demo01">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let renderer;
let camera;
let scene;
let cube;

export default {
  mounted() {
    this.init();
  },

  methods: {
    init() {
      const { canvas } = this.$refs;
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      const fov = 75;
      const aspect = innerWidth / innerHeight;
      const near = 0.1;
      const far = 2000;

      // 定义渲染器
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setClearColor('#e6e7e9');
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio);

      // 定义相机
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 5;

      // 定义场景
      scene = new THREE.Scene();

      // 添加立方体
      {
        const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: '#ff9900' });
        cube = new THREE.Mesh(geometry, material);
        scene.rotation.set(0.3, 0.3, 0);
        scene.add(cube);
      }

      // 添加户外光
      const light = new THREE.DirectionalLight('#ffffff');
      const envLight = new THREE.AmbientLight('#404040');
      light.position.set(-1, 2, 4);
      scene.add(light);
      scene.add(envLight);

      // 渲染
      renderer.render(scene, camera);

      // 动画
      this.animate();

      // 设置轨道控制
      const controls = new OrbitControls(camera, canvas);
      controls.addEventListener('change', () => renderer.render(scene, camera));
    },
    animate() {
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100vw;
  height: 100vh;
}
</style>
