import Job from "@models/job";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request) {
  await connectToDB();
  try {
    // find all jobs
    const jobs = await Job.find({ active: true }).populate("creator");
    //const jobs = await Job.find({}).populate("creator");

    // get all params
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const maxDistance = searchParams.get("distance");
    const userLocation = searchParams.get("location");

    // get user coordinates from google api
    const apiKey = process.env.GOOGLE_GEOCODE_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      userLocation,
    )}&key=${apiKey}`;

    let userCoordinates;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new error("Failed to fetch data");
      }
      const data = await response.json();
      userCoordinates = data.results[0].geometry.location;
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: 500 },
      );
    }

    // distance formula
    function haversineDistance(coords1, coords2) {
      const toRadians = (degrees) => degrees * (Math.PI / 180);

      const lat1 = toRadians(coords1.lat);
      const lon1 = toRadians(coords1.lng);
      const lat2 = toRadians(coords2.latitude);
      const lon2 = toRadians(coords2.longitude);

      const dLat = lat2 - lat1;
      const dLon = lon2 - lon1;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const radiusOfEarth = 6371; // Radius of Earth in kilometers
      const distance = radiusOfEarth * c;

      return distance * 0.621371; // Distance in kilometers
    }

    // filter jobs
    const filteredJobs = jobs.filter((job) => {
      if (maxDistance == 12500) {
        return (
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.companyName.toLowerCase().includes(query.toLowerCase()) ||
          job.description.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        const jobCoordinates = {
          latitude: job.latitude,
          longitude: job.longitude,
        };
        const distance = haversineDistance(userCoordinates, jobCoordinates);
        return (
          (job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.companyName.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase())) &&
          distance <= maxDistance
        );
      }
    });

    return new Response(JSON.stringify(filteredJobs.reverse()), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all jobs", { status: 500 });
  }
}
