import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="flex gap-3 border-b border-slate-400 p-4" key={post.id}>
      <Image
        width={56}
        height={56}
        src={author.profileImageUrl}
        alt={`@${author.username}'s profile picture`}
      />
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-400">
          <Link href={`/${author.username}`}>
            <span className="font-bold text-white hover:underline">
              {author.fullName}
            </span>{" "}
            <span>{`@${author.username}`}</span>
          </Link>
          {"·"}
          <Link href={`/post/${post.id}`}>
            <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
          </Link>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
