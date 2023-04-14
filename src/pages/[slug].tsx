import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";
import Image from "next/image";
import { Feed } from "~/components/feed";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const ProfilePage: NextPage<{ slug: string }> = ({ slug }) => {
  const { data: profile } = api.profile.getUserByUsername.useQuery({
    username: slug,
  });

  const {
    data: posts,
    isLoading: isPostsLoading,
    isError: isPostsError,
  } = api.posts.getAllByUserId.useQuery({
    userId: profile?.id ?? "",
  });

  if (!profile) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{profile.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-40 bg-slate-600">
          <Image
            src={profile.profileImageUrl}
            alt={`${profile.username ?? ""}'s profile pic`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="w-full border-b border-slate-400 p-5">
          <div className="text-xl font-extrabold">{profile.fullName}</div>
          <div className="text-md text-slate-400">{`@${
            profile.username ?? ""
          }`}</div>
        </div>
        <Feed
          posts={
            posts?.map((post) => ({
              post: post,
              author: profile,
            })) || undefined
          }
          isLoading={isPostsLoading}
          isError={isPostsError}
        />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  await ssg.profile.getUserByUsername.prefetch({ username: slug });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      slug,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
