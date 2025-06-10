import { Link } from "react-router-dom";

const FooterOne = () => {
    return (
        <footer className="bg-gray-900 text-white w-full py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between gap-y-10">
                    {/* Column 1 */}
                    <div className="w-full md:w-1/2 lg:w-1/4">
                        <p className="text-gray-300 mb-4">
                            Education the foundation personal and societal growth, empowering individuals with knowledge.
                        </p>
                        <div className="flex space-x-4 text-lg">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-dribbble"></i></a>
                            <a href="#"><i className="fab fa-behance"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="w-full md:w-1/2 lg:w-1/4">
                        <h3 className="text-xl font-semibold mb-4">Online Platform</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/courses">Coursera</Link></li>
                            <li><Link to="/courses">MasterClass</Link></li>
                            <li><Link to="/courses">Skillshare</Link></li>
                            <li><Link to="/courses">LinkedIn Learning</Link></li>
                            <li><Link to="/courses">FutureLearn</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="w-full md:w-1/2 lg:w-1/4">
                        <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link to="/about">About Eduspace</Link></li>
                            <li><Link to="/instructor">Instructors</Link></li>
                            <li><Link to="/courses">Best Courses</Link></li>
                            <li><Link to="/contact">Student Reviews</Link></li>
                            <li><Link to="/faq">FAQs</Link></li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div className="w-full md:w-1/2 lg:w-1/4">
                        <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>55 Main Street, 2nd block Malborne, Australia</li>
                            <li><a href="mailto:info@example.com">info@example.com</a></li>
                            <li><a href="tel:+0001238899">+000 (123) 88 99</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterOne;
