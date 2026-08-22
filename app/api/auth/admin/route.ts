import { NextResponse } from "next/server";
import { authenticateAdmin, getDbAsync } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { passkey } = await request.json();

    if (!passkey) {
      return NextResponse.json(
        { success: false, message: "Admin passkey is required." },
        { status: 400 }
      );
    }

    const isValid = await authenticateAdmin(passkey);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid Admin Passkey." },
        { status: 401 }
      );
    }

    const db = await getDbAsync();

    return NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
      teams: db.teams,
    });
  } catch (error) {
    console.error("Admin Auth Error:", error);
    return NextResponse.json(
      { success: false, message: "Server authentication error." },
      { status: 500 }
    );
  }
}
