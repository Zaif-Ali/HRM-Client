import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isProduction } from "./variables";

const TenStackQueryDevelopmentTools = () => {
  if (isProduction) return null;
  return (
    <ReactQueryDevtools
      initialIsOpen={false}
      position="bottom"
      buttonPosition="bottom-left"
    />
  );
};

export default TenStackQueryDevelopmentTools;