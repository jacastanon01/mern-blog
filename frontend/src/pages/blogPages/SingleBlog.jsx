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
  const { data, isLoading, error } = useGetSingleBlogQuery(
    { blogId },
    { refetchOnMountOrArgChange: true }
  );
  const { userInfo } = useSelector((state) => state.auth);

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogId) return <p>{error}</p>;
  return (
    data?.post.author && (
      <FormContainer>
        {userInfo.email !== data.post.author.email ? (
          <BlogCard post={data.post} />
        ) : (
          <EditForm />
        )}
      </FormContainer>
    )
  );
}

export default SingleBlog;
