import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Banner({ isLoggedIn = false }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 sm:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-200 blur-3xl opacity-30" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-200 blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid gap-12 lg:grid-cols-2 lg:items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                ✨ Welcome to the Freelance Marketplace
              </span>
            </motion.div>

            <motion.h1
              className="font-heading text-4xl font-bold leading-tight text-gray-900 sm:text-5xl md:text-6xl"
              variants={itemVariants}
            >
              Connect Talent with Opportunities
            </motion.h1>

            <motion.p
              className="text-lg text-gray-600 md:text-xl max-w-2xl"
              variants={itemVariants}
            >
              Find your next freelance opportunity or hire the perfect professional for your project. Build your career or grow your business with FreelanceHub.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col gap-4 sm:flex-row sm:items-center" variants={itemVariants}>
              <Link
                to={isLoggedIn ? "/addJob" : "/register"}
                className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-center font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
              >
                {isLoggedIn ? "Create a Job" : "Get Started"}
              </Link>
              <Link
                to="/allJobs"
                className="inline-block rounded-lg border-2 border-gray-300 px-8 py-4 text-center font-semibold text-gray-900 transition-all hover:border-blue-600 hover:bg-blue-50 active:scale-95"
              >
                Browse All Jobs
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div className="flex gap-8 pt-4" variants={itemVariants}>
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Active Jobs</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1k+</p>
                <p className="text-sm text-gray-600">Freelancers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$2M+</p>
                <p className="text-sm text-gray-600">Earned</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div variants={itemVariants} className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 opacity-25 blur-2xl" />
              <div className="relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm p-8 shadow-xl">
                <div className="space-y-4">
                  <div className="h-3 w-12 rounded-full bg-blue-300" />
                  <div className="h-3 w-full rounded-full bg-gray-200" />
                  <div className="h-3 w-5/6 rounded-full bg-gray-200" />
                  <div className="pt-4 border-t border-gray-200">
                    <div className="h-3 w-20 rounded-full bg-indigo-300" />
                    <div className="mt-3 space-y-2">
                      <div className="h-2 w-full rounded-full bg-gray-200" />
                      <div className="h-2 w-4/5 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Banner;
