import { Card, Grid, Text } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ name, description, logoUrl, handle }) {
  console.debug("CompanyCard", logoUrl);
  const Item =({ name, description, logoUrl, handle }) => {
    return(
      <Card isPressable css={{"marginLeft":"100px", "marginRight":"100px", backgroundColor:"#627D98"}}>
        <Card.Header>
          <Text h4>{name}</Text>
        </Card.Header>
        <Card.Divider />
        <Card.Body>
          <Text h5>{description}</Text>
        </Card.Body>
        {/* <Card.Image 
          src={logoUrl}
          alt={name}/> */}
      </Card>
    )
  }
  return (
      <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <Grid.Container gap={2} justify="center">
          <Grid xs={12}>
            <Item name={name} description={description} logoUrl={logoUrl}/>
          </Grid>
        </Grid.Container>
      </Link>
  );
}

export default CompanyCard;
