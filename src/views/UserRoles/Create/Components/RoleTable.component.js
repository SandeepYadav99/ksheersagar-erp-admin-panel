
import React from 'react';
import {
    withStyles, Paper,
    Table, TableBody, TableCell, TableRow
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import styles from './Style.module.css';

const RoleTableComponent = ({ classes, data }) => {

    const renderRows = () => {
        return (
            <TableRow>
                <TableCell classes={{ root: classes.tableCell }}>Modules</TableCell>
                
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>All Location<Checkbox color={'primary'} /></div></TableCell>
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>All Records<Checkbox color={'primary'} /></div></TableCell>
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>Read<Checkbox color={'primary'} /></div></TableCell>
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>Write<Checkbox color={'primary'} /></div></TableCell>
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>Update<Checkbox color={'primary'} /></div></TableCell>
                <TableCell classes={{ root: classes.tableCell }}><div className={styles.crud}>Delete<Checkbox color={'primary'} /></div></TableCell>
            </TableRow>
        );
    };

    return (
        <Paper>
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    {renderRows(data)}
                    <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                        <TableCell classes={{ root: classes.singleCell }}><Checkbox color={'primary'} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
};

const useStyle = theme => ({
    tableCell: {
        color: 'black',
        fontSize: '0.90rem',
        textTransform: 'capitalize',
    },
    singleCell: {
        textAlign: 'center'
    }
});

export default withStyles(useStyle, { withTheme: true })(RoleTableComponent);
