import { CopyButton } from "../ui/CopyButton";
import { Icon } from "../ui/Icon";
import type { Profile } from "../../types";

export function ContactStrip({ profile }: { profile: Profile }) {
  return (
    <div className="contact-strip" aria-label="Contact information">
      <CopyButton text={profile.email} label="Copy email address" copiedLabel="Email copied">
        <Icon name="mail" size={17} />
        <span>
          <small>Email</small>
          {profile.email}
        </span>
      </CopyButton>
      {profile.phone && (
        <CopyButton text={profile.phone} label="Copy phone number" copiedLabel="Number copied">
          <Icon name="phone" size={17} />
          <span>
            <small>Phone</small>
            {profile.phone}
          </span>
        </CopyButton>
      )}
      {profile.socials.linkedin && (
        <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
          <Icon name="linkedin" size={17} />
          <span>
            <small>LinkedIn</small>
            {profile.name}
          </span>
        </a>
      )}
      {profile.socials.github && (
        <a href={profile.socials.github} target="_blank" rel="noreferrer">
          <Icon name="github" size={17} />
          <span>
            <small>GitHub</small>@{profile.socials.github.split("/").pop()}
          </span>
        </a>
      )}
      {profile.location && (
        <div>
          <Icon name="map" size={17} />
          <span>
            <small>Location</small>
            {profile.location}
          </span>
        </div>
      )}
    </div>
  );
}
