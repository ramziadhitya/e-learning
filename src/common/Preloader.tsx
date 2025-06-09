import { useState, useEffect } from "react";

export default function Preloader() {
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Set a timer to hide the preloader after 10 seconds
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 3000);

		// Clean up the timer when the component is unmounted
		return () => clearTimeout(timer);
	}, []);

	if (!isVisible) return null;

	return (
		<>
			{/* <div className="preloader">
				<div className="book-style">
					<div className="inner">
						<div className="left"></div>
						<div className="middle"></div>
						<div className="right"></div>
					</div>
					<ul>
						{Array(18)
							.fill(null)
							.map((_, index) => (
								<li key={index}></li>
							))}
					</ul>
				</div>
			</div> */}
			{/* {isVisible && (
				<div className="loader-wrap">
					<div className="preloader">
						<div className="preloader-close">x</div>
						<div id="handle-preloader" className="handle-preloader">
							<div className="animation-preloader">
								<div className="spinner"></div>
								<div className="txt-loading">
									<span data-text-preloader="g" className="letters-loading">
										g
									</span>
									<span data-text-preloader="a" className="letters-loading">
										a
									</span>
									<span data-text-preloader="r" className="letters-loading">
										r
									</span>
									<span data-text-preloader="d" className="letters-loading">
										d
									</span>
									<span data-text-preloader="n" className="letters-loading">
										n
									</span>
									<span data-text-preloader="m" className="letters-loading">
										m
									</span>
									<span data-text-preloader="a" className="letters-loading">
										a
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)} */}

			{isVisible &&
				<div id="preloader" className="preloader">
					<div className="animation-preloader">
						<div className="edu-preloader-icon">

						</div>
						<p className="text-center">Loading</p>
					</div>
					<div className="loader">
						<div className="row">
							<div className="col-3 loader-section section-left">
								<div className="bg"></div>
							</div>
							<div className="col-3 loader-section section-left">
								<div className="bg"></div>
							</div>
							<div className="col-3 loader-section section-right">
								<div className="bg"></div>
							</div>
							<div className="col-3 loader-section section-right">
								<div className="bg"></div>
							</div>
						</div>
					</div>
				</div>

			}
		</>
	);
}
