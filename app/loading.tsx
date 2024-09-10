import { LoadingOverlay } from "@mantine/core";

const loading = () => {
  return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />;
};

export default loading;
