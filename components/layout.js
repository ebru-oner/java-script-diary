import styles from "@/styles/general-styles.module.css";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <>
      <main className={styles.container}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
