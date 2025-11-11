// src/pages/AddJob.jsx
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const categories = ['Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing'];

const AddJob = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleAddJob = async (e) => {
        e.preventDefault();
        const form = e.target;
        const jobData = {
            title: form.title.value,
            postedBy: user?.displayName, // Filled from logged-in user
            category: form.category.value,
            summary: form.summary.value,
            coverImage: form.coverImage.value,
            userEmail: user?.email, // Filled from logged-in user
        };

        try {
            // POST request using Axios Secure (sends JWT token automatically)
            const res = await axiosSecure.post('/jobs', jobData);

            if (res.data.success) {
                toast.success('Job added successfully!');
                form.reset(); // Clear form after success
            }
        } catch (error) {
            console.error('Error adding job:', error.response?.data || error.message);
            toast.error('Failed to add job. Please try again.');
        }
    };

    return (
        <div className="py-10">
            <h2 className="text-3xl font-bold text-center mb-6">Add a New Job/Task</h2>
            
            <form onSubmit={handleAddJob} className="max-w-3xl mx-auto p-8 border rounded-xl shadow-lg bg-white">
                
                {/* Row 1: Title and Category */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Job Title</label>
                        <input type="text" name="title" placeholder="e.g., Senior React Developer" required className="w-full px-4 py-3 rounded-md border" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Category (Dropdown)</label>
                        <select name="category" required className="w-full px-4 py-3 rounded-md border">
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>

                {/* Row 2: Posted By and User Email (Readonly) */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-2">Posted By (Readonly)</label>
                        <input type="text" name="postedBy" defaultValue={user?.displayName || ''} readOnly className="w-full px-4 py-3 rounded-md border bg-gray-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">User Email (Readonly)</label>
                        <input type="email" name="userEmail" defaultValue={user?.email || ''} readOnly className="w-full px-4 py-3 rounded-md border bg-gray-100" />
                    </div>
                </div>

                {/* Row 3: Cover Image URL */}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Cover Image URL</label>
                    <input type="url" name="coverImage" placeholder="Image URL (imgbb)" required className="w-full px-4 py-3 rounded-md border" />
                </div>

                {/* Row 4: Summary/Description (Text Area) */}
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2">Summary/Short Description</label>
                    <textarea name="summary" rows="4" placeholder="Briefly describe the job requirements and tasks..." required className="w-full px-4 py-3 rounded-md border"></textarea>
                </div>
                
                {/* Submit Button */}
                <button type="submit" className="w-full py-3 font-semibold rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-200">
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default AddJob;