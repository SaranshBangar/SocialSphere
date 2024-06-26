import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios'

const Posts = () => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      {makeRequest.get("/posts").then((res) => {
        return res.data;
      })},
  }); 

  const posts = [
    {
      id: 1,
      name: "John Doe",
      userId: 1,
      profilePic:
        "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      name: "Boss Man",
      userId: 2,
      profilePic:
        "https://assets.leetcode.com/users/avatars/avatar_1700541438.png",
      desc: "First post on this amazing web app",
    },
  ];

  console.log(data);

  return (
    <div className="posts">
      {posts.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
    </div>
  );
};

export default Posts;
