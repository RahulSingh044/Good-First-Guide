import { NextRequest } from "next/server";
import { initializeSocket } from "@/socket/server";

// export const config = {
//   runtime: "nodejs",
// };

let serverStarted = false;

export async function GET(req: NextRequest) {
  if (!serverStarted) {
    // Access underlying Node.js server
    // @ts-ignore
    initializeSocket((global as any).server);
    serverStarted = true;
  }

  return new Response("Socket server running");
}
