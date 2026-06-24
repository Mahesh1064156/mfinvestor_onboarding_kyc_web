"use client";

import { updateVerification } from "./services";

export default function VerificationFeature({ id }: { id: string }) {
  return (
    <div className="p-6">
      <h1>Verification</h1>

      <button onClick={() => updateVerification(id, "VERIFIED")}>
        Approve
      </button>

      <button onClick={() => updateVerification(id, "REJECTED")}>
        Reject
      </button>
    </div>
  );
}