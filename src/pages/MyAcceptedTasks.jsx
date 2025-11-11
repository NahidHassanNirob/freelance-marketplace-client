// src/pages/MyAcceptedTasks.jsx
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ImSpinner9 } from 'react-icons/im';

const MyAcceptedTasks = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch accepted bids/tasks for the current user (the freelancer/worker)
    const { 
        data: acceptedTasks = [], // Default to empty array to prevent map errors
        isLoading, 
        isError,
        refetch
    } = useQuery({
        queryKey: ['acceptedTasks', user?.email],
        enabled: !loading && !!user?.email, // Only run if auth is ready and user email exists
        queryFn: async () => {
            if (!user?.email) return []; // Safety check
            
            // Assuming the API endpoint retrieves bids accepted by the buyer
            // where the current user (freelancer) is the bid_user_email.
            // API route: /bids/accepted?email=freelancer@example.com
            const res = await axiosSecure.get(`/bids/accepted?email=${user.email}`);
            return res.data;
        },
    });

    // Handle loading states
    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
                <ImSpinner9 className="text-6xl text-blue-500 animate-spin" />
            </div>
        );
    }
    
    // Handle error state
    if (isError) {
        return <div className="text-center py-20 text-red-600">Failed to fetch accepted tasks. Please try again.</div>;
    }

    // --- Core Logic for rendering ---

    // The .map is safe now because acceptedTasks defaults to []
    // If the server returns an object instead of an array, the Array.isArray check (jobsToDisplay) 
    // is the ultimate safeguard (though we rely on the default here).
    const tasksToDisplay = Array.isArray(acceptedTasks) ? acceptedTasks : [];


    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">My Accepted Tasks</h1>

            {tasksToDisplay.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl shadow-lg">
                    <p className="text-2xl text-gray-500 font-semibold mb-4">No accepted tasks found.</p>
                    <p className="text-md text-gray-400">Time to apply for some jobs!</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-xl">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider rounded-tl-xl">Job Title</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Buyer Email</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Deadline</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Bid Amount</th>
                                <th className="py-3 px-6 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                                <th className="py-3 px-6 text-center text-sm font-semibold uppercase tracking-wider rounded-tr-xl">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* ERROR FIX: The .map is now safe because tasksToDisplay is guaranteed to be an array */}
                            {tasksToDisplay.map((task, index) => (
                                <tr key={task._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition duration-150`}>
                                    <td className="py-4 px-6 font-medium text-gray-900 truncate max-w-xs">{task.job_title || task.title}</td>
                                    <td className="py-4 px-6 text-gray-700">{task.buyer_email}</td>
                                    <td className="py-4 px-6 text-gray-700">{new Date(task.deadline).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 font-bold text-green-600">${task.bid_amount}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            task.bid_status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                            task.bid_status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                            task.bid_status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {task.bid_status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {/* Action Button: Conditional based on status */}
                                        {task.bid_status === 'In Progress' && (
                                            <button 
                                                className="bg-purple-600 text-white px-4 py-2 text-sm rounded-lg hover:bg-purple-700 transition duration-300 shadow-md"
                                                onClick={() => alert('Mark as Complete function needs to be implemented')}
                                            >
                                                Mark Complete
                                            </button>
                                        )}
                                        {(task.bid_status === 'Completed' || task.bid_status === 'Rejected') && (
                                            <span className="text-gray-500 text-sm">No Action</span>
                                        )}
                                        {task.bid_status === 'Pending' && (
                                             <span className="text-blue-500 text-sm">Waiting for Start</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyAcceptedTasks;