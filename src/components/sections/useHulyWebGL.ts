import { useEffect, useRef, MutableRefObject } from 'react';
import * as THREE from 'three';
import { vertexShader, fragmentShader } from './shaders';

interface HulyWebGLProps {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  cardRef: MutableRefObject<HTMLDivElement | null>;
  preset?: keyof typeof PRESETS;
}

export const PRESETS = {
  indigo: {
    beam: [0.89, 0.56, 1.0],
    bleed: [0.85, 0.15, 0.95],
    scatter: [0.08, 0.18, 0.45],
    chromatic_offset: 0.038,
    bleed_glow_width: 0.13,
    bleed_falloff: 1.2,
    red_diffusion: 2.0,
    blue_diffusion: 0.6,
    refract_saturation: 0.22,
    attachment_width: 0.006,
    attachment_height: 0.12,
  },
  amber: {
    beam: [1.0, 0.48, 0.12],
    bleed: [0.95, 0.12, 0.2],
    scatter: [0.38, 0.12, 0.04],
    chromatic_offset: 0.022,
    bleed_glow_width: 0.22,
    bleed_falloff: 1.6,
    red_diffusion: 2.5,
    blue_diffusion: 0.8,
    refract_saturation: 0.95,
    attachment_width: 0.045,
    attachment_height: 0.18,
  },
  matrix: {
    beam: [0.12, 0.95, 0.38],
    bleed: [0.05, 0.45, 0.92],
    scatter: [0.03, 0.32, 0.12],
    chromatic_offset: 0.001,
    bleed_glow_width: 0.4,
    bleed_falloff: 0.5,
    red_diffusion: 1.0,
    blue_diffusion: 0.9,
    refract_saturation: 1.0,
    attachment_width: 0.001,
    attachment_height: 0.35,
  },
  vapor: {
    beam: [0.95, 0.35, 0.72],
    bleed: [0.22, 0.85, 1.0],
    scatter: [0.28, 0.12, 0.38],
    chromatic_offset: 0.028,
    bleed_glow_width: 0.24,
    bleed_falloff: 1.2,
    red_diffusion: 2.8,
    blue_diffusion: 1.1,
    refract_saturation: 1.1,
    attachment_width: 0.019,
    attachment_height: 0.13,
  },
};

export function useHulyWebGL({ containerRef, cardRef, preset = 'amber' }: HulyWebGLProps) {
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    let container = containerRef.current;
    let htmlCard = cardRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const initialPreset = PRESETS[preset];

    // Uniforms
    const uniforms = {
      u_resolution: { value: new THREE.Vector2() },
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_card_center: { value: new THREE.Vector2(0.0, 0.0) },
      u_card_half_size: { value: new THREE.Vector2(0.2, 0.2) },
      u_card_roundness: { value: 0.03 },
      
      u_beam_width: { value: 0.007 },
      u_beam_glow: { value: 0.85 },
      u_attachment_width: { value: initialPreset.attachment_width },
      u_attachment_height: { value: initialPreset.attachment_height },
      u_attachment_power: { value: 1.5 },
      u_bleed_distortion: { value: 0.05 },
      u_chromatic_offset: { value: initialPreset.chromatic_offset },
      u_bleed_glow_width: { value: initialPreset.bleed_glow_width },
      u_bleed_falloff: { value: initialPreset.bleed_falloff },
      u_flow_speed: { value: 2.5 },
      u_fog_density: { value: 1.0 },
      u_perf_low: { value: 0 },
      
      u_red_diffusion: { value: initialPreset.red_diffusion },
      u_blue_diffusion: { value: initialPreset.blue_diffusion },
      u_refract_saturation: { value: initialPreset.refract_saturation },
      
      u_toggle_beam: { value: 1.0 },
      u_toggle_bleed: { value: 1.0 },
      u_toggle_scatter: { value: 1.0 },
      u_toggle_funnel: { value: 1.0 },
      
      u_col_beam: { value: new THREE.Vector3(...initialPreset.beam) },
      u_col_bleed: { value: new THREE.Vector3(...initialPreset.bleed) },
      u_col_scatter: { value: new THREE.Vector3(...initialPreset.scatter) },
    };
    
    uniformsRef.current = uniforms;

    // Mesh setup
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniforms,
      depthWrite: false,
      depthTest: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    
    // Clear container and append new canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);
    
    uniforms.u_resolution.value.set(renderer.domElement.width, renderer.domElement.height);

    // Helpers
    const updateCardSDFUniforms = () => {
      if (!htmlCard || !container) return;
      
      const cardRect = htmlCard.getBoundingClientRect();
      const canvasRect = container.getBoundingClientRect();
      const canvasWidth = canvasRect.width;
      const canvasHeight = canvasRect.height;
      
      const widthUV = cardRect.width / canvasHeight;
      const heightUV = cardRect.height / canvasHeight;
      
      const centerX = (cardRect.left + cardRect.width / 2.0 - (canvasRect.left + canvasWidth / 2.0)) / canvasHeight;
      const centerY = -(cardRect.top + cardRect.height / 2.0 - (canvasRect.top + canvasHeight / 2.0)) / canvasHeight;
      
      uniforms.u_card_half_size.value.set(widthUV / 2.0, heightUV / 2.0);
      uniforms.u_card_center.value.set(centerX, centerY);
      
      const computedStyle = window.getComputedStyle(htmlCard);
      const borderRadiusPixel = parseFloat(computedStyle.borderRadius) || 16;
      uniforms.u_card_roundness.value = borderRadiusPixel / canvasHeight;
    };

    updateCardSDFUniforms();

    // Interaction
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    let currentMouse = new THREE.Vector2(0.5, 0.5);

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouse.x = e.touches[0].clientX / window.innerWidth;
        targetMouse.y = 1.0 - (e.touches[0].clientY / window.innerHeight);
      }
    };

    const handleResize = () => {
      if (!container || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.u_resolution.value.set(renderer.domElement.width, renderer.domElement.height);
      updateCardSDFUniforms();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;
      uniforms.u_mouse.value.copy(currentMouse);
      
      const time = performance.now() * 0.001;
      uniforms.u_time.value = time;
      
      renderer.render(scene, camera);
      updateCardSDFUniforms(); // Keep updating in case card moves
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
      
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [containerRef, cardRef, preset]);

  const updateUniform = (key: string, value: any) => {
    if (uniformsRef.current && uniformsRef.current[key]) {
      uniformsRef.current[key].value = value;
    }
  };

  const updateColor = (key: string, hex: string) => {
    if (uniformsRef.current && uniformsRef.current[key]) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      uniformsRef.current[key].value.set(r, g, b);
    }
  };

  return { updateUniform, updateColor };
}
