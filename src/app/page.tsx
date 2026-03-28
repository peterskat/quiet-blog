import type { Metadata } from "next";
import { GatewayFooter } from "@/components/home/gateway-footer";
import { GatewayInvitations } from "@/components/home/gateway-invitations";
import { gatewayMetadata } from "@/lib/blog/config";

export const metadata: Metadata = gatewayMetadata;

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-0px)] bg-[#f7f1e8]">
      <GatewayInvitations />
      <GatewayFooter />
    </div>
  );
}
