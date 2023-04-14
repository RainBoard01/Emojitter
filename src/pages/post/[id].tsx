import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { PostView } from "~/components/postview";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data, isError: isPostError } = api.posts.getOneById.useQuery({
    postId: id ?? "",
  });

  if (isPostError) return <div>Something went wrong</div>;

  if (!data) return <div>No data</div>;

  return (
    <>
      <Head>
        <title>{`${data.post?.content ?? ""} - ${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.posts.getOneById.prefetch({ postId: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
