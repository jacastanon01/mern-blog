import { Spinner } from "react-bootstrap";

export function LoadingSpinner() {
  return (
    <article className="ms-auto h-auto w-100">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </article>
  );
}
