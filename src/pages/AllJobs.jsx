// src/pages/AllJobs.jsx
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import JobCard from '../components/JobCard';
import { ImSpinner9 } from 'react-icons/im';
import { FaFilter, FaSortAlphaDown } from 'react-icons/fa';

const categories = ['Web Development', 'Digital Marketing', 'Graphics Designing', 'Content Writing'];

const AllJobs = () => {
    const axiosSecure = useAxiosSecure();
    const [filterCategory, setFilterCategory] = useState('');
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc' for ascending, 'desc' for descending

    // TanStack Query to fetch all jobs with filtering and sorting
    const { data: jobs = [], isLoading, isError } = useQuery({
        queryKey: ['allJobs', filterCategory, sortOrder],
        queryFn: async () => {
            // Server-side sorting is assumed by default in your jobRoutes.js (postedDateTime: -1)
            // But we can add client-side handling for filtering/sorting if needed, or pass params to server.
            
            let url = `/jobs`;
            
            // NOTE: For more robust filtering/sorting, you should implement these as 
            // query parameters in your server-side /jobs route.
            const res = await axiosSecure.get(url);
            let fetchedJobs = res.data;

            // Client-side Filtering (If server doesn't support query params)
            if (filterCategory) {
                fetchedJobs = fetchedJobs.filter(job => job.category === filterCategory);
            }

            // Client-side Sorting (Based on postedDateTime logic)
            fetchedJobs.sort((a, b) => {
                const dateA = new Date(a.postedDateTime);
                const dateB = new Date(b.postedDateTime);
                if (sortOrder === 'asc') return dateA - dateB;
                return dateB - dateA; // Default to desc (latest first)
            });

            return fetchedJobs;
        },
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-[calc(100vh-120px)]"><ImSpinner9 className="text-6xl text-blue-500 animate-spin" /></div>;
    }

    if (isError) {
        return <div className="text-center text-red-500 py-10">Error fetching jobs.</div>;
    }

    return (
        <div className="py-10">
            <h2 className="text-4xl font-bold text-center mb-8">All Available Jobs</h2>

            {/* Filter and Sort Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 p-4 bg-gray-100 rounded-lg shadow">
                
                {/* Category Filter */}
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <FaFilter className="text-xl text-blue-600" />
                    <select 
                        value={filterCategory} 
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">Filter by Category (All)</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
                
                {/* Sort by Posted Date */}
                <div className="flex items-center space-x-2">
                    <FaSortAlphaDown className="text-xl text-blue-600" />
                    <select 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="desc">Sort: Latest First</option>
                        <option value="asc">Sort: Oldest First</option>
                    </select>
                </div>
            </div>

            {/* Job Cards Display */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.length > 0 ? (
                    jobs.map(job => <JobCard key={job._id} job={job} />)
                ) : (
                    <p className="col-span-3 text-center text-lg text-gray-500">No jobs found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default AllJobs;