import ProfileNavLink from "@components/ProfileNavLink";
import React from "react";

const EmployerNavLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-full overflow-x-auto">
      <aside className="flex-1 mr-5 pb-56">
        <nav>
          <ul className="grid gap-3">
            <li>
              <ProfileNavLink href={"/employerAccount/employerAccountHome"}>
                Home
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/employerAccount/createJob"}>
                Create Job
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/employerAccount/employerMessaging"}>
                Messages
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/employerAccount/candidates"}>
                Candidates
              </ProfileNavLink>
            </li>
            <li>
              <ProfileNavLink href={"/employerAccount/employerSettings"}>
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

export default EmployerNavLayout;
