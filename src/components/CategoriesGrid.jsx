import { motion } from "framer-motion";
import { jobCategories } from "../data/mockJobs.jsx";

function CategoriesGrid() {
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
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="font-heading text-3xl font-bold text-gray-900 sm:text-4xl">
              Popular Job Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore thousands of freelance opportunities across various categories
            </p>
          </div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {jobCategories.map((category) => (
              <motion.div
                key={category.name}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-blue-300 cursor-pointer"
                variants={itemVariants}
              >
                <div className="space-y-4">
                  <div className="text-5xl">{category.icon}</div>
                  <div>
                    <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors group-hover:text-blue-700">
                    Explore →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CategoriesGrid;
