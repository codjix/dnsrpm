"use client";
import { Button } from "@mantine/core";

const BackBtn = (props: any) => {
  return (
    <Button onClick={() => history.back()} {...props}>
      Go Back
    </Button>
  );
};

export default BackBtn;
