import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";
import OffCanvas from "../../common/OffCanvas";


const HeaderFive = () => {
    const { sticky } = UseSticky()
    const [openCanvas, setOpenCanvas] = useState(false)


    return (
        <>
            <header className="header-section-3">
                <div id="header-sticky" className={`header-3 style-2 header-5 ${sticky ? "sticky" : ""}`}>
                    <div className="container">
                        <div className="mega-menu-wrapper">
                            <div className="header-main">
                                <Link to="/" className="header-logo">
                                    <img src="assets/img/logo/white-logo-2.svg" alt="logo-img" />
                                </Link>
                                <Link to="/" className="header-logo-2">
                                    <img src="assets/img/logo/black-logo-4.svg" alt="logo-img" />
                                </Link>
                                <div className="header-left">
                                    <div className="mean__menu-wrapper">
                                        <div className="main-menu">
                                            <nav id="mobile-menu">
                                                <NavMenu />
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                                <div className="header-right d-flex justify-content-end align-items-center">
                                    <div className="header-button">
                                        <Link to="/contact" className="theme-btn">Let’s Talk</Link>
                                    </div>
                                    <div className="header__hamburger d-xl-none my-auto">
                                        <div className="sidebar__toggle" onClick={() => setOpenCanvas(!openCanvas)}>
                                            <i className="fas fa-bars"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <OffCanvas openCanvas={openCanvas} setOpenCanvas={setOpenCanvas} />

        </>
    );
};

export default HeaderFive;