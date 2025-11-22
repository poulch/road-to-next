import Link from "next/link";
import { ticketsPath } from "@/paths";

const HomePage = () => {
  return (<>
    <h3 className="text-3xl font-bold underline">Hello World</h3>
    <Link href={ticketsPath()}>Tickets</Link>
  </>)
};

export default HomePage;