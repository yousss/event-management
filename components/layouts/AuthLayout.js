import Head from "next/head";

const AuthLayout = ({ children }) => (
  <>
    <Head>
      <title>Auth</title>
      <link
        href="https://api.mapbox.com/mapbox-gl-js/v2.1.1/mapbox-gl.css"
        rel="stylesheet"
      />
    </Head>
    <div className="container">{children}</div>
  </>
);

export default AuthLayout;
