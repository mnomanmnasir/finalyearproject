import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import { BsGrid3X3GapFill, BsFillPencilFill, BsTrash3Fill } from 'react-icons/bs';
import axios from 'axios'
import { useState, useEffect } from 'react'

const Website = () => {

    // const [posts, setPosts] = useState([]);
    // const apiEndPoint = 'https://jsonplaceholder.typicode.com/posts';

    let [array, setArray] = useState([])
    let [inputdata, setInputdata] = useState({ name: "", number: "" })
    let [index, setIndex] = useState()
    let [bolin, setBolin] = useState(false)
    let { name, number } = inputdata;

    function data(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value })

    }

    // useEffect(()=>{
    //     const getPosts = async () => { 
    //         const {data : res} = await axios.get(apiEndPoint)
    //         setPosts(res)
    //     };
    //      getPosts();
    // }, []);

    // const handleDelete = async post=> {

    //     await axios.delete(apiEndPoint + "/" + post.id + post)
    //     setPosts(posts.filter((p) => p.id !== post.id ));
    // } 

    function addinputdata() {
        setArray([...array, { name, number }])
        // console.log(inputdata)
        setInputdata({ name: "", number: "" })
    }

    //deleting row

    function deletedata(i) {
        console.log(i, 'this index row want to be delete')
        let total = [...array];
        total.splice(i, 1);
        setArray(total);
    }

    function updatedata(i) {
        let { name, number } = array[i]
        setInputdata({ name, number })
        setBolin(true)
        setIndex(i)
    }

    //know add data at particular index means update it on that index
    function updateinfo() {
        let total = [...array]
        total.splice(index, 1, { name, number });
        setArray(total)
        setBolin(false)

    }


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
                            Website
                        </h1>
                        <input type="text" value={inputdata.name || ""} name='name' autoComplete="off" placeholder="Enter name" onChange={data} />
                        <input type="number" value={inputdata.number || ""} name='number' autoComplete="off" placeholder="Enter number" onChange={data} />
                        <button onClick={!bolin ? addinputdata : updateinfo}>{!bolin ? `Add Data` : `Update data`}</button>
                        <table className="table table-secondary table-striped">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th style={{ width: '80%' }}>Number</th>
                                    <th>Action</th>
                                </tr>

                                {
                                    array && array.map(
                                        (item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{item.name}</td>
                                                    <td style={{ width: '80%' }}>{item.number}</td>
                                                    <button style={{ width: '30%', marginLeft: "0%" }} onClick={() => updatedata(i)}>
                                                        <BsFillPencilFill />
                                                    </button>
                                                    <button style={{ width: '70%' }} onClick={() => deletedata(i)}>
                                                        <BsTrash3Fill />
                                                    </button>
                                                </tr>
                                            )
                                        }
                                    )
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Website;





