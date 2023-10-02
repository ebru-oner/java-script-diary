import Head from "next/head";
import Link from "next/link";

import Layout from "@/components/layout";
import styles from "@/styles/general-styles.module.css";
import { getAllPosts } from "@/lib/api";

export default function Home({ allPosts }) {
  return (
    <Layout>
      <Head>
        <title>Java Script Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <div className={styles.grid}>
          {allPosts.map((post, index) => (
            <div key={index} className={styles.card}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <div>
                <Link href={`/posts/${post.id}`}>Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["id", "title", "summary", "date", "content"]);

  return {
    props: { allPosts },
  };
};
