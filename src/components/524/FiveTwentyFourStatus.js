import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export function FiveTwentyFourStatus({ percent, label }) {
  console.log(percent);

  function foo() {
    if (percent >= 60) {
      return "danger";
    } else if (percent < 20 && percent > 80) {
      return "warning";
    }
  }

  const color = foo();
  return (
    <ProgressBar
      variant={
        percent >= 80
          ? "danger"
          : percent < 80 && percent > 20
          ? "warning"
          : "success"
      }
      now={percent}
      label={label}
      style={{ minHeight: "2.5rem" }}
      // striped
      // animated
    />
  );
}
