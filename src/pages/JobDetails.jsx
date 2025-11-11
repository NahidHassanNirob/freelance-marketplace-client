import { useParams, useNavigate } from "react-router-dom";
import { mockJobs } from "../data/mockJobs.jsx";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useAuth } from "../hooks/index.jsx";
import { useJobStore } from "../store/index.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acceptedTasks, addAcceptedTask } = useJobStore();

  const job = mockJobs.find((j) => j._id === id);

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Job Not Found</h1>
            <button
              onClick={() => navigate("/allJobs")}
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Back to Jobs
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isAccepted = acceptedTasks.some((task) => task.jobId === job._id);
  const isOwn = user?.email === job.userEmail;

  const handleAccept = () => {
    if (!user) {
      toast.error("Please log in to accept this job");
      navigate("/login");
      return;
    }

    if (isOwn) {
      toast.error("You cannot accept your own job");
      return;
    }

    if (isAccepted) {
      toast.error("You have already accepted this job");
      return;
    }

    addAcceptedTask(job._id);
    toast.success("Job accepted successfully!");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-12 sm:py-16">
        <motion.div
          className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Back Button */}
          <button
            onClick={() => navigate("/allJobs")}
            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Jobs
          </button>

          <div className="rounded-lg bg-white p-8 shadow-md">
            {/* Cover Image */}
            <div className="mb-8 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={job.coverImage}
                alt={job.title}
                className="h-96 w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h1 className="font-heading text-4xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center gap-4">
                      <span className="inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                        {job.category}
                      </span>
                      <span className="text-sm text-gray-600">{job.postedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Posted By */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 mb-2">Posted by</p>
                  <p className="font-heading text-xl font-semibold text-gray-900">
                    {job.postedBy}
                  </p>
                  <p className="text-sm text-gray-600">{job.userEmail}</p>
                </div>
              </div>

              {/* Status */}
              {isAccepted && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-700">✓ You have accepted this job</p>
                </div>
              )}

              {isOwn && (
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-sm font-semibold text-amber-700">This is your job posting</p>
                </div>
              )}

              {/* Summary */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl font-bold text-gray-900">Job Description</h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.summary}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600 mb-1">Category</p>
                  <p className="font-semibold text-gray-900">{job.category}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600 mb-1">Posted</p>
                  <p className="font-semibold text-gray-900">{job.postedDate}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-600 mb-1">Posted At</p>
                  <p className="font-semibold text-gray-900">{job.postedTime}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-gray-200 pt-6 flex gap-4">
                {!isOwn && !isAccepted && (
                  <button
                    onClick={handleAccept}
                    className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                  >
                    Accept This Job
                  </button>
                )}

                {isOwn && (
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => navigate(`/updateJob/${job._id}`)}
                      className="flex-1 rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
                    >
                      Edit Job
                    </button>
                    <button
                      onClick={() => {
                        toast.success("Job deleted successfully");
                        navigate("/allJobs");
                      }}
                      className="flex-1 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Delete Job
                    </button>
                  </div>
                )}

                <button
                  onClick={() => navigate("/allJobs")}
                  className="flex-1 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
                >
                  Browse More Jobs
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default JobDetails;
