import React from "react";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
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
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FiberManualRecord } from "@material-ui/icons";
const NewDashboard = () => {
  const [data, setData] = useState([]);

  return (
    <Grid container style={{ gap:"20px" }}>
      {/*<PageTitle title="Dashboard"/>*/}
      <Grid >
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Total Employees"}
              image={totalEmpImg}
              total={52}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Active Employees"}
              image={activeEmpImg}
              total={"48"}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Inactive Employees"}
              image={inactiveEmpImg}
              total={"06"}
            />
          </Grid>
        </Grid>
        <Grid lg={12} style={{ marginTop: "14px" }}>
          <Card square className={styles.card}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className={styles.titleGrid}>Total Employees</div>
                <div className={styles.totalCount}>52</div>
              </div>
              <Grid container spacing={3} style={{ marginTop: "10px" }}>
                <Grid item lg={6} md={5} sm={6} xs={12}>
                  <NewDashboardSecondComponent
                    subTitle={"Showrooms"}
                    image={showRoomEmpImg}
                    total={"48"}
                    isShowRoom={true}
                  />
                </Grid>
                <Grid item lg={6} md={5} sm={6} xs={12}>
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
        </Grid>
      </Grid>
      {/* Second section  */}

      <Grid
        item
        // md={6}
        // lg={3}
        // sm={8}
        // xs={12}
      md={4}
      lg={4}
      // xs={12}
      // sm={8}
      style={{marginTop:'2px'}}
      >
        <Card>
          <CardContent>
           <div className={styles.titleGridTotal}>Total Products</div>
           <div style={{width:"50%", height:"auto", margin:"auto"}}>

            <CircularProgressbar
              value={"0.66"}
              maxValue={1}
              text={`${"0.66" * 100}%`}
              strokeWidth={"12"}
              styles={buildStyles({
                textColor: true ? "#1285F9" : "#723AD4",
                pathColor: "#FC8C5A",
                 trailColor: "#48AAF3"
              })}
            />
           </div>
            <div className={styles.actionButton}>
              <IconButton   className={"dashActionBtn"}
              color="secondary"><FiberManualRecord className={styles.finshedGood} />  Finished Goods</IconButton>
              <IconButton   className={"dashActionBtn"}
              color="secondary"><FiberManualRecord className={styles.rawMa}/>Raw Material</IconButton>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NewDashboard;
