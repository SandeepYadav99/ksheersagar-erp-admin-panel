import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import styles from "./Styles.module.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const NewDashboardSecondComponent = ({
  title,
  image,
  total,
  isShowRoom,
  subTitle,
  ...rest
}) => {
  const totalPersentage = total / 100;

  return (
    <Card
      {...rest}
      square
      className={isShowRoom === true ? styles.cardShowRoom : styles.cardFactory}
    >
      <CardContent>
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
        <div className={styles.difference1}>
          <div className={styles.subDifference}>
            <Avatar
              src={image}
              variant="square"
              className={styles.avatorSecond}
            />
            <div className={styles.subContainer}>
              <div className={styles.totalCount}>{total}</div>
              <div className={styles.subTitle}>
                {subTitle}
              </div>
            </div>
          </div>
          <div style={{ height: "30%", width: "30%" }}>
            <CircularProgressbar
              value={totalPersentage}
              maxValue={1}
              text={`${totalPersentage * 100}%`}
              strokeWidth={"12"}
              styles={buildStyles({
                textColor: isShowRoom ? "#1285F9" : "#723AD4",
                pathColor: isShowRoom ? "#1285F9" : "#723AD4",
                // trailColor: "gold",
                textSize: "1.3rem",
           
                
              })}
            />
            ;
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewDashboardSecondComponent;
