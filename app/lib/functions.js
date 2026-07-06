import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

// refactor to two functions: one to get the token, and one to verify the token and return the user id
export const getUserId = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt-sd");

  if (!cookie) {
    redirect("/login");
  }

  let token = null;
  if (cookie.value) {
    token = cookie.value;
  }

  let verify;

  try {
    verify = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    redirect("/login");
  }

  const userId = verify._id;

  return userId;
};
