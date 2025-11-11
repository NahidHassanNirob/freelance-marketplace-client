// src/pages/UpdateJob.jsx
import { useParams, useNavigate } from 'react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { ImSpinner9 } from 'react-icons/im';
import { toast } from 'react-hot-toast';

const categories = ['Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing'];

const UpdateJob = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // 1. Fetch Existing Job Details
    const { data: job = {}, isLoading } = useQuery({
        queryKey: ['jobToUpdate', id],
        queryFn: async () => {
            // Uses simple GET route, verifyToken check is optional here but good for consistency
            const res = await axiosSecure.get(`/jobs/${id}`); 
            return res.data;
        },
        enabled: !!id,
    });

    // 2. Mutation for Updating the Job
    const updateJobMutation = useMutation({
        mutationFn: (updatedJob) => {
            // Calls the protected server route PATCH /jobs/:id
            return axiosSecure.patch(`/jobs/${id}`, updatedJob);
        },
        onSuccess: () => {
            toast.success('Job updated successfully!');
            navigate('/myPostedJobs');
        },
        onError: (error) => {
            console.error('Update Job Error:', error.response?.data || error.message);
            const message = error.response?.data?.message || 'Failed to update job.';
            toast.error(message);
        },
    });

    const handleUpdateJob = (e) => {
        e.preventDefault();
        const form = e.target;
        
        // Ensure only the authorized user can update (Client-side Check)
        if (user?.email !== job.userEmail) {
             toast.error('Forbidden action. You are not the job poster.');
             return;
        }

        const updatedJobData = {
            title: form.title.value,
            category: form.category.value,
            summary: form.summary.value,
            coverImage: form.coverImage.value,
            // userEmail is NOT updated as per server logic
        };

        updateJobMutation.mutate(updatedJobData);
    };

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"><ImSpinner9 className="text-6xl text-blue-500 animate-spin" /></div>;
    }

    if (!job._id) {
        return <div className="text-center text-red-500 py-10">Job not found or you don't have access.</div>;
    }

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Update Job: {job.title}</h2>
            
            <form onSubmit={handleUpdateJob} className="max-w-3xl mx-auto p-8 border rounded-xl shadow-lg bg-white">
                
                {/* Row 1: Title and Category */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Job Title</label>
                        <input type="text" name="title" defaultValue={job.title} required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Category (Dropdown)</label>
                        <select name="category" defaultValue={job.category} required className="w-full px-4 py-3 rounded-md border">
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {/* Row 2: Posted By and User Email (Readonly) */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Posted By (Readonly)</label>
                        <input type="text" defaultValue={job.postedBy} readOnly className="w-full px-4 py-3 rounded-md border bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">User Email (Readonly)</label>
                        <input type="email" defaultValue={job.userEmail} readOnly className="w-full px-4 py-3 rounded-md border bg-gray-100" />
                    </div>
                </div>

                {/* Row 3: Cover Image URL */}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Cover Image URL</label>
                    <input type="url" name="coverImage" defaultValue={job.coverImage} required className="w-full px-4 py-3 rounded-md border" />
                </div>

                {/* Row 4: Summary/Description (Text Area) */}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Summary/Short Description</label>
                    <textarea name="summary" rows="4" defaultValue={job.summary} required className="w-full px-4 py-3 rounded-md border"></textarea>
                </div>
                
                {/* Submit Button */}
                <button 
                    type="submit" 
                    className="w-full py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-200 disabled:bg-gray-400"
                    disabled={updateJobMutation.isLoading}
                >
                    {updateJobMutation.isLoading ? 'Updating...' : 'Update Job'}
                </button>
            </form>
        </div>
    );
};

export default UpdateJob;