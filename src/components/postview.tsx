import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const router = useRouter();
  const { post, author } = props;
  return (
    <div
      className="flex cursor-pointer gap-3 border-b border-slate-400 p-4 hover:bg-gray-900"
      key={post.id}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void router.push(`/post/${post.id}`);
      }}
    >
      <Link href={`/${author.username}`}>
        <Image
          width={56}
          height={56}
          src={author.profileImageUrl}
          alt={`@${author.username}'s profile picture`}
          className="rounded-full"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        />
      </Link>
      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-400">
          <Link href={`/${author.username}`}>
            <span
              className="font-bold text-white hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              {author.fullName}
            </span>{" "}
            <span
              onClick={(e) => {
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >{`@${author.username}`}</span>
          </Link>
          {"·"}
          <span className="font-thin hover:underline">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <span className="text-2xl">{post.content}</span>
      </div>
    </div>
  );
};
