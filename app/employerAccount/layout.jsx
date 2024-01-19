import EmployerNavLink from "@components/EmployerNavLink";
import React from "react";

const EmployerNavLayout = ({ children }) => {
  return (
    <div className="flex gap-8 justify-center w-screen">
      <aside className="flex-1 ml-48 mb-auto">
        <nav>
          <ul className="grid gap-2">
            <li>
              <EmployerNavLink href={"/employerAccount/employerAccountHome"}>
                Home
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/createJob"}>
                Create Job
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/myJobs"}>
                My Jobs
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/employerMessaging"}>
                Messages
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/candidates"}>
                Candidates
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/analytics"}>
                Analytics
              </EmployerNavLink>
            </li>
            <li className="">
              <EmployerNavLink href={"/employerAccount/employerSettings"}>
                Settings
              </EmployerNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="mr-48 w-3/4 bg-gray-100 rounded">{children}</div>
    </div>
  );
};

export default EmployerNavLayout;
