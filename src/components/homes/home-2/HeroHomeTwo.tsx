import { Link } from "react-router-dom";
import Count from "../../../common/Count";



const HeroHomeTwo = () => {


    return (
        <>
            <section className="hero-section hero-2 fix">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="hero-content">
                                <h1 className="wow fadeInUp" data-wow-delay=".3s">
                                    Best Quality
                                    Online Course
                                </h1>
                                <p className="wow fadeInUp" data-wow-delay=".5s">
                                    Online courses have revolutionized the people learn
                                    by offering and a wide range every interest
                                </p>
                                <div className="hero-button">
                                    <Link to="/courses" className="theme-btn wow fadeInUp" data-wow-delay=".3s">Find Best Courses</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image-items">
                                <div className="hero-image">
                                    <div className="counter-box float-bob-y">
                                        <p>More then</p>
                                        <h2><span className="odometer" data-count="2800">
                                            <Count number={2800} text='+' />
                                        </span></h2>
                                        <p>Quality Courses</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

        </>
    );
};

export default HeroHomeTwo;