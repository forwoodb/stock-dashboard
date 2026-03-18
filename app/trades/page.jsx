import Transactions from "../components/Transactions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");
  if (!cookie) {
    redirect("/login");
  }
  return <Transactions />;
};

export default Page;
