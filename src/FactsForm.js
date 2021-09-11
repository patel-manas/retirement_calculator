import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { updateFacts } from "./redux/actions";

const getAge = (dateString) => {
  dateString = dateString.replace("-", "/");
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const FactsForm = () => {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.facts.name);
  const email = useSelector((state) => state.facts.email);
  const dob = useSelector((state) => state.facts.dob);
  const age = useSelector((state) => getAge(state.facts.dob));
  const retirementAge = useSelector((state) => state.facts.r_age);
  const salary = useSelector((state) => state.facts.salary);
  const currentExpense = useSelector((state) => state.facts.currentExpense);
  const roi = useSelector((state) => state.facts.roi);
  const inf = useSelector((state) => state.facts.inf);

  const [errorTexts, setErrorTexts] = useState({
    name: "",
    email: "",
    dob: "",
    age: "",
    retirementAge: "",
    salary: "",
    currentExpense: "",
    roi: "",
    inf: "",
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const dobRef = useRef();
  const ageRef = useRef();
  const r_ageRef = useRef();
  const salaryRef = useRef();
  const currentExpenceRef = useRef();
  const roiRef = useRef();
  const infRef = useRef();

  useEffect(() => {
    console.log({
      name,
      email,
      dob,
      retirementAge,
      salary,
      currentExpense,
      roi,
      inf,
    });
  });

  const calculateHandler = () => {
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      dob: dobRef.current.value,
      age: ageRef.current.value,
      retirementAge: r_ageRef.current.value,
      salary: salaryRef.current.value,
      currentExpense: currentExpenceRef.current.value,
      roi: roiRef.current.value,
      inf: infRef.current.value,
    };
    console.log("button", payload, errorTexts);

    if (Object.keys(errorTexts).every((k) => errorTexts[k] === "")) {
      dispatch(updateFacts({ payload }));
    }
  };

  const validationHandler = (field) => {
    // const { target: { id = "" } = {} } = field || {};
    const id = get(field, "target.id", "");
    const value = get(field, "target.value", "");
    console.log({ id, value });
    switch (id) {
      case "name": {
        if (value === "") {
          setErrorTexts({ ...errorTexts, [id]: "error" });
        } else {
          setErrorTexts({ ...errorTexts, [id]: "" });
        }
      }
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Financial Asumptions
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            defaultValue={name}
            inputRef={nameRef}
            error={errorTexts.name != "" ? true : false}
            helperText={errorTexts.name}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            defaultValue={email}
            inputRef={emailRef}
            error={errorTexts.email != "" ? true : false}
            helperText={errorTexts.email}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            id="dob"
            label="DOB"
            type="date"
            defaultValue={dob}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={dobRef}
            error={errorTexts.dob != "" ? true : false}
            helperText={errorTexts.dob}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="age"
            name="age"
            label="Age"
            defaultValue={age}
            inputRef={ageRef}
            error={errorTexts.age != "" ? true : false}
            helperText={errorTexts.age}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="retirementAge"
            name="retirementAge"
            label="Retirement Age "
            defaultValue={retirementAge}
            inputRef={r_ageRef}
            error={errorTexts.retirementAge != "" ? true : false}
            helperText={errorTexts.retirementAge}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="salary"
            name="salary"
            label="Salary(p/a)"
            defaultValue={salary}
            inputRef={salaryRef}
            error={errorTexts.salary != "" ? true : false}
            helperText={errorTexts.salary}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="expence"
            name="expence"
            label="Monthly Expence"
            defaultValue={currentExpense}
            inputRef={currentExpenceRef}
            error={errorTexts.currentExpense != "" ? true : false}
            helperText={errorTexts.currentExpense}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="roi"
            name="roi"
            label="Expected ROI"
            defaultValue={roi}
            inputRef={roiRef}
            error={errorTexts.roi != "" ? true : false}
            helperText={errorTexts.roi}
            onBlur={validationHandler}
          />
        </Grid>
        <Grid item xs={6} sm={3}>
          <TextField
            required
            id="inf"
            name="inf"
            label="Infalation"
            defaultValue={inf}
            inputRef={infRef}
            error={errorTexts.inf != "" ? true : false}
            helperText={errorTexts.name}
            onBlur={validationHandler}
          />
        </Grid>
      </Grid>
      <div
        style={{
          margin: "20px 0px",
        }}
      >
        <Button variant="contained" color="primary" onClick={calculateHandler}>
          Calculate
        </Button>
      </div>
    </>
  );
};
