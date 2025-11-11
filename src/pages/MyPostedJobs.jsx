// src/pages/MyPostedJobs.jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyPostedJobs = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // 1. Fetch User's Posted Jobs
    const { data: myJobs = [], isLoading } = useQuery({
        queryKey: ['myPostedJobs', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            // Calls the protected server route /jobs/myadded/:email
            const res = await axiosSecure.get(`/jobs/myadded/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // 2. Mutation for Deleting a Job
    const deleteJobMutation = useMutation({
        mutationFn: (id) => {
            // Calls the protected server route DELETE /jobs/:id
            return axiosSecure.delete(`/jobs/${id}`);
        },
        onSuccess: () => {
            toast.success('Job deleted successfully!');
            // Invalidate to refetch the job list
            queryClient.invalidateQueries({ queryKey: ['myPostedJobs', user?.email] });
        },
        onError: (error) => {
            console.error('Job Deletion Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to delete job.';
            toast.error(message);
        },
    });
    
    const handleDeleteJob = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteJobMutation.mutate(id);
            }
        });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"><ImSpinner9 className="text-6xl text-blue-500 animate-spin" /></div>;
    }

    return (
        <div className="py-10">
            <h2 className="text-4xl font-bold text-center mb-8">My Posted Jobs ({myJobs.length})</h2>

            {myJobs.length === 0 ? (
                <p className="text-center text-lg text-gray-500 min-h-[40vh]">You have not posted any jobs yet.</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-xl rounded-lg">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th>#</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Summary</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myJobs.map((job, index) => (
                                <tr key={job._id} className="hover:bg-gray-50">
                                    <th>{index + 1}</th>
                                    <td>{job.title}</td>
                                    <td><span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{job.category}</span></td>
                                    <td>{job.summary.substring(0, 50)}...</td>
                                    <td className="space-x-2">
                                        <Link to={`/updateJob/${job._id}`}>
                                            <button className="btn btn-sm bg-yellow-500 text-white hover:bg-yellow-600 tooltip" data-tip="Edit">
                                                <FaEdit />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteJob(job._id)}
                                            className="btn btn-sm bg-red-500 text-white hover:bg-red-600 tooltip"
                                            data-tip="Delete"
                                        >
                                            <FaTrash />
                                        </button>
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

export default MyPostedJobs;