const FooterOne = ({ style_2 }: any) => {
    return (
        <footer
            className={`footer-section fix ${style_2 ? "" : "footer-bg"}`}
            style={{ minHeight: "300px" }}
        >
            <div className="container">
                <div className={`footer-widget-wrapper ${style_2 ? "style-4" : ""}`}>
                    <div className="row">
                        <div className="col-12">
                            {/* Kosongkan isi footer, tetap jaga struktur untuk stabilitas */}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterOne;
