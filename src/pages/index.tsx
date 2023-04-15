import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { type NextPage } from "next";
import { PageLayout } from "~/components/layout";
import { Feed } from "~/components/feed";
import { CreatePostWizard } from "~/components/createPostWizard";

const Home: NextPage = () => {
  return (
    <PageLayout>
      <div className="flex justify-between border-b border-slate-400 p-4">
        <SignedIn>
          <CreatePostWizard />
          {/* <Feed /> */}
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </PageLayout>
  );
};

export default Home;
