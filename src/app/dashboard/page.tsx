import type { Metadata } from "next"
import DashNav from "./nav"

export const metadata: Metadata = {
  title: "Tổng quan ‹ SBS System",
  description: "SBS System Website",
}

function Dashboard() {
  return (
    <>
      <DashNav />

    </>
  )
}

export default Dashboard
