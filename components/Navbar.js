import Link from "next/link";
import Image from "next/image";

const Navbar = () => {

    return (
        <>
            <div className='container-fluid nav_bg'>
                <div className='row'>
                    <div className='col-10 mx-auto'>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/">
                                    <Image
                                        src="/next.svg"
                                        height={50}
                                        width={100}
                                        alt="homePage"
                                        priority />
                                </a>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <a

                                                className="nav-link active" aria-current="page" href="/">
                                                Home
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/product" style={{fontWeight: 'bold'}}>
                                                Products
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/about">
                                                About
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/contact">
                                                Contact
                                            </a>
                                        </li>


                                    </ul>

                                </div>
                            </div>
                        </nav>

                    </div>

                </div>
            </div>

        </>
    )
}

export default Navbar;