import Head from "next/head";
import Sidebar from "../../components/Sidebar";

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

                        <h1>
                            Website Page
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Website;





