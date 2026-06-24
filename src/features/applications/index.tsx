"use client";

import { useEffect, useState } from "react";
import { getApplications } from "./services";

export default function ApplicationsFeature() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplications().then(setApps);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Application Review</h1>

      {apps.map((app: any) => (
        <div key={app.id}>
          {app.name} - {app.status}
        </div>
      ))}
    </div>
  );
}