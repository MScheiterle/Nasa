import React, { useEffect } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";
import countries from "./../../static_data/geography-data.json";
import "./style.scss";

function Homepage() {
  useEffect(() => {
    var renderer, camera, scene, scale;
    var Globe;

    var myCanvas = document.getElementById("globe");

    init();
    initGlobe();
    onWindowResize();
    animate();

    // SECTION Initializing core ThreeJS elements
    function init() {
      // Initialize renderer
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Initialize scene, light
      scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));

      // Initialize camera, light
      camera = new THREE.PerspectiveCamera();
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      var dLight = new THREE.DirectionalLight(0xffffff, 0.8);
      dLight.position.set(-800, 2000, 400);
      camera.add(dLight);

      var dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
      dLight1.position.set(-200, 500, 200);
      camera.add(dLight1);

      var dLight2 = new THREE.PointLight(0x8566cc, 0.5);
      dLight2.position.set(-200, 500, 200);
      camera.add(dLight2);

      camera.position.z = 270;
      camera.position.x = -50;
      camera.position.y = 50;

      scene.add(camera, renderer.domElement);

      window.addEventListener("resize", onWindowResize, false);
    }

    function initGlobe() {
      // SECTION Globe
      Globe = new ThreeGlobe({
        waitForGlobeReady: true,
        animateIn: true,
      })
        .hexPolygonsData(countries[0].features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(false)
        .hexPolygonColor(() => {
          return 0xf7f3f2;
        });

      const globeMaterial = Globe.globeMaterial();
      globeMaterial.transparent = true;
      globeMaterial.opacity = 0;

      Globe.name = "Globe";
      Globe.rotation.y += 20.5;
      scene.add(Globe);
    }

    function onWindowResize() {
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      scale = ((window.innerWidth < 870) ? window.innerWidth : 870);
      renderer.setSize(scale, scale);
    }

    function animate() {
      try {
        let Globe = scene.getObjectByName("Globe");
        Globe.rotation.y += 0.0008;
      } catch {}
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
  });

  return (
    <div className="Homepage">
      <h1 className="name">
        Simpl1f1ed<span style={{ color: "#c1678b" }}>_</span>
      </h1>
      <p className="description">
        Front and Back End Developer • Applications and Graphics Hobbiest •
        Intelligence Enthusiast
      </p>
      <canvas id="globe"></canvas>
    </div>
  );
}

export default Homepage;
