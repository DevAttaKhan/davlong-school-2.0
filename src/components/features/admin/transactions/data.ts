export interface Transaction {
  id: string;
  leadId: string;
  date: string;
  user: string;
  from: string;
  to: string;
  routeType: "One Way" | "Return";
  amount: number;
  status: "COMPLETED" | "PENDING" | "FAILED";
  installments: string; // e.g., "0/1"
  paymentId: string;
  paymentType: string;
  created: string;
  updated: string;
}

export const dummyTransactions: Transaction[] = [
  {
    id: "38",
    leadId: "386",
    date: "2026-02-06T20:00:00",
    user: "testing teacher 2",
    from: "ZARA",
    to: "Wexford",
    routeType: "One Way",
    amount: 875,
    status: "COMPLETED",
    installments: "0/1",
    paymentId: "plink_1Sx54hQ9QwZTtO5qRJdhcZsM",
    paymentType: "COMPLETE",
    created: "2026-02-04T17:20:52",
    updated: "2026-02-04T17:21:37",
  },
  {
    id: "39",
    leadId: "390",
    date: "2026-02-05T20:00:00",
    user: "testing1",
    from: "ZARA",
    to: "Woodford",
    routeType: "Return",
    amount: 855,
    status: "COMPLETED",
    installments: "",
    paymentId: "plink_2",
    paymentType: "COMPLETE",
    created: "2026-02-04T10:00:00",
    updated: "2026-02-04T10:05:00",
  },
  {
    id: "40",
    leadId: "391",
    date: "2026-02-05T20:00:00",
    user: "testing2",
    from: "ZARA",
    to: "Athlone",
    routeType: "Return",
    amount: 830,
    status: "COMPLETED",
    installments: "0/1",
    paymentId: "plink_3",
    paymentType: "COMPLETE",
    created: "2026-02-04T11:00:00",
    updated: "2026-02-04T11:05:00",
  },
  {
    id: "41",
    leadId: "392",
    date: "2026-02-05T20:00:00",
    user: "testing3",
    from: "ZARA",
    to: "Farnham Estate",
    routeType: "One Way",
    amount: 425,
    status: "COMPLETED",
    installments: "0/1",
    paymentId: "plink_4",
    paymentType: "COMPLETE",
    created: "2026-02-04T12:00:00",
    updated: "2026-02-04T12:05:00",
  },
  {
    id: "42",
    leadId: "385",
    date: "2026-02-04T20:00:00",
    user: "testing teacher",
    from: "ZARA",
    to: "Wexford",
    routeType: "One Way",
    amount: 460,
    status: "COMPLETED",
    installments: "",
    paymentId: "plink_5",
    paymentType: "COMPLETE",
    created: "2026-02-03T10:00:00",
    updated: "2026-02-03T10:05:00",
  },
];
