import styles from "@/styles/general-styles.module.css";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className={styles.mainWrapper}>
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
