import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Package,
  Heart,
  ShoppingBag,
  Pencil,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Profile() {
  // Get logged-in user from AuthContext
  const { loggedInUser } = useAuth();

  // Default profile data
  const defaultProfile = {
    fullName: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    phone: "",
  };

  // Profile state
  const [profile, setProfile] = useState(defaultProfile);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Load saved profile
  useEffect(() => {
    const savedProfile = JSON.parse(
      localStorage.getItem("profile") || "null"
    );

    if (savedProfile) {
      setProfile({
        ...defaultProfile,
        ...savedProfile,
      });
    } else {
      setProfile(defaultProfile);
    }
  }, [loggedInUser]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Save profile
  const handleSave = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    setIsEditing(false);
  };

  return (
    <main className="section">
      <div className="container">

        {/* Page Header */}
        <div className="mb-10">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-500">
            My Account
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Profile
          </h1>

          <p className="mt-3 text-gray-500">
            Manage your personal information and account.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* Profile Information */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">

            {/* Profile Header */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-6">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-500">
                  <User size={26} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your account details.
                  </p>
                </div>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
                >
                  <Pencil size={16} />
                  Edit
                </button>
              )}

            </div>

            {/* Profile Form */}
            <div className="mt-6 space-y-5">

              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

            </div>

            {/* Save / Cancel */}
            {isEditing && (
              <div className="mt-6 flex gap-3 border-t border-gray-200 pt-6">

                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md bg-pink-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-600"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-pink-500 hover:text-pink-500"
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

          {/* Quick Links */}
          <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">

            <h2 className="font-semibold text-gray-900">
              Quick Links
            </h2>

            <div className="mt-5 space-y-3">

              {/* Orders */}
              <Link
                to="/orders"
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-pink-500 hover:text-pink-500"
              >
                <Package size={20} />

                <div>
                  <p className="text-sm font-semibold">
                    My Orders
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    View your orders
                  </p>
                </div>
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-pink-500 hover:text-pink-500"
              >
                <Heart size={20} />

                <div>
                  <p className="text-sm font-semibold">
                    Wishlist
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    View saved products
                  </p>
                </div>
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:border-pink-500 hover:text-pink-500"
              >
                <ShoppingBag size={20} />

                <div>
                  <p className="text-sm font-semibold">
                    Shopping Cart
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    View your cart
                  </p>
                </div>
              </Link>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

export default Profile;