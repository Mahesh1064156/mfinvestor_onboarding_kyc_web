import VerificationFeature from "@/features/verification";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <VerificationFeature id={id} />;
}