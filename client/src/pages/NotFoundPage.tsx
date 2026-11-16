import { Link } from "react-router-dom";
import { PageView } from "../components/common/PageView";
import { Icon } from "../components/ui/Icon";

export default function NotFoundPage() {
  return (
    <PageView name="home">
      <section className="section not-found">
        <span className="kicker">404</span>
        <h2>This page wandered off.</h2>
        <Link className="button primary" to="/">
          Back home <Icon name="arrow" />
        </Link>
      </section>
    </PageView>
  );
}
