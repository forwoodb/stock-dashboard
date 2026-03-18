import { redirect } from "next/navigation";
import WatchList from "../components/WatchList";
import { cookies } from "next/headers";

const Page = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");

  if (!cookie) {
    redirect("/login");
  }

  return <WatchList />;
};

export default Page;
