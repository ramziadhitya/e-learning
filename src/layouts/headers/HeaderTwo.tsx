import { useState } from "react";
import UseSticky from "../../hooks/UseSticky";
import { Link } from "react-router-dom";
import NiceSelect from "../../ui/NiceSelect";
import NavMenu from "./NavMenu";
import OffCanvas from "../../common/OffCanvas";


const HeaderTwo = () => {
    const selectHandler = (_e: any) => { };
    const { sticky } = UseSticky()
    const [openCanvas, setOpenCanvas] = useState(false)

    return (
        <>
            <header className="header-section-2">
                <div className="container">
                    <div className="header-top">
                        <Link to="/" className="top-logo">
                            <img src="assets/img/logo/black-logo.svg" alt="img" />
                        </Link>
                        <div className="category-oneadjust gap-6 d-flex align-items-center">
                            <div className="icon">
                                <img src="assets/img/logo/dot.png" alt="img" />
                            </div>
                            <NiceSelect
                                className="category"
                                options={[
                                    { value: "01", text: "Category" },
                                    { value: "02", text: "Web Design" },
                                    { value: "03", text: "Web Development" },
                                    { value: "04", text: "Graphic Design" },
                                    { value: "05", text: "Software Eng" },
                                ]}
                                defaultCurrent={0}
                                onChange={selectHandler}
                                name=""
                                placeholder="" />

                            <form onSubmit={e => e.preventDefault()} className="search-toggle-box d-md-block">
                                <div className="input-area">
                                    <input type="text" placeholder="Search courses........." />
                                    <button className="cmn-btn">
                                        <i className="far fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div id="header-sticky" className={`header-2 ${sticky ? "sticky" : ""}`}>
                    <div className="container">
                        <div className="mega-menu-wrapper">
                            <div className="header-main">
                                <Link to="/" className="header-logo">
                                    <img src="assets/img/logo/black-logo.svg" alt="logo-img" />
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
                                        <Link to="/sign-in" className="theme-btn yellow-btn">Sign In</Link>
                                    </div>
                                    <div className="header-button">
                                        <Link to="/register" className="theme-btn yellow-btn">Register</Link>
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

export default HeaderTwo;