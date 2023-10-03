import Head from "next/head";
import { useRouter } from "next/router";

import Container from "@/components/container";
import Layout from "@/components/layout";
import PostBody from "@/components/postBody";
import { getAllPosts, getPostsBySlug } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { getCurrentDate, getCurrentDay } from "@/utils/dateTime";

import { styled } from "@mui/material/styles";
import { Grid, IconButton, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const WritingSection = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body1,
  padding: "5px 15px 5px 25px",
  textAlign: "left",
  color: theme.palette.text.secondary,
  backgroundImage: "repeating-linear-gradient(transparent, transparent 1.6rem,  lightgray 1.7rem)",
  height: "100%",
  borderRadius: 0,
  boxShadow: "none",
  lineHeight: "1.7rem",
}));

const DateSection = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h6,
  padding: theme.spacing(3),
  fontStyle: "italic",
  textDecoration: "underline",
  textUnderlineOffset: "10px",
  textAlign: "right",
  color: theme.palette.text.secondary,
  height: "100%",
  borderRadius: 0,
  boxShadow: "none",
}));

const TitleSection = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.h4,
  padding: theme.spacing(1),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.text.primary,
  height: "100%",
  borderRadius: 0,
  boxShadow: "none",
}));

export default function Post({ post }) {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <Layout>
      <Container>
        <article>
          <Head>
            <title>{post.title}</title>
          </Head>
        </article>
        <div style={{ overflow: "auto", margin: 15, height: "100vh", textAlign: "center" }}>
          <IconButton onClick={handleHomeClick}>
            <HomeIcon />
          </IconButton>
          <Grid container sx={{ height: "100%" }}>
            <Grid item xs={7}>
              <TitleSection>{post.title}</TitleSection>
            </Grid>
            <Grid item xs={5}>
              <DateSection>
                {getCurrentDate()} {getCurrentDay()}
              </DateSection>
            </Grid>
            <Grid item xs={12} sx={{ height: "auto" }}>
              <WritingSection>
                <PostBody content={post.content} />
              </WritingSection>
            </Grid>
          </Grid>
        </div>
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
