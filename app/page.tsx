// pages/index.js
"use strict";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import LandingPage from "./components/LandingPage";

export default async function Home() {
  const session = await getServerSession(options);
  return <LandingPage session={session} />;
}