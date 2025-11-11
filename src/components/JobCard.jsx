import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Link to={`/allJobs/${job._id}`}>
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

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <span className="text-xs text-gray-500">
              {job.postedDate}
            </span>
            <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default JobCard;
