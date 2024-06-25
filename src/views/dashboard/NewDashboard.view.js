import React, { useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
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
import { actionKsDashboard } from "../../actions/Dashboard.action";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const NewDashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector((state) => state?.dashboard);

  useEffect(() => {
    dispatch(actionKsDashboard());
  }, []);

  const productTotal = useMemo(() => {
    if (dashboard?.products) {
      return (
        (dashboard.products.finished_goods ) /
        100
      );
    }
    return 0;
  }, [dashboard]);

  return (
    <div className={styles.gridContainer}>
      {/*<PageTitle title="Dashboard"/>*/}
      <Grid className={styles.rightContainer}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Total Employees"}
              image={totalEmpImg}
              total={dashboard?.employees?.total}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Active Employees"}
              image={activeEmpImg}
              total={dashboard?.employees?.active}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={6} xs={12}>
            <NewDashboardComponent
              title={"Inactive Employees"}
              image={inactiveEmpImg}
              total={dashboard?.employees?.inactive}
            />
          </Grid>
        </Grid>
        <Grid  style={{ marginTop: "15px" }}>
          <Card square className={styles.card}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className={styles.titleGrid}>Total Locations</div>
                  <div className={styles.newLine}/>
                </div>

                <div className={styles.totalCount}>
                  {dashboard?.locations?.total}
                </div>
              </div>
              <Grid container spacing={3} >
                <Grid item  sm={6} xs={12}>
                  <NewDashboardSecondComponent
                    subTitle={"Showrooms"}
                    image={showRoomEmpImg}
                    total={dashboard?.locations?.showroom}
                    isShowRoom={true}
                  />
                </Grid>
                <Grid item  sm={6} xs={12}>
                  <NewDashboardSecondComponent
                    subTitle={"Factory"}
                    image={factoryEmpImg}
                    total={dashboard?.locations?.factory}
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
        xs={12}
        sm={8}
        className={styles.leftContainer}
       
      >
        <Card  className={styles.circularContainer}>
          <CardContent>
            <div className={styles.headerNewLine}>
              <div className={styles.titleGrid}>Total Products</div>
              <div className={styles.newLine} />
            </div>
            <div className={styles.CircularProgressbar}>
              <CircularProgressbar
                value={productTotal}
                maxValue={1}
                text={`${productTotal * 100}%`}
                strokeWidth={"15"}
                styles={buildStyles({
                  textColor: true ? "#1285F9" : "#723AD4",
                  pathColor: "#FC8C5A",
                  trailColor: "#48AAF3",
                })}
              />
            </div>
            <div className={styles.actionButton}>
              <IconButton className={"dashActionBtn"} color="secondary">
                <FiberManualRecord className={styles.finshedGood} /> Finished
                Goods
              </IconButton>
              <IconButton className={"dashActionBtn"} color="secondary">
                <FiberManualRecord className={styles.rawMa} />
                Raw Material
              </IconButton>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default NewDashboard;
