"use client"

import Link from "next/link"
import Image from "next/image"

function DashNav() {
  return (
    <nav className="d-flex justify-content-between">
      <div className="s-nav-logo">
        <Image
          src="/logo.png"
          alt="Vercel Logo"
          className="dark:invert"
          width={150}
          height={130}
          priority
        />
      </div>
      <div className="s-nav-right">

      </div>
    </nav>
  )
}

export default DashNav
