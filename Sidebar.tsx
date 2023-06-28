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


const Sidebar = () => {

  return (
    <>

      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              {/* <Link href="/" className="d-flex align-center pb-1 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Menu</span>
              </Link> */}
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                  <Link href="/home" className="nav-link align-middle px-0">
                    <i className="fs-4 bi-bootstrap"> <MenuFoldOutlined /></i>
                    <span className="ms-1 d-none d-sm-inline">Home</span>
                  </Link>
                </li>

                <li>
                  <Link href="/about" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-bootstrap"> <UploadOutlined /></i>
                    <span className="ms-1 d-none d-sm-inline">About</span></Link>
                </li>
                <div className="btn-group dropend">
                  <button type="button" className="btn btn-secondary dropdown-toggle" style={{ border: 'none', marginLeft: '-15%' }} data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fs-4 bi-bootstrap"> <UploadOutlined /></i>
                    Dashboards
                  </button>
                  <ul className="dropdown-menu">


                    <li><Link className="dropdown-item" href="/sales">Sales</Link>

                    </li>
                    <li><Link className="dropdown-item" href="/finance">Finance</Link></li>
                    <li><Link className="dropdown-item" href="/logistic">Logistic</Link></li>
                    <li><Link className="dropdown-item" href="/projects">Projects</Link></li>
                    <li><Link className="dropdown-item" href="/website">Website</Link></li>
                    <li><Link className="dropdown-item" href="/hr">Human Resources</Link></li>
                  </ul>
                </div>
                <div className="btn-group dropend pt-2">
                  <button type="button" style={{ border: 'none', marginLeft: '-15%' }} className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fs-4 bi-bootstrap"> <UploadOutlined /></i>
                    Inventory
                  </button>
                  <ul className="dropdown-menu">

                    <li><Link className="dropdown-item" href="/overview">
                      overview</Link></li>
                    <li><Link className="dropdown-item" href="/operations">
                      <span>  operations</span></Link></li>
                    <li><Link className="dropdown-item" href="/products">products</Link></li>
                    <li><Link className="dropdown-item" href="/reporting">reporting</Link></li>
                  </ul>
                </div>

                <li>
                  <Link href="#" className="nav-link px-0 align-middle">
                    <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Customers</span> </Link>
                </li>
              </ul>

            </div>
          </div >

        </div>
      </div>

    </>
  )
}

export default Sidebar;
