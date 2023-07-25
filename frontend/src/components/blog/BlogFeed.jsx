import React, { useEffect } from "react";
import {
  Accordion,
  Button,
  Row,
  Card,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import { useGetBlogsQuery } from "../../redux/slices/blogsApiSlice";
import FormContainer from "../FormContainer";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import BlogCard from "./BlogCard";
import SingleBlog from "./SingleBlog";

// export const fetchBlogs = async () => {
//   const res = await fetch("http://localhost:4000/api/blogs");
//   console.log(res.json());
// };

function BlogFeed() {
  const { data, isLoading } = useGetBlogsQuery();
  //console.log(data);
  const navigate = useNavigate();

  // const accordian = (
  //   <Accordion>
  //     {data?.blogs ? (
  //       data?.blogs?.map((d, i) => (
  //         <Accordion.Item eventKey={i} key={d._id}>
  //           <Accordion.Header>{d.title}</Accordion.Header>
  //           <Accordion.Body>
  //             {d.body}
  //             <div className="d-flex text-grey">By {d.author.name}</div>
  //           </Accordion.Body>
  //         </Accordion.Item>
  //       ))
  //     ) : (
  //       <p>None</p>
  //     )}
  //   </Accordion>
  // );
  //   console.log(blogs);
  // useEffect(() => {
  //   console.log(data + " in the use effect");
  // }, [data]);

  const altCard = (post) => (
    <Card className="">
      <Card.Title className="text-center mb-0">
        <h1>{post.title}</h1>
        <p style={{ fontSize: "1rem" }}>
          Written by:{" "}
          <LinkContainer
            style={{ cursor: "pointer" }}
            to={`blog/user/${post?.author._id}`}
          >
            <b className="text-capitalize">{post?.author.name}</b>
          </LinkContainer>
        </p>
      </Card.Title>
      <Card.Body>
        {/* <h1 className="text-center">{post.title}</h1> */}
        <div className="text-center">
          <p>
            {post.body.length > 10 ? `${post.body.slice(0, 10)}...` : post.body}
          </p>

          <LinkContainer to={`blog/${post._id}`}>
            <Button>Go to post</Button>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );

  if (isLoading) return <LoadingSpinner />;
  return (
    //     <section>
    //       {data?.blogs ? (
    //         data?.blogs?.map((post) => <div key={post._id}>{post.title}</div>)
    //       ) : (
    //         <p>No blogs to display</p>
    //       )}
    //     </section>
    //   );
    <Row>
      <h1 className="text-center">Browse all blogs</h1>

      {data?.blogs.length > 0 ? (
        data?.blogs.map((post) => (
          // <Col lg={4} sm={10} className="mt-2" key={post._id}>
          //   {/* <BlogCard data={post} /> */}
          //   {/* <SingleBlog data={post} /> */}

          // </Col>
          <Col lg={4} sm={10} className="mt-4" key={post._id}>
            {/* <BlogCard post={post} key={post._id} /> */}
            {altCard(post)}
          </Col>
        ))
      ) : (
        <div>No blogs</div>
      )}
    </Row>
  );
}

export default BlogFeed;
