import React from "react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@material-ui/core";
import NewDashboardComponent from "./components/StatCard/NewDashboardComponent";
import styles from "./Style.module.css";
import totalEmpImg from "../../assets/img/ic_total_employees@2x.png";
import activeEmpImg from "../../assets/img/ic_active_employees@2x.png";
import inactiveEmpImg from "../../assets/img/ic_inactive_employees@2x.png";
import factoryEmpImg from "../../assets/img/ic_factory@2x.png";
import showRoomEmpImg from "../../assets/img/ic_showroom@2x.png";
import NewDashboardSecondComponent from "./components/StatCard/NewDashboardSecondComponent";
const NewDashboard = () => {
  const [data, setData] = useState([]);

  return (
    <>
      {/*<PageTitle title="Dashboard"/>*/}
      <Grid container spacing={3}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Total Employees"}
            image={totalEmpImg}
            total={52}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Active Employees"}
            image={activeEmpImg}
            total={"48"}
          />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <NewDashboardComponent
            title={"Inactive Employees"}
            image={inactiveEmpImg}
            total={"06"}
          />
        </Grid>
      </Grid>
      {/* Second section  */}

      <div style={{ width: "75%", marginTop: "14px" }}>
        <Card square className={styles.card}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                // className={classes.title}
                variant="h6"
                color="#161616"
                gutterBottom
                fontWaight={900}
                fontSize={18}
              >
                Total Employees
              </Typography>
              <Typography
                variant="h1"
                color="#161616"
                gutterBottom
                fontWaight={900}
                fontSize={44}
              >
                52
              </Typography>
            </div>
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={8} xs={12}>
                <NewDashboardSecondComponent
                  subTitle={"Showrooms"}
                  image={showRoomEmpImg}
                  total={"48"}
                  isShowRoom={true}
                />
              </Grid>
              <Grid item lg={6} md={5} sm={8} xs={12}>
                <NewDashboardSecondComponent
                  subTitle={"Factory"}
                  image={factoryEmpImg}
                  total={"48"}
                  isShowRoom={false}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NewDashboard;
