import React from "react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <section className="relative bg-gray-200 px-4 py-16 text-center md:px-8 lg:py-24">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/truck.webp"
          alt="Semi Truck on the Road"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Headline and Description */}
        <h1 className="mb-4 text-3xl font-bold text-orange-600 md:text-4xl">
          Connecting Drivers and Employers Across the Nation
        </h1>
        <p className="mb-4 px-4 text-base text-gray-800 md:text-lg">
          Whether you're a driver seeking new opportunities or an employer
          looking for top talent, DeliveryJobs.com makes it easy to connect and
          succeed.
        </p>
        <p className="mb-8 px-4 text-base text-gray-800 md:text-lg">
          For job seekers, our signup process is tailored specifically for
          driving jobs, with options to include information like license class,
          endorsements, and other critical qualifications. This ensures that
          employers have access to the details they need, and drivers can
          highlight their skills to find roles that match their expertise.
        </p>
        <p className="mb-4 px-4 text-base text-gray-800 md:text-lg">
          Our goal is to keep hiring affordable for employers and make it easier
          for them to find the right candidates with minimal hassle. By focusing
          exclusively on driving-related positions, we streamline the hiring
          process so employers can quickly connect with qualified drivers.
        </p>

        {/* CTA Buttons */}
        <div className="mb-8 flex flex-col justify-center gap-4 md:flex-row md:gap-6">
          <a href="/" className="orange_button">
            Find Jobs
          </a>
          <a href="/signUp" className="gray_button">
            Post a Job
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
