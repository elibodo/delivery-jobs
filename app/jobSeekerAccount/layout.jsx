import ProfileNavLink from "@components/ProfileNavLink";
import React from "react";

const JobSeekerNavLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-full overflow-x-auto">
      <aside className="flex-1 mr-5">
        <nav>
          <ul className="grid gap-3">
            <li>
              <ProfileNavLink href={"/jobSeekerAccount/jobSeekerResume"}>
                Resume
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/jobSeekerAccount/jobSeekerMessaging"}>
                Messaging
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/jobSeekerAccount/jobSeekerInfo"}>
                Update Information
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/jobSeekerAccount/jobSeekerSettings"}>
                Settings
              </ProfileNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="w-11/12 bg-gray-100 rounded">{children}</div>
    </div>
  );
};

export default JobSeekerNavLayout;
