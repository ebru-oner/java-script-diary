import Head from "next/head";
import Container from "@/components/container";
import Layout from "@/components/layout";
import PostBody from "@/components/postBody";
import { getAllPosts, getPostsBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

export default function Post({ post }) {
  return (
    <Layout>
      <Container>
        <article>
          <Head>
            <title>{post.title}</title>
          </Head>
          <h1>{post.title}</h1>
          <h2>{post.date}</h2>
          <PostBody content={post.content} />
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const posts = getPostsBySlug(params.slug, ["id", "title", "summary", "date", "content"]);

  const content = await markdownToHtml(posts.content);
  return {
    props: {
      post: {
        ...posts,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
