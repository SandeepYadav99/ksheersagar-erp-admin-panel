import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import styles from "./Styles.module.css";
const NewDashboardSecondComponent = ({
  title,
  image,
  total,
  isShowRoom,
  subTitle,
  ...rest
}) => {
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
        <div className={styles.difference}>
          <div className={styles.subDifference}>
            <Avatar
              src={image}
              variant="square"
              className={styles.avatorSecond}
            />
            <div className={styles.subContainer}>
              <Typography
                variant="h1"
                fontWaight={900}
                fontSize={44}
                color="#161616"
              >
                {total}
              </Typography>
              <Typography>{subTitle}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewDashboardSecondComponent;
