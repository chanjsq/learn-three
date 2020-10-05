<template>
  <div class="demo02">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let renderer;
let camera;
let scene;

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
      const far = 1000;

      // 定义渲染器
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setClearColor('#e6e7e9');
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(devicePixelRatio);

      // 定义相机
      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(10, 10, 50);

      // 定义场景
      scene = new THREE.Scene();

      // 加载模型
      {
        const loader = new GLTFLoader();
        loader.load('/models/low_poly_well/scene.gltf', (gltf) => {
          scene.add(gltf.scene);
          this.render();
        });
      }

      // 添加户外光
      const light = new THREE.DirectionalLight('#ffffff');
      const envLight = new THREE.AmbientLight('#404040');
      light.position.set(-1, 2, 4);
      scene.add(light);
      scene.add(envLight);

      // 渲染
      this.render();

      // 设置轨道控制
      const controls = new OrbitControls(camera, canvas);
      controls.addEventListener('change', this.render);
    },
    render() {
      renderer.render(scene, camera);
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
