import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="rounded-lg bg-gray-100 p-5 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Terms and Conditions</h1>
      <p className="mb-4">Effective Date: September 20, 2024</p>
      <p className="mb-4">
        Welcome to Delivery Jobs LLC, a company registered in Florida, providing
        an online platform at deliveryjobs.com. By using our services, you agree
        to comply with these Terms and Conditions. Please read them carefully.
      </p>

      <h2 className="mb-2 text-xl font-semibold">1. User Obligations</h2>
      <ul className="mb-4 list-inside list-disc">
        <li>
          Discrimination based on race, gender, age, religion, disability, or
          any other protected class.
        </li>
        <li>
          Offensive behavior, including harassment, hate speech, or
          inappropriate content.
        </li>
        <li>Illegal activity related to employment or job posting.</li>
      </ul>
      <p className="mb-4">
        Violation of these obligations will result in account suspension or
        termination.
      </p>

      <h2 className="mb-2 text-xl font-semibold">2. Account Information</h2>
      <p className="mb-4">
        To create an account, users must provide a full name, phone number,
        email address, and password. Employers are also required to input their
        company name, company website (optional), and full address, including
        street address, city, state, and zip code. Job seekers must provide the
        following additional information:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Personal Information</strong>: Full name, phone number, email
          address, password
        </li>
        <li>
          <strong>License Information</strong>: Class of driver’s license,
          issuing state, expiration date, and whether the job seeker has a DOT
          medical card (and its expiration date if applicable)
        </li>
        <li>
          <strong>CDL Information</strong>: If the job seeker has a CDL (and if
          the job seeker has a TWIK CARD and the other CDL options if
          applicable).
        </li>
        <li>
          <strong>Education Information</strong>: Highest level of education,
          date of completion (required); up to five certificates (optional)
        </li>
        <li>
          <strong>Additional Information</strong>: Car accident history in the
          past 3 years, DUI history in the past 10 years, age range (under 18,
          18-21, over 21), city, state, and zip code (all required)
        </li>
        <li>
          <strong>Optional Fields</strong>: Endorsements, work experience (up to
          five entries), certificates (up to five entries), DOT expiration date,
          TWIC card selections, and CDL information options
        </li>
      </ul>
      <p className="mb-4">
        Users can update their profile information at any time. Passwords are
        encrypted for security, and users can reset their passwords via an email
        link. Delivery Jobs LLC reserves the right to terminate any account for
        violations of these Terms and Conditions.
      </p>

      <h2 className="mb-2 text-xl font-semibold">
        3. Payment and Subscription
      </h2>
      <p className="mb-4">
        Employers must pay a monthly fee to post jobs. There are three
        subscription options based on the number of job posts allowed:
      </p>
      <ul className="mb-4 list-inside list-disc">
        <li>2 jobs</li>
        <li>5 jobs</li>
        <li>Unlimited jobs</li>
      </ul>
      <p className="mb-4">
        Payments are processed through Stripe, which stores card information and
        handles payment processing. Stripe’s terms and privacy policy apply.
        Payments are non-refundable, except in circumstances explicitly defined
        by Delivery Jobs LLC.
      </p>

      <h2 className="mb-2 text-xl font-semibold">4. Messaging System</h2>
      <p className="mb-4">
        Messaging between employers and job seekers is only enabled after a job
        seeker applies to a job, and the employer initiates contact. All past
        messages are stored within the system but are not encrypted. Users
        should not share sensitive information through the messaging system.
      </p>

      <h2 className="mb-2 text-xl font-semibold">5. User-Generated Content</h2>
      <p className="mb-4">
        Users retain full ownership of the content they create. Employers own
        their job postings, and job seekers own their resumes. Job seekers’
        resumes will only be shared with employers whose jobs they have applied
        to. Delivery Jobs LLC only uses this content to operate the platform and
        does not claim any ownership rights over user-generated content.
      </p>

      <h2 className="mb-2 text-xl font-semibold">6. Privacy Policy</h2>
      <p className="mb-4">Effective Date: September 20, 2024</p>
      <p className="mb-4">
        Delivery Jobs LLC ("we," "us," or "our") is committed to protecting your
        privacy. This Privacy Policy outlines how we collect, use, and protect
        your personal information when you visit and use our website,
        deliveryjobs.com.
      </p>

      <h3 className="mb-2 text-lg font-semibold">1. Information We Collect</h3>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Account Information</strong>: When you sign up for an employer
          or job seeker account, we collect your full name, phone number, email
          address, and password. Employers must also provide their company name,
          company website (optional), and full address (street address, city,
          state, and zip code). Job Seekers must also provide additional
          information upon the creation of their account. That information is
          listed in section 2 of the Terms and Conditions (Account Information)
        </li>
        <li>
          <strong>Payment Information</strong>: Payments for job postings are
          processed through Stripe. We do not store credit card details
          directly; Stripe manages all payment information under their own terms
          and privacy policy.
        </li>
        <li>
          <strong>Content</strong>: Employers create job listings, and job
          seekers create resumes. Resumes contain driver’s license information,
          CDL license information, DOT medical card information, endorsements,
          certificates, past job experience, education, car accident history in
          the past 3 years, DUI history in the past 10 years, age range (under
          18, 18-21, over 21), and city, state, and zip code. This content is
          shared only with employers whose jobs the job seeker has applied to.
        </li>
        <li>
          <strong>Messaging Data</strong>: Messaging between users (employers
          and job seekers) is stored on our platform but is not encrypted. Users
          should avoid sharing sensitive personal information through this
          system.
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-semibold">
        2. How We Use Your Information
      </h3>
      <ul className="mb-4 list-inside list-disc">
        <li>To create and manage your account.</li>
        <li>To process payments for job postings.</li>
        <li>To provide, operate, and improve our platform.</li>
        <li>To communicate with you about your account or services.</li>
        <li>
          To store and maintain past messages between employers and job seekers.
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-semibold">
        3. How We Share Your Information
      </h3>
      <ul className="mb-4 list-inside list-disc">
        <li>
          <strong>Service Providers</strong>: We share payment details with
          Stripe to process payments.
        </li>
        <li>
          <strong>Legal Compliance</strong>: We may share information to comply
          with legal obligations, such as responding to subpoenas or court
          orders.
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-semibold">
        4. Security of Your Information
      </h3>
      <p className="mb-4">
        We take reasonable steps to protect your personal information from
        unauthorized access, use, or disclosure. Passwords are encrypted for
        security purposes. However, please note that messages sent through our
        platform are not encrypted. While we do our best to protect your data,
        no method of transmission over the internet or electronic storage is
        100% secure.
      </p>

      <h3 className="mb-2 text-lg font-semibold">5. Your Rights</h3>
      <ul className="mb-4 list-inside list-disc">
        <li>Access the information we hold about you.</li>
        <li>Request that we correct any inaccuracies.</li>
        <li>Update or modify your profile information at any time.</li>
        <li>
          Request the deletion of your account and associated information
          (subject to legal requirements).
        </li>
      </ul>

      <h3 className="mb-2 text-lg font-semibold">6. Cookies</h3>
      <p className="mb-4">
        Our website uses cookies to enhance your experience and track usage. You
        can modify your browser settings to block cookies, but this may affect
        your ability to use certain features of the platform.
      </p>

      <h3 className="mb-2 text-lg font-semibold">
        7. Changes to This Privacy Policy
      </h3>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with the updated date.
      </p>

      <h3 className="mb-2 text-lg font-semibold">8. Contact Us</h3>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy, please
        contact us via the Contact Us page on our website.
      </p>
    </div>
  );
};

export default TermsAndConditions;
