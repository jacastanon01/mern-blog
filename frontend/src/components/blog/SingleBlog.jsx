import React, { useEffect } from "react";
import {
  useGetSingleBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../../redux/slices/blogsApiSlice";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import { Card, Col } from "react-bootstrap";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { LoadingSpinner } from "../LoadingSpinner";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeBlog, fetchBlogs } from "../../redux/slices/blogsSlice";

function SingleBlog({ data, name }) {
  //const [getSingleBlog] = useGetSingleBlogQuery();
  //console.log(data);

  //   const data = useLoaderData();
  //   console.log(data);
  //const { blogId } = useParams();
  const navigate = useNavigate();
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  //const { data } = useGetSingleBlogQuery({ id: JSON.stringify(blogId) });
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = data?._id;
    //dispatch(fetchBlogs({ id })); //update blogs state
  }, [dispatch]);

  //   const getBlog = async () => {
  //     try {
  //       const res = await getSingleBlog({ id: blogId }).unwrap();
  //       console.log(JSON.stringify(res));
  //       return data;
  //     } catch (error) {
  //       console.log(error);
  //       return "ERROR";
  //     }
  //   };

  async function handleDelete(id) {
    const res = await deleteBlog({ id }).unwrap(); // delete from db
    dispatch(removeBlog({ ...res })); // delete from state
    console.log("DELETE", res);
    //dispatch(fetchBlogs(data))
    navigate("/blog/myblogs");
  }

  // function handleEdit(id) {
  //   navigate("/blog/edit")
  // }

  if (isLoading) return <LoadingSpinner />;

  const styles = userInfo ? { flex: 1 } : null;
  return (
    <>
      {data && !isLoading && (
        <Col lg={4} sm={10} className="mt-4">
          <Card variant="secondary">
            <Card.Title className="text-center mt-2">{data?.title}</Card.Title>
            <Card.Body className="d-flex">
              <p style={styles}>
                {data?.body.length > 80
                  ? `${data?.body.slice(0, 80)}...`
                  : data?.body}
              </p>{" "}
              {userInfo._id === data?.author._id && (
                <div className="justify-content-end">
                  <LinkContainer
                    className="mx-2"
                    to={`/blog/${data?._id}`}
                    style={{
                      border: "none",
                      color: "white",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    <FaEdit />
                  </LinkContainer>
                  <button
                    style={{
                      border: "none",
                      color: "white",
                      background: "none",
                    }}
                    onClick={() => handleDelete(data?._id)}
                  >
                    <FaRegTrashAlt />
                  </button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      )}
    </>
  );
}

// const altCard =           <Card key={data?.post._id}>
// <Card.Title className="text-center">{data?.post?.title}</Card.Title>
// <Card.Body className="d-flex">
//   <p style={styles}>{data?.post.body}</p>{" "}
//   {localStorage.getItem("userInfo") && (
//     <div className="justify-content-end">
//       <button
//         className="ms-auto"
//         style={{ border: "none", color: "white", background: "none" }}
//         onClick={() => handleDelete(data?.post._id)}
//       >
//         <FaEdit />
//       </button>
//       <button
//         className="ms-auto"
//         style={{ border: "none", color: "white", background: "none" }}
//         onClick={() => handleDelete(data?.post._id)}
//       >
//         <FaRegTrashAlt />
//       </button>
//     </div>
//   )}
// </Card.Body>
// </Card>

export default SingleBlog;
