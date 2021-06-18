import Head from "next/head";
import NavBar from "@components/NavBar";

const DefaultLayout = ({ children }) => (
  <>
    <Head>
      <title>Default layout</title>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    <NavBar />
    <div className="container">
      <main className="main">{children}</main>
    </div>
  </>
);

export default DefaultLayout;
