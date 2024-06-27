import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import styles from "./Styles.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useMemo } from "react";

const NewDashboardSecondComponent = ({
  title,
  image,
  total,
  isShowRoom,
  subTitle,
  totalLocations,
  ...rest
}) => {
  console.log(total, totalLocations);
  const totalPersentage = total / totalLocations;
  const totalFixedValue = useMemo(() => {
    return totalPersentage * 100;
  }, [totalPersentage]);

  const customColor = () => {
    if (isShowRoom === true) {
      return styles.cardShowRoom;
    } else if (isShowRoom === false) {
      return styles.cardFactory;
    } else {
      return styles.cardWareHouse;
    }
  };
  const customPathColor = () => {
    if (isShowRoom === true) {
      return "#1285F9";
    } else if (isShowRoom === false) {
      return "#723AD4";
    } else {
      return "#E3BF2D";
    }
  };
  const customTrackColor = () => {
    if (isShowRoom === true) {
      return "#CCE5FF";
    } else if (isShowRoom === false) {
      return "#DECDFE";
    } else {
      return "#FBE58A";
    }
  };
  return (
    <div {...rest} className={customColor()}>
      <div>
        {/* className={classes.cardContent} */}
        <Grid>
          <Grid item>
            <Typography
              variant="h6"
              // className={classes.title}
              color="#161616"
              gutterBottom
              fontSize={16}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        {/* <div style={{ display: "inline-block" }}> */}
        <div className={styles.difference1}>
          <div className={styles.subDifference}>
            <Avatar
              src={image}
              variant="square"
              className={styles.avatorSecond}
            />
            <div className={styles.subContainer}>
              <div className={styles.totalCount}>{total}</div>
              <div className={styles.subTitle}>{subTitle}</div>
            </div>
          </div>
          <div style={{ width: "90px" }}>
            <CircularProgressbar
              value={totalFixedValue?.toFixed(0)}
              // maxValue={1}
              text={`${totalFixedValue?.toFixed(0)}%`}
              strokeWidth={"9"}
              styles={buildStyles({
                textColor: isShowRoom ? "#1285F9" : "#723AD4",
                pathColor: customPathColor(),
                trailColor: customTrackColor(),
                textSize: "1.3rem",
              })}
            />

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboardSecondComponent;
