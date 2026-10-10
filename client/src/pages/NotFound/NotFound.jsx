import { Link } from "react-router-dom";
import PageSection from "../../components/PageSection/PageSection";

export default function NotFound() {
  return (
    <PageSection title="Page not found" intro="Sorry, that page doesn't exist.">
      <Link to="/">← Back to home</Link>
    </PageSection>
  );
}
