import Laptop from "../../public/laptop/Laptop";

const Three = () => {
  return (
    <>
      {/* Geometry Shape */}
      {/* <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={"#ffffff"} />
      </mesh> */}

      {/* Ambient Light */}
      <ambientLight args={["#ffffff", 1]} />

      <Laptop />
    </>
  );
};
export default Three;
