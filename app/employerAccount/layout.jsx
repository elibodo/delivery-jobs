import EmployerNavLink from "@components/EmployerNavLink";
import React from "react";

const EmployerNavLayout = ({ children }) => {
  return (
    <div className="flex gap-8">
      <aside className="flex-1">
        <nav>
          <ul className=" grid gap-4">
            <li>
              <EmployerNavLink href={"/employerAccount/employerAccountHome"}>
                home
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/createJob"}>
                create
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/myJobs"}>
                job
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/employerMessaging"}>
                message
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/candidates"}>
                candiste
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/analytics"}>
                sstats
              </EmployerNavLink>
            </li>
            <li>
              <EmployerNavLink href={"/employerAccount/employerSettings"}>
                settingngg
              </EmployerNavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className=" bg-gray-100 p-4 rounded">{children}</div>
    </div>
  );
};

export default EmployerNavLayout;
