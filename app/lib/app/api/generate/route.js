import { NextResponse } from "next/server";
import { generateBrand } from "../../../lib/generateBrand";

export async function POST(req) {
  try {
    const body = await req.json();
    const name = body?.name ?? "";
    const result = generateBrand(name);
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to generate brand" },
      { status: 500 }
    );
  }
}
