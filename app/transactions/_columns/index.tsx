"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon } from "lucide-react";

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge
            className="hover:bg-mute bg-muted font-bold text-primary"
            variant="default"
          >
            <CircleIcon className="mr-2 fill-primary" size={12} />
            Depósito
          </Badge>
        );
      }
      if (transaction.type === TransactionType.INVESTMENT) {
        return (
          <Badge
            className="hover:bg-mute bg-muted font-bold text-primary"
            variant="default"
          >
            <CircleIcon className="mr-2 fill-primary" size={12} />
            Investimento
          </Badge>
        );
      }
      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge
            className="hover:bg-mute bg-muted font-bold text-destructive"
            variant="default"
          >
            <CircleIcon className="mr-2 fill-destructive" size={12} />
            Despesa
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de pagamento",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "amount",
    header: "Valor",
  },
  {
    accessorKey: "actions",
  },
];
