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
            <div className={styles.titleGrid}
            >
              {title}
            </div>
          </Grid>
        </Grid>
        <div className={styles.difference}>
          <Avatar src={image} variant="square" className={styles.avator} />

          <Typography className={styles.totalCount}>
            {total}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewDashboardComponent;
