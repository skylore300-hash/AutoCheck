export function formatDateTime(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toCsv(rows) {
  const header = ["id", "type", "query", "city", "status", "risk", "createdAt"];
  const lines = rows.map((row) =>
    [row.id, row.kind, row.query, row.city, row.status, row.risk, row.createdAt]
      .map((value) => `"${String(value ?? "").replaceAll("\"", "\"\"")}"`)
      .join(",")
  );

  return [header.join(","), ...lines].join("\n");
}
