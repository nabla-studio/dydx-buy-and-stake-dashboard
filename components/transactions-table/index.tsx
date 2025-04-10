import { DataTable } from "../ui/data-table";
import { type Transaction, columns } from "./columns";

const data: Transaction[] = [
  {
    hash: "0x7f8ed52f3f76c48d8b32b761c74032b8c64d72d993217a6bb85d3fbc0c8f3b2e",
    date: "2024-03-15T14:23:45Z",
    amount: "10.5",
  },
  {
    hash: "0x3a1b2c3d4e5f6789abcdef0123456789abcdef0123456789abcdef0123456789",
    date: "2024-03-15T14:22:30Z",
    amount: "5.75",
  },
  {
    hash: "0xf9e8d7c6b5a4932187654321fedcba9876543210fedcba9876543210fedcba98",
    date: "2024-03-15T14:20:15Z",
    amount: "2.25",
  },
  {
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    date: "2024-03-15T14:18:00Z",
    amount: "15.0",
  },
];

export const TransactionsTable = () => {
  return (
    <DataTable className="md:col-span-full" columns={columns} data={data} />
  );
};
