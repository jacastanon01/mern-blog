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

function SingleBlog({ data, name }) {
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  async function handleDelete(id) {
    await deleteBlog({ id }).unwrap(); // delete from db
  }

  if (isLoading) return <LoadingSpinner />;

  const styles = userInfo ? { flex: 1 } : null;
  return (
    <>
      {data && (
        <Col lg={4} sm={12}>
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

export default SingleBlog;
