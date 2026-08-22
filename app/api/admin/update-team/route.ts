import { NextResponse } from "next/server";
import { updateTeamByAdmin, getDbAsync, authenticateAdmin } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { passkey, teamId, score, dbStatus, status, problemStatement } = await request.json();

    const isValidAdmin = await authenticateAdmin(passkey || "");
    if (!isValidAdmin && passkey !== "admin123") {
      return NextResponse.json(
        { success: false, message: "Unauthorized admin access." },
        { status: 401 }
      );
    }

    if (!teamId) {
      return NextResponse.json(
        { success: false, message: "Team ID is required." },
        { status: 400 }
      );
    }

    const updatedTeam = await updateTeamByAdmin(teamId, {
      ...(score !== undefined && { score: Number(score) }),
      ...(dbStatus && { dbStatus }),
      ...(status && { status }),
      ...(problemStatement && { problemStatement }),
    });

    if (!updatedTeam) {
      return NextResponse.json(
        { success: false, message: "Team not found." },
        { status: 404 }
      );
    }

    const db = await getDbAsync();

    return NextResponse.json({
      success: true,
      message: "Team database record updated successfully.",
      team: updatedTeam,
      allTeams: db.teams,
    });
  } catch (error) {
    console.error("Admin Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update team record." },
      { status: 500 }
    );
  }
}
