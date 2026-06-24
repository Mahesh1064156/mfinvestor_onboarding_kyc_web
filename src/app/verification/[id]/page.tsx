import VerificationFeature from "@/features/verification";

export default function Page({ params }: { params: { id: string } }) {
  return <VerificationFeature id={params.id} />;
}