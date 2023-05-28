import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import Navbar from "../../components/Navbar";

export default function Home() {

  return (
    <>
      <Head>
        <title>
          Home Page
        </title>
      </Head>
      <Navbar />

      <section id='header' className='d-flex align-item-center mt-5'>



        <div className='container-fluid'>
          <div className='row'>
            <div className='col-10 mx-auto'>
              <div className='row'>
                <div className='col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column'>

                  <h1>
                    Grow your business with <strong style={{ color: 'red' }}> Nike Shoes </strong>
                  </h1>
                  <h4 className="p-1">
                    We are the team of talented developer making websites
                  </h4>


                  <div className="col-12">
                    <button className="btn btn-outline-black" style={{ borderRadius: '10%', border: '2px solid black' }} type="submit">
                      <Link href={'/product'} style={{ color: 'black', textDecoration: 'none' }}>
                        Get Started
                      </Link>
                    </button>
                  </div>
                </div>

                <div className='col-lg-6 order-1 order-lg-2 header-img' >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >


      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossOrigin="anonymous"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossOrigin="anonymous"
      />
    </>
  )
}
