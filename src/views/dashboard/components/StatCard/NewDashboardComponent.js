import { Avatar, Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import styles from "./Styles.module.css";
export const NewDashboardComponent = ({ title, image, total, ...rest }) => {
  return (
    <Card {...rest} square className={styles.card}>
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
          <Avatar src={image} variant="square" className={styles.avator} />

          <Typography variant="h1" fontWaight={900} fontSize={44} color="#161616">
            {total}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewDashboardComponent;
