import { cookies } from "next/headers";
import { decodeJwt } from "jose";
import { Navbar } from "@/components/navbar";

export default async function CheckAuthServer() {
  let isAuth: boolean = false;

  const store = await cookies();
  const jwt = store.get("jwt")?.value;

  if (jwt) {
    try {
      const { exp } = decodeJwt(jwt);

      isAuth = !!exp && exp * 1000 > Date.now();
    } catch (e) {
      console.log("Error decoding JWT in navBarServerWrapper:", e);
    }
  }

  return <Navbar isAuth={isAuth} />;
}
