import Image from "next/image"
import Link from "next/link";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  CustomerServiceOutlined
 } from '@ant-design/icons';
import { useRouter } from "next/router"
import '../src/pages/home'
import '../src/pages/about'



const Sidebar = () => {
    const router = useRouter(); //using dynamic routing
    const pageNumber = router.query.pageNo;
    return (
        <>

            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">Menu</span>
                            </a>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <a href="home" className="nav-link align-middle px-0">
                                    <i className="fs-4 bi-bootstrap"> <MenuFoldOutlined /></i> 
                                                 <span className="ms-1 d-none d-sm-inline">    Home</span>
                                    </a>
                                </li>
                                <li>
                                    <a href='contact' data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-bootstrap"> <MenuUnfoldOutlined /></i>              
                                        <span className="ms-1 d-none d-sm-inline">Contact</span>
                                    </a>
                                    {/* <ul className="collapse nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                    <li className="w-100">
                      <Link href={'/home'} className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </Link>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                    </li>
                  </ul> */}
                                </li>
                                <li>
                                    <a href='about' className="nav-link px-0 align-middle">
                                    <i className="fs-4 bi-bootstrap"> <UploadOutlined /></i>             
                                        <span className="ms-1 d-none d-sm-inline">About</span></a>
                                </li>
                                <li>
                                    <a href='service' data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                                    <i className="fs-4 bi-bootstrap"> <UploadOutlined /></i>             
                                        <span className="ms-1 d-none d-sm-inline">Service</span></a>
                                    {/* <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                    <li className="w-100">
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                    </li>
                  </ul> */}
                                </li>
                                {/* <li>
                  <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-grid"><MenuFoldOutlined /></i> <span className="ms-1 d-none d-sm-inline">Products</span> </a>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" data-bs-parent="#menu">
                    <li className="w-100">
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 1</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 2</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 3</a>
                    </li>
                    <li>
                      <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Product</span> 4</a>
                    </li>
                  </ul>
                </li> */}
                                {/* <li>
                  <a href="#" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </a>
                </li> */}
                            </ul>

                        </div>
                    </div>
                    {/* <div className="col py-3">
                        <h3>{pageNumber}</h3>
                        <p className="lead">
                            An example 2-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single
                            menu is be open at a time. While the sidebar itself is not toggle-able, it does responsively shrink in width on smaller screens.</p>
                        <ul className="list-unstyled">
                            <li><h5>Responsive</h5> shrinks in width, hides text labels and collapses to icons only on mobile</li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Sidebar;
