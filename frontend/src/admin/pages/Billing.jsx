import React from "react";
import { Link } from "react-router-dom";

const plans = [
  {
    title: "Free Plan",
    price: 0,
    badgeLabel: "FREE",
    badgeColor: "rgba(255, 81, 0, 0.79)",
    badgeBg: "rgba(255, 241, 234, 0.95)",
    features: [
      "Manage up to 1,000 contacts",
      "Basic customer management tools",
    ],
    featuresColor: "gray",
    featuresFontSize: "14px",
    priceFontSize: "28px",
    currentLabelColor: "#333",
    current: true,
    showButton: true,
    buttonText: "You're Subscribed",
    buttonBg: "gray",
    buttonTextColor: "white",
    background: null,
    path: "/dashboard",
  },
  {
    title: "Pro Plan",
    price: 12,
    badgeLabel: "POPULAR",
    badgeColor: "rgba(0, 123, 255, 0.79)",
    badgeBg: "rgba(222, 240, 255, 0.95)",
    features: [
      "Upto 10,000 contacts per different roles",
      "Advanced analytics",
      "Priority support",
    ],
    featuresColor: "gray",
    featuresFontSize: "15px",
    priceFontSize: "30px",
    current: false,
    showButton: true,
    buttonText: "Upgrade to Pro",
    buttonBg: "#1d4ed8",
    buttonTextColor: "white",
    background: "rgba(245, 245, 255, 0.6)",
    path: "/upgrade/pro",
  },
  {
    title: "Enterprise Plan",
    price: "CUSTOM",
    badgeLabel: "ADVANCE",
    badgeColor: "rgba(237, 246, 255, 0.79)",
    badgeBg: "rgba(241, 249, 255, 0.95)",
    features: ["Unlimited contacts", "Advanced analytics", "Priority support"],
    featuresColor: "#E6F3F3",
    featuresFontSize: "15px",
    priceFontSize: "26px",
    currentLabelColor: "white",
    current: false,
    showButton: true,
    buttonText: "Contact Sales",
    buttonBg: "white",
    buttonTextColor: "#000",
    // background: 'rgba(3, 3, 3, 0.95)',
    background: "#1d4ed8",
    textColor: "white",
    path: "/contact-sales",
  },
];

function BillingCard({
  title,
  price,
  badgeLabel,
  badgeColor,
  badgeBg,
  features,
  current,
  background,
  textColor,
  featuresColor,
  currentLabelColor,
  priceFontSize,
  featuresFontSize,
  showButton,
  buttonText,
  buttonBg,
  buttonTextColor,
  path,
}) {
  const outerCircleStyle = {
    boxShadow: `0 0px 5px ${badgeColor}`,
    background: badgeColor,
  };
  const innerCircleStyle = {
    background: badgeBg,
  };
  const shadowStyle = {
    boxShadow: "0 0px 5px rgba(97, 97, 97, 0.12)",
  };

  return (
    <div
      style={{
        ...shadowStyle,
        background: background || "white",
        color: textColor || "inherit",
      }}
      className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg p-6 border border-gray-200 w-full sm:w-[300px] rounded-2xl flex flex-col justify-between"
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold">{title}</p>
          <div
            style={shadowStyle}
            className="flex border border-gray-100 rounded-3xl py-1 px-4 items-center gap-2 text-sm"
          >
            <div style={outerCircleStyle} className="p-1 rounded-full">
              <div style={innerCircleStyle} className="p-1 rounded-full"></div>
            </div>
            <p>{badgeLabel}</p>
          </div>
        </div>

        <p
          className="font-medium flex items-center gap-1"
          style={{ fontSize: priceFontSize || "28px" }}
        >
          {price === "CUSTOM" ? price : `$${price}`}
          {price !== "CUSTOM" && (
            <span className="text-sm text-gray-400">/month</span>
          )}
        </p>

        {current && (
          <div
            className="my-4 text-center w-full px-4 py-2 bg-gray-200 rounded-lg"
            style={{ color: currentLabelColor || "inherit" }}
          >
            Current Plan
          </div>
        )}

        <div
          className="flex flex-col mt-4 gap-2"
          style={{
            color: featuresColor || "inherit",
            fontSize: featuresFontSize || "14px",
          }}
        >
          {features.map((feat, idx) => (
            <p key={idx}>• {feat}</p>
          ))}
        </div>
      </div>

      {showButton && (
        <Link
          to={path || "#"}
          className="mt-6 w-full py-2 rounded-lg text-center transition"
          style={{
            backgroundColor: buttonBg || "#1d4ed8",
            color: buttonTextColor || "white",
          }}
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

function Billing() {
  const billingHistory = [
    { date: "2024-01-15", plan: "Free Plan", amount: "$0", status: "Active" },
    // { date: "2024-03-10", plan: "Pro Plan", amount: "$12", status: "Expired" },
    // {
    //   date: "2024-05-01",
    //   plan: "Enterprise Plan",
    //   amount: "Custom",
    //   status: "Contacted",
    // },
  ];

  return (
    <div className="">
      <div className="mb-8">
        <p className="text-blue-700 font-medium text-lg">
          Billing & Subscription
        </p>
        <p className="text-gray-500">
          Keep track of your subscription details, update billing info, and
          control payments.
        </p>
      </div>

      <div className="flex flex-wrap gap-6">
        {plans.map((plan, idx) => (
          <BillingCard key={idx} {...plan} />
        ))}
      </div>

      <div className="mt-16 w-full p-4 border-gray-300 bg-white border-1 rounded-lg">
        <p className="font-medium text-gray-700 mb-4">Billing History</p>

        <div className="flex flex-col divide-y">
          {billingHistory.map((entry, idx) => (
            <div
              key={idx}
              className={`flex justify-between py-3 px-2 rounded-lg ${
                idx % 2 === 0 ? "bg-gray-50" : ""
              }`}
            >
              <span className="w-1/4 text-gray-600">{entry.date}</span>
              <span className="w-1/4 text-gray-600">{entry.plan}</span>
              <span className="w-1/4 text-gray-600">{entry.amount}</span>
              <span className="w-1/4 text-gray-600">{entry.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Billing;
