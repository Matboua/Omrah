import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation/makkah.json"; // adjust the path as needed

const MyLottieAnimation = () => {
	return (
		<div className="w-[500px]">
			<Lottie animationData={animationData} loop={true} autoplay={true} />
		</div>
	);
};

export default MyLottieAnimation;
