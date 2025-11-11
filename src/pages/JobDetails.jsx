// src/pages/JobDetails.jsx
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { FaUserCircle, FaEnvelope, FaTag } from 'react-icons/fa';

const JobDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // TanStack Query to fetch single job details
    const { data: job = {}, isLoading } = useQuery({
        queryKey: ['jobDetails', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/jobs/${id}`);
            return res.data;
        },
        enabled: !!id, // Only run query if id exists
    });

    // TanStack Mutation for accepting the job
    const acceptJobMutation = useMutation({
        mutationFn: (acceptedTask) => {
            return axiosSecure.post('/accepted-tasks', acceptedTask);
        },
        onSuccess: () => {
            toast.success('Job accepted successfully!');
            // After accepting, you might want to invalidate the 'myAcceptedTasks' query
            // queryClient.invalidateQueries({ queryKey: ['myAcceptedTasks', user?.email] }); 
            navigate('/my-accepted-tasks'); 
        },
        onError: (error) => {
            console.error('Accept Job Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to accept job.';
            toast.error(message);
        },
    });

    const handleAcceptJob = (e) => {
        e.preventDefault();
        
        // --- CHALLENGE 3: LOGIC CHECK ---
        if (user.email === job.userEmail) {
            toast.error('You cannot accept your own posted job.');
            return;
        }
        
        const acceptedTask = {
            jobId: job._id,
            title: job.title,
            category: job.category,
            jobPosterEmail: job.userEmail,
            acceptedByEmail: user.email,
            acceptedByName: user.displayName,
            acceptedDateTime: new Date().toISOString(),
            status: 'Pending', // Initial status when accepted
        };

        acceptJobMutation.mutate(acceptedTask);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"><ImSpinner9 className="text-6xl text-blue-500 animate-spin" /></div>;
    }
    
    if (!job._id) {
        return <div className="text-center text-red-500 py-10">Job not found.</div>;
    }

    const isPoster = user?.email === job.userEmail;

    return (
        <div className="py-10">
            <div className="max-w-6xl mx-auto p-8 border rounded-xl shadow-2xl bg-white grid lg:grid-cols-3 gap-10">
                
                {/* Job Info (Left/Main Section) */}
                <div className="lg:col-span-2 space-y-6">
                    <img src={job.coverImage} alt={job.title} className="w-full h-80 object-cover rounded-xl shadow-md" />
                    <h1 className="text-4xl font-extrabold text-gray-800">{job.title}</h1>
                    <div className="flex items-center space-x-4 text-lg font-medium text-gray-600">
                        <span className="flex items-center"><FaTag className="mr-2 text-blue-600" /> {job.category}</span>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-700">{job.summary}</p>
                    
                    <hr className="my-6" />

                    <h3 className="text-2xl font-bold mb-4">Posted By</h3>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <FaUserCircle className="text-4xl text-blue-600" />
                        <div>
                            <p className="font-bold">{job.postedBy}</p>
                            <p className="text-sm text-gray-500 flex items-center"><FaEnvelope className="mr-1" /> {job.userEmail}</p>
                        </div>
                    </div>
                </div>

                {/* Accept/Bid Form (Right Section) */}
                <div className="lg:col-span-1 p-6 border rounded-xl shadow-lg bg-blue-50 h-fit">
                    <h3 className="text-2xl font-bold text-blue-800 mb-6">Accept This Job</h3>

                    {isPoster ? (
                        <p className="text-red-500 font-semibold text-center py-4">
                            You posted this job. You cannot accept it.
                        </p>
                    ) : (
                        <form onSubmit={handleAcceptJob} className="space-y-4">
                            <p className="text-sm text-gray-600">
                                Click the button below to confirm you are taking on this task.
                            </p>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                                    disabled={acceptJobMutation.isLoading || isPoster}
                                >
                                    {acceptJobMutation.isLoading ? 'Accepting...' : 'Confirm Acceptance'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JobDetails;