import React from "react";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import NewDashboardComponent from "./components/StatCard/NewDashboardComponent";

const NewDashboard = () => {
  const [data, setData] = useState([]);

  return (
    <>
      {/*<PageTitle title="Dashboard"/>*/}
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Total Employees"}
            image={""}
            total={52}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Active Employees"}
            image={""}
            total={"48"}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Inactive Employees"}
            image={""}
            total={"06"}
          />
        </Grid>
      </Grid>
      {/* Second section  */}
      {/* <Grid container>
        <Grid item xs={12}>
          Hi
        </Grid>
      </Grid> */}
    </>
  );
};

export default NewDashboard;
