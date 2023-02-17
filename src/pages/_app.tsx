import { trpc } from "@/utils/trpc";
import { AppType } from "next/dist/shared/lib/utils";

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default trpc.withTRPC(App);
