
import { useState, useEffect } from "react";
import UseSticky from "../hooks/UseSticky";

const ScrollToTop = () => {
	const { sticky }: { sticky: boolean } = UseSticky();

	const [showScroll, setShowScroll] = useState(false);

	const checkScrollTop = () => {
		if (!showScroll && window.pageYOffset > 400) {
			setShowScroll(true);
		} else if (showScroll && window.pageYOffset <= 400) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		window.addEventListener("scroll", checkScrollTop);
		return () => window.removeEventListener("scroll", checkScrollTop);
	}, []);

	return (
		<>
			<button id="back-top" className={`back-to-top ${sticky && "show"}`} onClick={scrollTop}>
				<i className="fas fa-long-arrow-up"></i>
			</button>
		</>
	);
};

export default ScrollToTop;
