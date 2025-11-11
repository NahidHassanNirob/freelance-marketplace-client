import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import Banner from "../components/Banner.jsx";
import CategoriesGrid from "../components/CategoriesGrid.jsx";
import JobCard from "../components/JobCard.jsx";
import { mockJobs } from "../data/mockJobs.jsx";

function Home() {
  const latestJobs = mockJobs.slice(0, 6);

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

      <main className="flex-1">
        {/* Banner Section */}
        <Banner isLoggedIn={false} />

        {/* Latest Jobs Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="space-y-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Header */}
              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
                    Latest Job Opportunities
                  </h2>
                  <p className="text-gray-600">
                    Discover the newest freelance jobs posted on our platform
                  </p>
                </div>
              </div>

              {/* Jobs Grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
              >
                {latestJobs.map((job) => (
                  <motion.div key={job._id} variants={itemVariants}>
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </motion.div>

              {/* View All Button */}
              <motion.div className="flex justify-center" variants={itemVariants}>
                <a
                  href="/allJobs"
                  className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                >
                  View All Jobs →
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Categories Section */}
        <CategoriesGrid />

        {/* About Platform Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid gap-12 lg:grid-cols-2 lg:items-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              {/* Content */}
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.h2
                  className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl"
                  variants={itemVariants}
                >
                  About FreelanceHub
                </motion.h2>

                <motion.p
                  className="text-lg text-gray-600"
                  variants={itemVariants}
                >
                  FreelanceHub is your go-to platform for finding talented freelancers or discovering exciting job opportunities. We connect businesses with skilled professionals across various industries and skill sets.
                </motion.p>

                <motion.div className="space-y-4" variants={containerVariants}>
                  {[
                    {
                      title: "Secure & Trusted",
                      description: "Work with verified professionals and clients with confidence",
                    },
                    {
                      title: "Flexible Engagement",
                      description: "Choose from hourly, project-based, or retainer arrangements",
                    },
                    {
                      title: "Fair Pricing",
                      description: "Competitive rates with transparent payment systems",
                    },
                    {
                      title: "24/7 Support",
                      description: "Get help whenever you need it from our dedicated team",
                    },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex gap-4"
                      variants={itemVariants}
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-blue-600 font-bold">✓</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Visual */}
              <motion.div variants={itemVariants} className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-indigo-600 opacity-20 blur-2xl" />
                  <div className="relative rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-12 shadow-xl">
                    <div className="space-y-6">
                      <div className="h-4 w-16 rounded-full bg-blue-300 opacity-50" />
                      <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="h-24 rounded-lg bg-white border border-gray-200 opacity-50"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2
                className="font-heading text-3xl font-bold text-white sm:text-4xl"
                variants={itemVariants}
              >
                Ready to Get Started?
              </motion.h2>

              <motion.p
                className="text-lg text-blue-100 max-w-2xl mx-auto"
                variants={itemVariants}
              >
                Join thousands of freelancers and businesses building successful projects together
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={itemVariants}
              >
                <a
                  href="/register"
                  className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:shadow-lg active:scale-95"
                >
                  Create Account
                </a>
                <a
                  href="/allJobs"
                  className="inline-block rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  Explore Jobs
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
