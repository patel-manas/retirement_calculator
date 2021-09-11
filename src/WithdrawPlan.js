import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const toInr = (val) => {
  let [x, y = ""] = ("" + val).split(".");
  y = y.slice(0, 2);
  x = x.toString();
  let lastThree = x.substring(x.length - 3);
  let otherNumbers = x.substring(0, x.length - 3);
  if (otherNumbers !== "") lastThree = "," + lastThree;
  let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  return "₹" + res + "." + y;
};

const getWithdrawdata = ({
  lumpsum = 0,
  roi = 0,
  inf = 0,
  r_age = 0,
  age = 0,
  currentExpense = 0,
}) => {
  let data = [];
  let expenseInFuture =
    +currentExpense * Math.pow(1 + +inf / 100, +r_age - +age);
  expenseInFuture = expenseInFuture * 12;
  data[0] = {
    year: +r_age + 1,
    withdrawAmount: expenseInFuture,
    capital: +lumpsum - +expenseInFuture,
  };
  for (let i = 1; i <= 25; i++) {
    let withdrawAmount = +data[i - 1]["withdrawAmount"] * (1 + +inf / 100);
    let capitalWithReturn =
      +data[i - 1]["capital"] * (1 + (+roi - +inf / 2) / 100);
    data.push({
      year: +r_age + 1 + i,
      withdrawAmount,
      capital: +capitalWithReturn - +withdrawAmount,
    });
  }
  console.table(data);
  return data;
};
const useStyles = makeStyles({
  table: {
    width: 650,
    marginTop: 40,
  },
});
const WithdrawPlan = () => {
  const classes = useStyles();
  const lumpsum = useSelector((s) => s.calculatuions.futureValue || 0);
  const roi = useSelector((s) => s.facts.roi || 0);
  const inf = useSelector((s) => s.facts.inf || 0);
  const r_age = useSelector((s) => s.facts.r_age || 0);
  const age = useSelector((s) => s.facts.age || 0);
  const currentExpense = useSelector((s) => s.facts.currentExpense || 0);
  const tabledata = getWithdrawdata({
    lumpsum,
    roi,
    inf,
    r_age,
    age,
    currentExpense,
  });
  useEffect(() => {
    // console.log("tabledata", tabledata);
  });
  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Age </TableCell>
            <TableCell> Withdraw P/A</TableCell>
            <TableCell>Remaining Capital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.map((row) => (
            <TableRow key={row.year}>
              <TableCell>{row.year}</TableCell>
              <TableCell>{toInr(row.withdrawAmount)}</TableCell>
              <TableCell>{toInr(row.capital)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WithdrawPlan;
