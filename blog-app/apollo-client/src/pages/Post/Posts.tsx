/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery } from "@apollo/client";
import PostCard from "./PostCard";

const GET_POSTS = gql`
  query PostData {
    posts {
      title
      content
      createdAt
      author {
        name
      }
    }
  }
`;

const Posts = () => {
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      <h1 className="text-center font-bold text-5xl my-4 pb-4">Posts</h1>
      <hr />
      <div className="flex flex-wrap">
        {data?.posts?.map((post: any) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
