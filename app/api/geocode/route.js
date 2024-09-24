import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { location } = await req.json();
  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.GOOGLE_GEOCODE_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location,
  )}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new error("Failed to fetch data");
    }
    const data = await response.json();

    return new Response(JSON.stringify(data.results[0].geometry.location));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
