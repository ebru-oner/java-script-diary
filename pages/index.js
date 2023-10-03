import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "@/styles/general-styles.module.css";
import { getAllPosts } from "@/lib/api";
import CalendarComponent from "@/components/calendarComponent";

export default function Home() {
  const router = useRouter();

  function handleDateSelection(targetPost) {
    router.push(`/posts/${targetPost}`);
  }
  return (
    <>
      <Head>
        <title>Java Script Diary</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <h3>Java script diary</h3>
        <p>Daily learnings on java script</p>
        <CalendarComponent onClick={handleDateSelection} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts(["id", "title", "summary", "date", "content"]);

  return {
    props: { allPosts },
  };
};
