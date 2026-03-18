import PositionSizes from "../components/PositionSizes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

const Page = async () => {
  // Get user id
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");

  if (!cookie) {
    redirect("/login");
  }
  // let token = null;
  // if (cookie.value) {
  //   token = cookie.value;
  // }
  // const verify = jwt.verify(token, process.env.JWT_SECRET);
  return <PositionSizes />;
};

export default Page;
