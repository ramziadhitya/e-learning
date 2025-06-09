import NavMenu from "./NavMenu";
import { useState } from "react";
import Search from "../../common/Search";
import UseSticky from "../../hooks/UseSticky";
import OffCanvas from "../../common/OffCanvas";
import MarqueeOne from "../../common/MarqueeOne";


const HeaderOne = () => {

    const { sticky } = UseSticky()


    const [open, setOpen] = useState(false)
    const [openCanvas, setOpenCanvas] = useState(false)


    return (
        <>
            <MarqueeOne />
            <header id="header-sticky" className={`header-1 ${sticky ? "sticky" : ""}`}>
                <div className="container-fluid">
                    <div className="mega-menu-wrapper">
                        <div className="header-main">
                            <div className="header-left">


                            </div>
                            <div className="header-right d-flex justify-content-end align-items-center">
                                <div className="mean__menu-wrapper">
                                    <div className="main-menu">
                                        <nav id="mobile-menu">
                                            <NavMenu />
                                        </nav>
                                    </div>
                                </div>
                                <div className="header-search">
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="d-flex align-items-center search-toggle"><i className="fas fa-search"></i></button>
                                </div>

                                <div className="header__hamburger d-xl-none my-auto">
                                    <div className="sidebar__toggle">
                                        <div className="header-bar" onClick={() => setOpenCanvas(!openCanvas)}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <Search open={open} setOpen={setOpen} />
            <OffCanvas openCanvas={openCanvas} setOpenCanvas={setOpenCanvas} />

        </>
    );
};

export default HeaderOne;