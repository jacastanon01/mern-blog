import { formatISO9075 } from "date-fns";
import FormContainer from "../../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useGetSingleBlogQuery } from "../../redux/slices/blogsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { LinkContainer } from "react-router-bootstrap";
import BlogCard from "../../components/blog/BlogCard";
import EditForm from "../../components/blog/EditForm";

function SingleBlog() {
  const { blogId } = useParams();
  const { data, isLoading, error } = useGetSingleBlogQuery({ blogId });
  const { userInfo } = useSelector((state) => state.auth);

  const cardStyles = {
    outline: "none",
    height: "100%",
    boxShadow: "rgba(255, 255, 255, 0.1) 4px 4px 12px 12px",
  };

  const bodyStyles = {
    fontSize: "calc(1em + 1vw)",
  };

  const titleContent = data && (
    <div className="d-flex flex-column justify-content-center align-items-center mt-3">
      <h1 className="text-uppercase">{data?.post.title}</h1>
      <div className="mb-2 w-50 ms-auto" style={{ fontSize: "0.7em" }}>
        <span>Written by:</span>
        <LinkContainer
          to={`../user/${data?.post.author._id}`}
          style={{ cursor: "pointer" }}
        >
          <span className=" ms-2 text-capitalize text-decoration-underline">
            {data?.post.author.name}
          </span>
        </LinkContainer>
        <time style={{ fontSize: "0.7rem", display: "block" }}>
          {formatISO9075(new Date(data?.post.createdAt))}
        </time>
      </div>
    </div>
  );

  if (isLoading) return <LoadingSpinner />;
  if (error || !blogId) return <p>{error}</p>;
  return (
    data?.post.author && (
      <FormContainer>
        {userInfo.email !== data.post.author.email ? (
          <BlogCard
            post={data.post}
            styles={{ cardStyles, bodyStyles }}
            title={titleContent}
            body={data.post.body}
          />
        ) : (
          <EditForm />
        )}
      </FormContainer>
    )
  );
}

export default SingleBlog;
