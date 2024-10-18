import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
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

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch data from Google API");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        { error: "No location data found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data.results[0].geometry.location);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while processing the request" },
      { status: 500 },
    );
  }
}
