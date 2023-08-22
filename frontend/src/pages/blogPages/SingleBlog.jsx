import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";

import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  useUpdateBlogMutation,
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
} from "../../redux/slices/blogsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LinkContainer } from "react-router-bootstrap";
import BlogCard from "../../components/blog/BlogCard";
import EditForm from "../../components/blog/EditForm";

// TODO: Instead of a ternary, absract the editing content from the single post content into a separate component

function SingleBlog() {
  const { blogId } = useParams();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();
  const { data, isLoading, error } = useGetSingleBlogQuery(
    { blogId },
    { refetchOnMountOrArgChange: true }
  );
  console.log("DATA: ", data);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogId) return <p>{error}</p>;
  return (
    data?.post.author &&
    (userInfo.email !== data.post.author.email ? (
      <BlogCard post={data.post} />
    ) : (
      <EditForm />
    ))
    // <article className="single-blog">
    //   <Card style={{ border: "none", outline: "none" }}>
    //     <Card.Title
    //       className="text-center"
    //       style={{ borderBottom: "1px solid white" }}
    //     >
    //       <h1 className="text-uppercase">{title}</h1>
    //       <div className="d-flex flex-column justify-content-center align-items-center mt-3">
    //         <div className="mb-2">
    //           Written by:
    //           <LinkContainer
    //             to={`../user/${data?.post.author._id}`}
    //             style={{ cursor: "pointer" }}
    //           >
    //             <span className=" ms-2 text-capitalize text-decoration-underline">
    //               {data?.post.author.name}
    //             </span>
    //           </LinkContainer>
    //         </div>
    //         <time style={{ fontSize: "0.7rem", flex: 1 }}>
    //           {formatISO9075(new Date(data?.post.createdAt))}
    //         </time>
    //       </div>
    //     </Card.Title>

    //     <Card.Body
    //       // style={{ height: "20vh" }}
    //       className="d-flex flex-column justify-content-center"
    //     >
    //       <div
    //         style={{
    //           //   background: "#eee",
    //           //   color: "black",
    //           // height: "100%",
    //           padding: "0.5rem 1rem",
    //         }}
    //         className="card-body-display"
    //       >
    //         <div>{body}</div>
    //       </div>
    //     </Card.Body>
    //   </Card>
    // </article>
  );
}

export default SingleBlog;
