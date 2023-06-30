import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { BsGrid3X3GapFill, BsFillPencilFill, BsTrash3Fill } from 'react-icons/bs';


const Website = () => {
    return (
        <>
            <Head>
                <title>
                    Website Page
                </title>
            </Head>


            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                        <div className="d-flex flex-column px-0 pt-0 text-white min-vh-100">

                            <Sidebar />
                        </div>
                    </div>
                    <div className="col py-3">
                        <h1 style={{ fontWeight: 'bold', fontSize: '2rem', margin: '1%' }}>
                            Websites
                        </h1>
                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">First</th>
                                    <th scope="col">Group</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Foodpanda</td>
                                    <td>2</td>
                                    <td className="table-dark">

                                        <button>
                                            <BsFillPencilFill />
                                        </button>

                                        <button>
                                            <BsTrash3Fill />
                                        </button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Website;





