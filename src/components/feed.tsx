import { api } from "~/utils/api";
import { LoadingPage } from "./loading";
import { PostView } from "./postview";

export const Feed = () => {
  const { data: posts, isLoading, isError } = api.posts.getAll.useQuery();

  if (isLoading)
    return (
      <div className="flex grow">
        <LoadingPage />
      </div>
    );

  if (isError) return <div>Something went wrong</div>;

  if (!posts) return <div>No data</div>;

  return (
    <div className="flex grow flex-col overflow-y-auto">
      {posts.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
