import { DataTable } from "../ui/data-table";
import { type Transaction, columns } from "./columns";

const data: Transaction[] = [
  {
    datetime: "2024-03-15T14:23:45Z",
    amount: "10.5",
    denom: "DYDX",
    sender: "dydx1p3ucd3ptpw902fluyjzhq3ffgq4ntdda3u7e38",
    recipient: "dydx18vgsfaarveyg7xy585657ak8a9jvut9z8yuzmv",
    type: "inflow",
  },
  {
    datetime: "2024-03-15T14:23:45Z",
    amount: "45213213125",
    denom: "DYDX",
    sender: "dydx1p3ucd3ptpw902fluyjzhq3ffgq4ntdda3u7e39",
    recipient: "dydx18vgsfaarveyg7xy585657ak8a9jvut9z8yuzml",
    type: "outflow",
  },
];

export const TransactionsTable = () => {
  return (
    <DataTable className="md:col-span-full" columns={columns} data={data} />
  );
};
