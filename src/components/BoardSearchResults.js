import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:hover": {
      cursor: "pointer"
    }
  }
});

const BoardSearchResults = ({ classes, rowData }) => {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Board</b>
            </TableCell>
            <TableCell>
              <b>Tickets</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map(row => (
            <TableRow
              key={row.board.id}
              hover={true}
              className={classes.row}
              onClick={() => window.open(row.board.shortUrl)}
            >
              <TableCell component="th" scope="row">
                {row.board.name}
              </TableCell>
              <TableCell>
                {row.cards.map(card => card.name).join(",  ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default withStyles(styles)(BoardSearchResults);
