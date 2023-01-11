import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";
import { Text } from "@nextui-org/react";

/** Company Detail page.
 *
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const { handle } = useParams();
  console.debug("CompanyDetail", "handle=", handle);

  const [company, setCompany] = useState(null);

  useEffect(function getCompanyAndJobsForUser() {
    async function getCompany() {
      setCompany(await JoblyApi.getCompany(handle));
    }

    getCompany();
  }, [handle]);

  if (!company) return <LoadingSpinner />;

  

  return (
      <div className="CompanyDetail col-md-8 offset-md-2">
        <Text h2 css={{"textAlign": "center"}}>{company.name}</Text>
        <Text h6 css={{"textAlign": "center"}}>{company.description}</Text>
        <JobCardList jobs={company.jobs} />
      </div>
  );
}

export default CompanyDetail;
