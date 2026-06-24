"use client";

import { useEffect, useState } from "react";
import { getAuditLogs } from "./services";

export default function AuditFeature() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(setLogs);
  }, []);

  return (
    <div className="p-6">
      <h1>Audit Trail</h1>

      {logs.map((log: any, i) => (
        <div key={i}>
          {log.action} - {log.timestamp}
        </div>
      ))}
    </div>
  );
}
