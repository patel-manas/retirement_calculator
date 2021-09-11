import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { SET_FUTURE_VALUE, SHOW_WITHDRAW_PLAN } from "./redux/actions";

const Savings = () => {
  const dispatch = useDispatch();

  const salary = useSelector((state) => +state.facts.salary);
  const roi = useSelector((state) => +state.facts.roi);
  const duration = useSelector(
    (state) => (+state.facts.r_age - +state.facts.age) * 12
  );
  const retirementAge = useSelector((state) => +state.facts.r_age);
  const amount = (salary * 0.3) / 12;
  const intrest = roi / 12 / 100;
  const futurevalue =
    (amount * (Math.pow(1 + intrest, duration) - 1)) / intrest;

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

  useEffect(() => {
    console.log("futurre value", futurevalue);
    dispatch({ type: SET_FUTURE_VALUE, payload: futurevalue });
  });

  const withdrawHandler = () => {
    dispatch({ type: SHOW_WITHDRAW_PLAN });
  };

  return (
    <div>
      <span
        style={{ paddingRight: "5px" }}
      >{`with current monthyly investment of `}</span>
      <span style={{ paddingRight: "5px", fontWeight: "bold" }}>
        {toInr(amount)}
      </span>
      <span style={{ paddingRight: "5px" }}>{`for ${
        duration / 12
      } years, At age of ${retirementAge} you will have a lumpsum amount of `}</span>
      <span style={{ paddingRight: "5px", fontWeight: "bold" }}>
        {toInr(futurevalue)}
      </span>
      <Button variant="contained" color="primary" onClick={withdrawHandler}>
        Withdraw Plan
      </Button>
    </div>
  );
};

export default Savings;
