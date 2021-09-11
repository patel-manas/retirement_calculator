import React from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { FactsForm } from "./FactsForm";
import Savings from "./Savings";
import WithdrawPlan from "./WithdrawPlan";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "teal",
    color: "white",
  },
  layout: {
    color: "black",
    marginTop: "64px",
    margin: "20px 40px",
  },
}));

function App() {
  const classes = useStyles();
  const showCalculations = useSelector((s) => s.showCalculation);
  const showWithdrawPlan = useSelector((s) => s.showWithdrawPlan);
  return (
    <>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Retirement Calculator
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <FactsForm />
        {showCalculations && <Savings />}
        {showWithdrawPlan && <WithdrawPlan />}
      </main>
    </>
  );
}

export default App;
