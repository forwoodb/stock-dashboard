import { cookies } from "next/headers";
import Stocks from "./components/Stocks";
import { redirect } from "next/navigation";

const Page = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  if (!cookie) {
    redirect("/login");
  }
  return <Stocks />;
};

export default Page;
