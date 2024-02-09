import { X } from "@mui/icons-material";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import FlexBetween from "../../components/FlexBetween";
// import Three from "../../lib/Three";
// import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Environment, OrbitControls } from "@react-three/drei";
import Laptop from "../../../public/Laptop";

const SimpleDialog = (params) => {
  const { onClose, open } = params;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose();
  };

  // useEffect(() => {
  // const test = new SceneInit("myThreeJsCanvas");
  // test.initialize();
  // test.animate();

  // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
  // const boxMaterial = new THREE.MeshNormalMaterial();
  // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  // test.scene.add(boxMesh);

  // let loadedModel;
  // const glftLoader = new GLTFLoader();
  // glftLoader.load("/assets/laptop/scene.gltf", (gltfScene) => {
  //   loadedModel = gltfScene;
  // console.log(loadedModel);

  // gltfScene.scene.rotation.y = Math.PI / 8;
  // gltfScene.scene.position.y = 3;
  // gltfScene.scene.scale.set(10, 10, 10);
  // test.scene.add(gltfScene.scene);
  // });
  // const animate = () => {
  //   if (loadedModel) {
  //     loadedModel.scene.rotation.x += 0.01;
  //     loadedModel.scene.rotation.y += 0.01;
  //     loadedModel.scene.rotation.z += 0.01;
  //   }
  //   requestAnimationFrame(animate);
  // };
  // animate();
  // }, []);

  return (
    <Dialog
      maxWidth={"1080px"}
      onClose={handleClose}
      open={open}
      sx={{
        "& #three-canvas-container > div > canvas": {
          pt: "20px !important",
        },
      }}
    >
      <FlexBetween>
        <DialogTitle>Product 3D View</DialogTitle>
        <Button
          sx={{ padding: "10px 20px", mr: "20px", backgroundColor: "#f01010" }}
          autoFocus
          onClick={() => handleListItemClick("addAccount")}
        >
          <X />
        </Button>
      </FlexBetween>
      <div id="viewArImage" style={{ width: "780px", height: "520px" }}>
        <Canvas id="three-canvas-container">
          <Suspense fallback={null}>
            {/* <Three /> */}
            <ambientLight args={["#fff", 1]} />
            <hemisphereLight args={["#ffffff", "#ff0", 1]} />
            <pointLight args={["#fff", 1]} />
            <OrbitControls />
            <Laptop />
          </Suspense>
          <Environment preset="forest" background blur={0.5} />
        </Canvas>
      </div>
    </Dialog>
  );
};

export default SimpleDialog;
