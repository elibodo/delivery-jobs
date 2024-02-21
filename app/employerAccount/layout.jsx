import EmployerNavLink from "@components/EmployerNavLink";
import React from "react";

const EmployerNavLayout = ({ children }) => {
  return (
    <div className="flex justify-center w-full">
      <aside className="flex-1 mr-5 mb-auto">
        <nav>
          <ul className="grid gap-3">
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
      <div className="w-11/12 bg-gray-100 rounded">{children}</div>
    </div>
  );
};

export default EmployerNavLayout;
