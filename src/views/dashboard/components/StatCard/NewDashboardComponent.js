import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import styles from "./Styles.module.css";
const NewDashboardComponent = ({title, image, total, ...rest}) => {
  return (
    <Card
       {...rest}
      square
      className={styles.card}
    >
      <CardContent>
        {/* className={classes.cardContent} */}
        <Grid>
          <Grid item>
            <Typography
              // className={classes.title}
              color="#161616"
              gutterBottom
              fontSize={18}
            >
              {"Total Employees"}
            </Typography>
          </Grid>
        </Grid>
        <div className={styles.difference}>
          <Avatar src="" variant="square" />

          <Typography fontWait={600} variant="h2">
            {"52"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewDashboardComponent;
