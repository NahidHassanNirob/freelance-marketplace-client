import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/index.jsx";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { jobCategories } from "../data/mockJobs.jsx";
import { motion } from "framer-motion";

function AddJob() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: jobCategories[0].name,
    summary: "",
    coverImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.summary || !formData.coverImage) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      toast.success("Job posted successfully!");
      navigate("/allJobs");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to post job");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12 sm:py-16">
        <motion.div
          className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="rounded-lg bg-white p-8 shadow-md">
            {/* Header */}
            <div className="space-y-2 mb-8">
              <h1 className="font-heading text-3xl font-bold text-gray-900">Post a New Job</h1>
              <p className="text-gray-600">
                Share your project with talented freelancers on FreelanceHub
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Build React Landing Page"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Posted By
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                >
                  {jobCategories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Summary *
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Describe your project, requirements, and deliverables..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 transition-colors hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-500"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Posting..." : "Post Job"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/allJobs")}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default AddJob;
