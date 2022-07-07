import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {/* Component in the end will be the actual page content,
      and pageProps the props that out pages would be receiving */}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
