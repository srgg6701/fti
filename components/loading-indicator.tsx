import { Spinner } from "@heroui/react";
import { Alert } from "@heroui/alert";

export default function LoadingIndicator({
  status,
}: {
  status?: "loading" | "error" | "success" | "idle";
}) {
  let messageBox;

  switch (status) {
    case "loading":
      messageBox = (
        <Spinner label="Loading data... Please wait..." variant="gradient" />
      );
      break;
    case "error":
      messageBox = (
        <Alert
          classNames={{
            base: "w-fit m-auto",
          }}
          color="secondary"
          title="Error loading data"
        />
      );
      break;
    case "idle":
      return null;
  }

  return <div className="text-center m-auto w-full">{messageBox}</div>;
}
