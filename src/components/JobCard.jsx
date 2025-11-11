// src/components/JobCard.jsx
import { Link } from 'react-router';
import { FaTag, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

const JobCard = ({ job }) => {
    const { _id, title, category, summary, coverImage, postedDateTime } = job;
    
    // Format the date for better readability
    const formattedDate = new Date(postedDateTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border">
            <img src={coverImage} alt={title} className="w-full h-48 object-cover" />
            <div className="p-5 space-y-3">
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center space-x-1">
                        <FaTag className="text-blue-500" />
                        <span className="font-semibold text-blue-800">{category}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                        <FaCalendarAlt className="text-gray-500" />
                        <span>Posted: {formattedDate}</span>
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 h-14 overflow-hidden">
                    {title}
                </h3>
                
                <p className="text-gray-600 text-sm h-16 overflow-hidden">
                    {summary.substring(0, 100)}...
                </p>

                <div className="pt-2">
                    <Link 
                        to={`/job/${_id}`} 
                        className="flex items-center justify-center space-x-2 w-full py-2 font-semibold rounded-md bg-green-500 text-white hover:bg-green-600 transition duration-200"
                    >
                        <FaInfoCircle />
                        <span>View Details</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;