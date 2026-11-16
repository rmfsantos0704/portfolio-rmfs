import { PageView } from "../components/common/PageView";
import { ErrorState, LoadingState } from "../components/common/AsyncState";
import { CertificationList } from "../components/certifications/CertificationList";
import { Icon } from "../components/ui/Icon";
import { useApi } from "../hooks/useApi";
import { api } from "../services/api";

export default function CertificationsPage() {
  const { data: certifications, loading, error } = useApi(api.getCertifications);

  return (
    <PageView name="certifications">
      <section className="credentials-section">
        <div className="section">
          <div className="credentials-head">
            <div>
              <span className="kicker light">Credentials</span>
              <h2>
                Always learning.
                <br />
                Always improving.
              </h2>
            </div>
            <div className="cert-badge" aria-hidden="true">
              <Icon name="spark" size={30} />
              <span>{String(certifications?.length ?? 0).padStart(2, "0")}</span>
              <small>Certifications</small>
            </div>
          </div>
          {loading && <LoadingState label="Loading certifications…" />}
          {error && <ErrorState message={error} />}
          {certifications && <CertificationList certifications={certifications} />}
        </div>
      </section>
    </PageView>
  );
}
