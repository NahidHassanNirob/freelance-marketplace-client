import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import JobCard from "../components/JobCard.jsx";
import { mockJobs } from "../data/mockJobs.jsx";
import { useAuth } from "../hooks/index.jsx";
import { useJobStore } from "../store/index.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function AllJobs() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { acceptedTasks, addAcceptedTask } = useJobStore();
  const [sortBy, setSortBy] = useState("date-newest");
  const [isLoading, setIsLoading] = useState(false);

  const sortedJobs = useMemo(() => {
    const jobsCopy = [...mockJobs];
    
    if (sortBy === "date-newest") {
      jobsCopy.sort((a, b) => {
        const dateA = new Date(a.postedDate || "").getTime();
        const dateB = new Date(b.postedDate || "").getTime();
        return dateB - dateA;
      });
    } else {
      jobsCopy.sort((a, b) => {
        const dateA = new Date(a.postedDate || "").getTime();
        const dateB = new Date(b.postedDate || "").getTime();
        return dateA - dateB;
      });
    }
    
    return jobsCopy;
  }, [sortBy]);

  const handleAccept = (jobId, posterEmail) => {
    if (user?.email === posterEmail) {
      toast.error("You cannot accept your own job");
      return;
    }

    if (acceptedTasks.some((task) => task.jobId === jobId)) {
      toast.error("You have already accepted this job");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      addAcceptedTask(jobId);
      toast.success("Job accepted successfully!");
      setIsLoading(false);
    }, 500);
  };

  const handleViewDetails = (jobId) => {
    navigate(`/allJobs/${jobId}`);
  };

  const handleEdit = (jobId) => {
    navigate(`/updateJob/${jobId}`);
  };

  const handleDelete = (jobId) => {
    toast.success("Job deleted successfully");
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
                All Available Jobs
              </h1>
              <p className="max-w-2xl text-lg text-gray-600">
                Browse and explore all freelance opportunities on our platform. Click on any job to view full details and accept if interested.
              </p>
            </motion.div>

            {/* Sort Options */}
            <motion.div className="flex items-center gap-4" variants={itemVariants}>
              <label className="text-sm font-semibold text-gray-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-blue-500 focus:border-blue-500 focus:outline-none"
              >
                <option value="date-newest">Latest First</option>
                <option value="date-oldest">Oldest First</option>
              </select>
            </motion.div>

            {/* Jobs Grid */}
            {isLoading ? (
              <div className="flex min-h-[400px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
              >
                {sortedJobs.map((job) => {
                  const isAccepted = acceptedTasks.some((task) => task.jobId === job._id);
                  const isOwn = user?.email === job.userEmail;

                  return (
                    <motion.div key={job._id} variants={itemVariants}>
                      <div className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-300 h-full flex flex-col">
                        {/* Cover Image */}
                        <div className="overflow-hidden bg-gray-100 h-48">
                          <img
                            src={job.coverImage}
                            alt={job.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-3 p-4 flex-1">
                          {/* Category Badge */}
                          <div className="inline-flex w-fit">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                              {job.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="line-clamp-2 font-heading text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h3>

                          {/* Posted By */}
                          <p className="text-sm font-medium text-gray-700">
                            by <span className="text-blue-600">{job.postedBy}</span>
                          </p>

                          {/* Summary */}
                          <p className="line-clamp-2 text-sm text-gray-600 flex-1">
                            {job.summary}
                          </p>

                          {/* Status Badge */}
                          {isAccepted && (
                            <div className="rounded-md bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                              ✓ Accepted by you
                            </div>
                          )}

                          {/* Actions */}
                          <div className="border-t border-gray-100 pt-3 space-y-2">
                            <button
                              onClick={() => handleViewDetails(job._id)}
                              className="w-full rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                              View Details
                            </button>

                            {!isOwn && !isAccepted && (
                              <button
                                onClick={() => handleAccept(job._id, job.userEmail)}
                                className="w-full rounded-md bg-green-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-green-700"
                              >
                                Accept Job
                              </button>
                            )}

                            {isOwn && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(job._id)}
                                  className="flex-1 rounded-md bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(job._id)}
                                  className="flex-1 rounded-md bg-red-600 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                            <span className="text-xs text-gray-500">{job.postedDate}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {sortedJobs.length === 0 && (
              <motion.div
                className="rounded-lg border border-gray-200 bg-white p-8 text-center"
                variants={itemVariants}
              >
                <p className="text-gray-600">No jobs available at the moment.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AllJobs;
