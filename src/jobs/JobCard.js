import React, { useContext, useState } from "react";
import UserContext from "../auth/UserContext";
import { Button, Card, Grid, Text } from "@nextui-org/react";
/** Show limited information about a job.
 *
 * Is rendered by JobCardList to show a "card" for each job.
 *
 * Receives apply func prop from parent, which is called on apply.
 *
 * JobCardList -> JobCard
 */

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  React.useEffect(function updateAppliedStatus() {
    console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

    setApplied(hasAppliedToJob(id));
  }, [id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  const Item =({ title, salary, equity }) => {
    return(
      <Card isPressable css={{"marginLeft":"100px", "marginRight":"100px", backgroundColor:"#627D98"}}>
        <Card.Header>
          <Text h4>{title}</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          {salary && <Text h4>Salary: {formatSalary(salary)}</Text>}
          {equity && <Text h4>Equity: {equity}</Text>}
          <Button onClick={handleApply}>{applied ? "Applied" : "Apply"}</Button>
        </Card.Body>
      </Card>
    )
  }

  return (
    <div className="JobCard card"> {applied}
    
    <Grid.Container gap={2} >
          <Grid xs={12}>
            <Item title={title} salary={salary} equity={equity}/>
          </Grid>
    </Grid.Container>
      
        {/* <div className="card-body">
          <h6 className="card-title">{title}</h6>
          <p>{companyName}</p>
          {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
          {equity !== undefined && <div><small>Equity: {equity}</small></div>}
          <button
              className="btn btn-danger font-weight-bold text-uppercase float-right"
              onClick={handleApply}
              disabled={applied}
          >
            {applied ? "Applied" : "Apply"}
          </button>
        </div> */}
      </div>
  );
}

/** Render integer salary like '$1,250,343' */

function formatSalary(salary) {
  const digitsRev = [];
  const salaryStr = salary.toString();

  for (let i = salaryStr.length - 1; i >= 0; i--) {
    digitsRev.push(salaryStr[i]);
    if (i > 0 && i % 3 === 0) digitsRev.push(",");
  }

  return digitsRev.reverse().join("");
}


export default JobCard;
