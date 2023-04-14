import { LoadingPage } from "./loading";
import { PostView } from "./postview";
import type { Post } from "@prisma/client";

type feedProps = {
  posts:
    | {
        post: Post;
        author: {
          username: string;
          id: string;
          profileImageUrl: string;
          fullName: string;
        };
      }[]
    | undefined;
  isLoading: boolean;
  isError: boolean;
};

export const Feed = (props: feedProps) => {
  const { posts, isLoading, isError } = props;

  if (isLoading) return <LoadingPage />;

  if (isError) return <div>Something went wrong</div>;

  if (!posts) return <div>No data</div>;

  return (
    <div className="flex flex-col">
      {posts.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
