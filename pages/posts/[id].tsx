import { GetStaticProps, GetStaticPaths } from "next";

import Head from "next/head";

import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/date";
import Layout from "../../components/layout";
import utilStyles from "../../styles/utils.module.css";

interface Post {
  date: string;
  title: string;
  id: string;
  contentHtml: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData: Post = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};

export default function Post({ postData }: { postData: Post }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.id}</div>
        <Date dateString={postData.date} />
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
        />
      </article>
    </Layout>
  );
}
