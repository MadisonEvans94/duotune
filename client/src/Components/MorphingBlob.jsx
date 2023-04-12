import React from "react";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import colors from "../utils/colorPalette";
const MorphingBlob = () => {
	return (
		<Sphere visible args={[1, 100, 200]} scale={2}>
			<MeshDistortMaterial
				color={colors.accent}
				attach="material"
				distort={0.3}
				speed={2}
				roughness={0.01}
			/>
		</Sphere>
	);
};

export default MorphingBlob;
