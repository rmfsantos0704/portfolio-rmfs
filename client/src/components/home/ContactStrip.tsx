import { Icon } from "../ui/Icon";
import type { Profile } from "../../types";

export function ContactStrip({ profile }: { profile: Profile }) {
  const phoneHref = profile.phone ? `tel:${profile.phone.replace(/\s/g, "")}` : undefined;

  return (
    <div className="contact-strip" aria-label="Contact information">
      <a href={`mailto:${profile.email}`}>
        <Icon name="mail" size={17} />
        <span>
          <small>Email</small>
          {profile.email}
        </span>
      </a>
      {profile.phone && (
        <a href={phoneHref}>
          <Icon name="phone" size={17} />
          <span>
            <small>Phone</small>
            {profile.phone}
          </span>
        </a>
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
