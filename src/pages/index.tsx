import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { Feed } from "~/components/feed";
import { CreatePostWizard } from "~/components/createPostWizard";

const Home: NextPage = () => {
  const { data, isLoading, isError } = api.posts.getAll.useQuery();

  return (
    <PageLayout>
      <div className="flex justify-between border-b border-slate-400 p-4">
        <SignedIn>
          <CreatePostWizard />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
      <Feed posts={data} isLoading={isLoading} isError={isError} />
    </PageLayout>
  );
};

export default Home;
