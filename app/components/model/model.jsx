import { animate, useReducedMotion } from 'framer-motion';
import { useInViewport } from '~/hooks';
import {
  createRef,
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshDepthMaterial,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderTarget,
  WebGLRenderer,
} from 'three';
import { HorizontalBlurShader, VerticalBlurShader } from 'three-stdlib';
import { resolveSrcFromSrcSet } from '~/utils/image';
import { classes, cssProps, numToMs } from '~/utils/style';
import {
  cleanRenderer,
  cleanScene,
  modelLoader,
  removeLights,
  textureLoader,
} from '~/utils/three';
import { ModelAnimationType } from './device-models';
import styles from './model.module.css';

const MeshType = {
  Frame: 'Frame',
  Logo: 'Logo',
  Screen: 'Screen',
};

export const Model = ({
  models,
  show = true,
  showDelay = 0,
  cameraPosition = { x: 0, y: 0, z: 8 },
  style,
  className,
  onLoad,
  alt,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);
  const container = useRef();
  const canvas = useRef();
  const camera = useRef();
  const modelGroup = useRef();
  const scene = useRef();
  const renderer = useRef();
  const shadowGroup = useRef();
  const renderTarget = useRef();
  const renderTargetBlur = useRef();
  const shadowCamera = useRef();
  const depthMaterial = useRef();
  const horizontalBlurMaterial = useRef();
  const verticalBlurMaterial = useRef();
  const plane = useRef();
  const lights = useRef();
  const blurPlane = useRef();
  const fillPlane = useRef();
  const isInViewport = useInViewport(container, false, { threshold: 0.2 });
  const reduceMotion = useReducedMotion();
  const toggleHandlersRef = useRef({});

  const isLaptop = models.some(m => m.animation === ModelAnimationType.LaptopOpen);
  const isPhone = models.some(
    m => m.animation === ModelAnimationType.PhoneOpen || m.animation === ModelAnimationType.SpringUp
  );
  const isInteractive = isLaptop || isPhone;

  const handleModelClick = useCallback(() => {
    Object.values(toggleHandlersRef.current).forEach(fn => fn?.());
  }, []);

  const registerToggleHandler = useCallback((index, fn) => {
    toggleHandlersRef.current[index] = fn;
  }, []);

  useEffect(() => {
    const { clientWidth, clientHeight } = container.current;

    renderer.current = new WebGLRenderer({
      canvas: canvas.current,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
      failIfMajorPerformanceCaveat: true,
    });

    const pixelRatio = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5);
    renderer.current.setPixelRatio(pixelRatio);
    renderer.current.setSize(clientWidth, clientHeight);
    renderer.current.outputColorSpace = SRGBColorSpace;

    camera.current = new PerspectiveCamera(36, clientWidth / clientHeight, 0.1, 100);
    camera.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    scene.current = new Scene();

    modelGroup.current = new Group();
    scene.current.add(modelGroup.current);

    // Lighting
    const ambientLight = new AmbientLight(0xffffff, 1.2);
    const keyLight = new DirectionalLight(0xffffff, 1.1);
    const fillLight = new DirectionalLight(0xffffff, 0.8);

    fillLight.position.set(-6, 2, 2);
    keyLight.position.set(0.5, 0, 0.866);
    lights.current = [ambientLight, keyLight, fillLight];
    lights.current.forEach(light => scene.current.add(light));

    // Shadow container
    shadowGroup.current = new Group();
    scene.current.add(shadowGroup.current);
    shadowGroup.current.position.set(0, 0, -0.8);
    shadowGroup.current.rotateX(Math.PI / 2);

    const renderTargetSize = 256;
    const planeWidth = 8;
    const planeHeight = 8;
    const cameraHeight = 1.5;
    const shadowOpacity = 0.8;
    const shadowDarkness = 3;

    renderTarget.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTarget.current.texture.generateMipmaps = false;

    renderTargetBlur.current = new WebGLRenderTarget(renderTargetSize, renderTargetSize);
    renderTargetBlur.current.texture.generateMipmaps = false;

    const planeGeometry = new PlaneGeometry(planeWidth, planeHeight).rotateX(Math.PI / 2);

    const planeMaterial = new MeshBasicMaterial({
      map: renderTarget.current.texture,
      opacity: shadowOpacity,
      transparent: true,
    });

    plane.current = new Mesh(planeGeometry, planeMaterial);
    plane.current.scale.y = -1;
    shadowGroup.current.add(plane.current);

    blurPlane.current = new Mesh(planeGeometry);
    blurPlane.current.visible = false;
    shadowGroup.current.add(blurPlane.current);

    const fillMaterial = new MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0,
      transparent: true,
    });

    fillPlane.current = new Mesh(planeGeometry, fillMaterial);
    fillPlane.current.rotateX(Math.PI);
    fillPlane.current.position.y -= 0.00001;
    shadowGroup.current.add(fillPlane.current);

    shadowCamera.current = new OrthographicCamera(
      -planeWidth / 2,
      planeWidth / 2,
      planeHeight / 2,
      -planeHeight / 2,
      0,
      cameraHeight
    );
    shadowCamera.current.rotation.x = Math.PI / 2;
    shadowGroup.current.add(shadowCamera.current);

    depthMaterial.current = new MeshDepthMaterial();
    depthMaterial.current.userData.darkness = { value: shadowDarkness };
    depthMaterial.current.onBeforeCompile = shader => {
      shader.uniforms.darkness = depthMaterial.current.userData.darkness;
      shader.fragmentShader = `
        uniform float darkness;
        ${shader.fragmentShader.replace(
          'gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );',
          'gl_FragColor = vec4( vec3( 0.0 ), ( 1.0 - fragCoordZ ) * darkness );'
        )}
      `;
    };
    depthMaterial.current.depthTest = false;
    depthMaterial.current.depthWrite = false;

    horizontalBlurMaterial.current = new ShaderMaterial(HorizontalBlurShader);
    horizontalBlurMaterial.current.depthTest = false;

    verticalBlurMaterial.current = new ShaderMaterial(VerticalBlurShader);
    verticalBlurMaterial.current.depthTest = false;

    return () => {
      renderTarget.current?.dispose();
      renderTargetBlur.current?.dispose();
      removeLights(lights.current);
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const blurShadow = useCallback(amount => {
    if (!renderer.current || !renderTarget.current || !renderTargetBlur.current || !blurPlane.current) return;
    blurPlane.current.visible = true;

    blurPlane.current.material = horizontalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTarget.current.texture;
    horizontalBlurMaterial.current.uniforms.h.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTargetBlur.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    blurPlane.current.material = verticalBlurMaterial.current;
    blurPlane.current.material.uniforms.tDiffuse.value = renderTargetBlur.current.texture;
    verticalBlurMaterial.current.uniforms.v.value = amount * (1 / 256);

    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(blurPlane.current, shadowCamera.current);

    blurPlane.current.visible = false;
  }, []);

  // Update shadow depth map once on model load or resize
  const updateShadow = useCallback(() => {
    if (!renderer.current || !scene.current || !shadowCamera.current || !renderTarget.current) return;
    const blurAmount = 5;

    const initialBackground = scene.current.background;
    scene.current.background = null;
    scene.current.overrideMaterial = depthMaterial.current;

    renderer.current.setRenderTarget(renderTarget.current);
    renderer.current.render(scene.current, shadowCamera.current);

    scene.current.overrideMaterial = null;

    blurShadow(blurAmount);
    blurShadow(blurAmount * 0.4);

    renderer.current.setRenderTarget(null);
    scene.current.background = initialBackground;
  }, [blurShadow]);

  // Fast single-pass frame rendering for smooth animations
  const renderFrame = useCallback(() => {
    if (!renderer.current || !scene.current || !camera.current) return;

    renderer.current.render(scene.current, camera.current);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!container.current || !renderer.current || !camera.current) return;

      const { clientWidth, clientHeight } = container.current;
      if (clientWidth === 0 || clientHeight === 0) return;

      renderer.current.setSize(clientWidth, clientHeight);
      camera.current.aspect = clientWidth / clientHeight;
      camera.current.updateProjectionMatrix();

      updateShadow();
      renderFrame();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderFrame, updateShadow]);

  return (
    <div
      className={classes(styles.model, className)}
      data-loaded={loaded}
      style={{
        ...cssProps({ delay: numToMs(showDelay) }, style),
        cursor: isInteractive ? 'pointer' : 'default',
      }}
      ref={container}
      role="img"
      aria-label={alt}
      title={
        isLaptop
          ? 'Click laptop to close or open'
          : isPhone
          ? 'Click phones to stack or fan out'
          : undefined
      }
      onClick={handleModelClick}
      {...rest}
    >
      <canvas className={styles.canvas} ref={canvas} />
      {models.map((model, index) => (
        <Device
          key={JSON.stringify(model.position)}
          renderer={renderer}
          modelGroup={modelGroup}
          show={show}
          showDelay={showDelay}
          renderFrame={renderFrame}
          updateShadow={updateShadow}
          registerToggleHandler={registerToggleHandler}
          index={index}
          setLoaded={setLoaded}
          onLoad={onLoad}
          model={model}
        />
      ))}
    </div>
  );
};

const Device = ({
  renderer,
  model,
  modelGroup,
  renderFrame,
  updateShadow,
  registerToggleHandler,
  index,
  showDelay,
  setLoaded,
  onLoad,
  show,
}) => {
  const [loadDevice, setLoadDevice] = useState();
  const reduceMotion = useReducedMotion();
  const placeholderScreen = createRef();
  const frameNodeRef = useRef();
  const sceneRef = useRef();
  const isLidOpenRef = useRef(true);
  const isFannedOutRef = useRef(true);
  const activeAnimRef = useRef();

  const isLaptop = model.animation === ModelAnimationType.LaptopOpen;
  const isPhone =
    model.animation === ModelAnimationType.PhoneOpen ||
    model.animation === ModelAnimationType.SpringUp;

  // Interactive toggle laptop lid open / close
  const toggleLaptopLid = useCallback(() => {
    if (!frameNodeRef.current) return;
    const frameNode = frameNodeRef.current;

    activeAnimRef.current?.stop();

    const currentRotation = frameNode.rotation.x;
    const willOpen = !isLidOpenRef.current;
    const targetRotation = willOpen ? 0 : MathUtils.degToRad(88);
    isLidOpenRef.current = willOpen;

    activeAnimRef.current = animate(currentRotation, targetRotation, {
      type: 'spring',
      stiffness: 85,
      damping: 15,
      mass: 1,
      restSpeed: 0.0001,
      restDelta: 0.0001,
      onUpdate: val => {
        if (frameNodeRef.current) {
          frameNodeRef.current.rotation.x = val;
          renderFrame();
        }
      },
      onComplete: () => {
        if (frameNodeRef.current) {
          frameNodeRef.current.rotation.x = targetRotation;
          renderFrame();
        }
      },
    });
  }, [renderFrame]);

  // Interactive toggle dual phones stack / fan-out
  const togglePhoneStack = useCallback(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    activeAnimRef.current?.stop();

    const willFanOut = !isFannedOutRef.current;
    isFannedOutRef.current = willFanOut;

    const startX = scene.position.x;
    const startY = scene.position.y;
    const startZ = scene.position.z;

    const endX = willFanOut ? model.position.x : 0;
    const endY = willFanOut ? model.position.y : (index === 0 ? 0.1 : -0.1);
    const endZ = willFanOut ? model.position.z : (index === 1 ? 0.4 : 0);

    activeAnimRef.current = animate(0, 1, {
      type: 'spring',
      stiffness: 80,
      damping: 16,
      mass: 1,
      restSpeed: 0.0001,
      restDelta: 0.0001,
      onUpdate: progress => {
        if (sceneRef.current) {
          sceneRef.current.position.x = MathUtils.lerp(startX, endX, progress);
          sceneRef.current.position.y = MathUtils.lerp(startY, endY, progress);
          sceneRef.current.position.z = MathUtils.lerp(startZ, endZ, progress);
          renderFrame();
        }
      },
      onComplete: () => {
        if (sceneRef.current) {
          sceneRef.current.position.set(endX, endY, endZ);
          renderFrame();
        }
      },
    });
  }, [index, model.position.x, model.position.y, model.position.z, renderFrame]);

  useEffect(() => {
    if (isLaptop && registerToggleHandler) {
      registerToggleHandler(index, toggleLaptopLid);
    }
    if (isPhone && registerToggleHandler) {
      registerToggleHandler(index, togglePhoneStack);
    }
  }, [index, isLaptop, isPhone, registerToggleHandler, toggleLaptopLid, togglePhoneStack]);

  useEffect(() => {
    const applyScreenTexture = async (texture, node) => {
      texture.colorSpace = SRGBColorSpace;
      texture.flipY = false;
      texture.anisotropy = renderer.current.capabilities.getMaxAnisotropy();
      texture.generateMipmaps = false;

      await renderer.current.initTexture(texture);

      node.material.color = new Color(0xffffff);
      node.material.transparent = true;
      node.material.map = texture;
    };

    const load = async () => {
      const { texture, position, url } = model;
      let loadFullResTexture;
      let playAnimation;

      const [placeholder, gltf] = await Promise.all([
        await textureLoader.loadAsync(texture.placeholder),
        await modelLoader.loadAsync(url),
      ]);

      sceneRef.current = gltf.scene;
      modelGroup.current.add(gltf.scene);

      gltf.scene.traverse(async node => {
        if (node.material) {
          node.material.color = new Color(0x1f2025);
        }

        if (node.name === MeshType.Frame) {
          frameNodeRef.current = node;
        }

        if (node.name === MeshType.Screen) {
          placeholderScreen.current = node.clone();
          placeholderScreen.current.material = node.material.clone();
          node.parent.add(placeholderScreen.current);
          placeholderScreen.current.material.opacity = 1;
          placeholderScreen.current.position.z += 0.001;

          applyScreenTexture(placeholder, placeholderScreen.current);

          loadFullResTexture = async () => {
            const image = await resolveSrcFromSrcSet(texture);
            const fullSize = await textureLoader.loadAsync(image);
            await applyScreenTexture(fullSize, node);

            animate(1, 0, {
              onUpdate: value => {
                placeholderScreen.current.material.opacity = value;
                renderFrame();
              },
            });
          };
        }
      });

      const targetPosition = new Vector3(position.x, position.y, position.z);

      if (reduceMotion) {
        gltf.scene.position.set(...targetPosition.toArray());
      }

      // Phone 3D fan-out & unfold open animation
      if (
        model.animation === ModelAnimationType.PhoneOpen ||
        model.animation === ModelAnimationType.SpringUp
      ) {
        playAnimation = () => {
          const isLeft = index === 0;
          const startPos = new Vector3(
            targetPosition.x * 0.15,
            targetPosition.y - 1.4,
            targetPosition.z - 0.4
          );
          const startRotY = isLeft ? 0.45 : -0.45;
          const startRotZ = isLeft ? -0.12 : 0.12;

          gltf.scene.position.set(...startPos.toArray());
          gltf.scene.rotation.y = startRotY;
          gltf.scene.rotation.z = startRotZ;
          renderFrame();

          return animate(0, 1, {
            type: 'spring',
            delay: (180 * index + showDelay + 50) / 1000,
            stiffness: 55,
            damping: 15,
            mass: 1,
            restSpeed: 0.0001,
            restDelta: 0.0001,
            onUpdate: progress => {
              gltf.scene.position.x = MathUtils.lerp(startPos.x, targetPosition.x, progress);
              gltf.scene.position.y = MathUtils.lerp(startPos.y, targetPosition.y, progress);
              gltf.scene.position.z = MathUtils.lerp(startPos.z, targetPosition.z, progress);
              gltf.scene.rotation.y = MathUtils.lerp(startRotY, 0, progress);
              gltf.scene.rotation.z = MathUtils.lerp(startRotZ, 0, progress);
              renderFrame();
            },
            onComplete: () => {
              gltf.scene.position.set(...targetPosition.toArray());
              gltf.scene.rotation.set(0, 0, 0);
              isFannedOutRef.current = true;
              renderFrame();
            },
          });
        };
      }

      // Swing the laptop lid open smoothly from closed
      if (model.animation === ModelAnimationType.LaptopOpen) {
        playAnimation = () => {
          const frameNode = frameNodeRef.current || gltf.scene.children.find(
            node => node.name === MeshType.Frame
          );
          if (!frameNode) return;
          frameNodeRef.current = frameNode;

          const startRotation = MathUtils.degToRad(88);
          const endRotation = 0;

          gltf.scene.position.set(...targetPosition.toArray());
          frameNode.rotation.x = startRotation;
          isLidOpenRef.current = false;
          renderFrame();

          return animate(startRotation, endRotation, {
            type: 'spring',
            delay: (200 * index + showDelay + 100) / 1000,
            stiffness: 65,
            damping: 15,
            mass: 1,
            restSpeed: 0.0001,
            restDelta: 0.0001,
            onUpdate: value => {
              if (frameNodeRef.current) {
                frameNodeRef.current.rotation.x = value;
                renderFrame();
              }
            },
            onComplete: () => {
              if (frameNodeRef.current) {
                frameNodeRef.current.rotation.x = 0;
                isLidOpenRef.current = true;
                renderFrame();
              }
            },
          });
        };
      }

      return { loadFullResTexture, playAnimation };
    };

    setLoadDevice({ start: load });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadDevice || !show) return;
    let animation;

    const onModelLoad = async () => {
      const { loadFullResTexture, playAnimation } = await loadDevice.start();

      setLoaded(true);
      updateShadow?.();
      renderFrame();
      onLoad?.();

      if (!reduceMotion) {
        animation = playAnimation();
      }

      await loadFullResTexture();

      if (reduceMotion) {
        renderFrame();
      }
    };

    startTransition(() => {
      onModelLoad();
    });

    return () => {
      animation?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadDevice, show]);
};

export default Model;
