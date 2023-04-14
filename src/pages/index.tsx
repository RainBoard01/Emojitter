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
      <SignedIn>
        <div className="flex justify-between border-b border-slate-400 p-4">
          <CreatePostWizard />
        </div>
        <Feed posts={data} isLoading={isLoading} isError={isError} />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </PageLayout>
  );
};

export default Home;
