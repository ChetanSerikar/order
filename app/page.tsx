import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>CLICK HERE TO VIEW ORDERS</div>
      <Button>
        {" "}
        <Link
          href="/payments
      "
        >
          ORDERS
        </Link>
      </Button>
    </>
  );
}
