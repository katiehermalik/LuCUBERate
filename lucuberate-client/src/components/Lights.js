function Lights() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[2, 10, 0]} intensity={1.5} />
      <pointLight position={[2, 10, 20]} intensity={1.5} />
      <pointLight position={[10, 0, -20]} intensity={0.5} />
    </>
  )
}

export default Lights;