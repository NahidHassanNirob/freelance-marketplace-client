import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { mockJobs } from "../data/mockJobs.jsx";
import { useJobStore } from "../store/index.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

function MyAcceptedTasks() {
  const navigate = useNavigate();
  const { acceptedTasks, removeAcceptedTask } = useJobStore();

  const acceptedJobs = mockJobs.filter((job) =>
    acceptedTasks.some((task) => task.jobId === job._id)
  );

  const handleDone = (jobId) => {
    removeAcceptedTask(jobId);
    toast.success("Task marked as done!");
  };

  const handleCancel = (jobId) => {
    removeAcceptedTask(jobId);
    toast.success("Task cancelled");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Header */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <h1 className="font-heading text-4xl font-bold text-gray-900">
                My Accepted Tasks
              </h1>
              <p className="max-w-2xl text-lg text-gray-600">
                {acceptedJobs.length === 0
                  ? "You haven't accepted any jobs yet. Browse available jobs to get started."
                  : `You have ${acceptedJobs.length} active task${acceptedJobs.length !== 1 ? "s" : ""}`}
              </p>
            </motion.div>

            {acceptedJobs.length === 0 ? (
              <motion.div
                className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12 text-center"
                variants={itemVariants}
              >
                <p className="mb-4 text-lg text-gray-600">No accepted tasks yet</p>
                <button
                  onClick={() => navigate("/allJobs")}
                  className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Browse Jobs
                </button>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
              >
                {acceptedJobs.map((job) => (
                  <motion.div
                    key={job._id}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all"
                    variants={itemVariants}
                  >
                    {/* Cover Image */}
                    <div className="overflow-hidden bg-gray-100 h-40">
                      <img
                        src={job.coverImage}
                        alt={job.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-3 p-4">
                      {/* Title */}
                      <h3 className="line-clamp-2 font-heading text-lg font-semibold text-gray-900">
                        {job.title}
                      </h3>

                      {/* Category */}
                      <div className="inline-flex w-fit">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                          {job.category}
                        </span>
                      </div>

                      {/* Posted By */}
                      <p className="text-sm text-gray-600">
                        Posted by <span className="font-semibold">{job.postedBy}</span>
                      </p>

                      {/* Summary */}
                      <p className="line-clamp-2 text-sm text-gray-600 flex-1">
                        {job.summary}
                      </p>

                      {/* Status Badge */}
                      <div className="rounded-md bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
                        ✓ Active Task
                      </div>

                      {/* Actions */}
                      <div className="border-t border-gray-100 pt-3 space-y-2">
                        <button
                          onClick={() => navigate(`/allJobs/${job._id}`)}
                          className="w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          View Details
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDone(job._id)}
                            className="flex-1 flex items-center justify-center gap-1 rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                          >
                            <CheckCircle2 size={14} />
                            Done
                          </button>
                          <button
                            onClick={() => handleCancel(job._id)}
                            className="flex-1 flex items-center justify-center gap-1 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                          >
                            <XCircle size={14} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyAcceptedTasks;
