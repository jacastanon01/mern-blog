// main page will be form with tile and text
// use off canvas component to open blog preview titles
// and a create a blog button that will render a empty form

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
import { useGetUserBlogsQuery } from "../../redux/slices/blogsApiSlice";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import SingleBlog from "./SingleBlog";
import { useSelector } from "react-redux";

// export const fetchBlogs = async () => {
//   const res = await fetch("http://localhost:4000/api/blogs");
//   console.log(res.json());
// };

function MyBlogs() {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetUserBlogsQuery({ id: userInfo._id });

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
    <>
      <h1 className="text-center">MY BLOGS</h1>
      <Row>
        {data?.userBlogs.length > 0 ? (
          data?.userBlogs.map((post) => (
            <SingleBlog data={post} key={post._id} />
            // <Col lg={4} sm={10} className="mt-2" key={post._id}>
            //   <Card className="">
            //     <Card.Title className="text-center">
            //       <h1>{post.title}</h1>
            //       <p style={{ fontSize: "1rem" }}>
            //         Written by{" "}
            //         <b className="text-capitalize">{post.author.name}</b>
            //       </p>
            //     </Card.Title>
            //     <Card.Body>
            //       {/* <h1 className="text-center">{post.title}</h1> */}
            //       <div className="text-center">
            //         <p>
            //           {post.body.length > 10
            //             ? `${post.body.slice(0, 10)}...`
            //             : post.body}
            //         </p>

            //         <LinkContainer to={`blog/${post._id}`}>
            //           <Button>Go to post</Button>
            //         </LinkContainer>
            //         <Button>Delete post</Button>
            //       </div>
            //     </Card.Body>
            //   </Card>
            // </Col>
          ))
        ) : (
          <div>
            You haven't posted any blogs yet!{" "}
            <LinkContainer
              style={{ cursor: "pointer", textDecoration: "underline" }}
              to="/blog/create"
            >
              <strong>Click here</strong>
            </LinkContainer>{" "}
            to create one
          </div>
        )}
      </Row>
    </>
  );
}

export default MyBlogs;
