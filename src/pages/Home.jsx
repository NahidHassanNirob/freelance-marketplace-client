// src/pages/Home.jsx
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import JobCard from '../components/JobCard';
import Banner from '../components/Banner';
import { ImSpinner9 } from 'react-icons/im';

const Home = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch latest 6 jobs
    // Defaulting data to an empty array for safety
    const { data: latestJobs = [], isLoading } = useQuery({
        queryKey: ['latestJobs'],
        queryFn: async () => {
            const res = await axiosSecure.get('/jobs/latest');
            return res.data;
        },
    });

    if (isLoading) {
        return <div className="flex justify-center items-center min-h-screen"><ImSpinner9 className="text-6xl text-blue-500 animate-spin" /></div>;
    }
    
    // Handling case where data is fetched but is not an array (e.g., if API returned an object)
    const jobsToDisplay = Array.isArray(latestJobs) ? latestJobs : [];

    return (
        <div>
            {/* 1. Banner Section (with animation requirement) */}
            <Banner />

            {/* 2. Dynamic Section: Latest 6 Jobs */}
            <section className="py-16 container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Latest Jobs Added</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* FIX: Use jobsToDisplay which is guaranteed to be an array */}
                    {jobsToDisplay.length > 0 ? (
                        jobsToDisplay.map(job => (
                            <JobCard key={job._id} job={job} />
                        ))
                    ) : (
                        // Optional: Show a message if no jobs are found
                        <div className="md:col-span-3 text-center p-8 bg-white shadow-lg rounded-xl">
                            <p className="text-lg text-gray-500">No jobs found recently. Be the first to post one!</p>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. Static Section: Top Categories (Example) */}
            <section className="py-16 bg-gray-50 container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">Top Job Categories</h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {/* Placeholder Categories - Use real data/images for unique design */}
                    {['Web Dev', 'Graphics', 'Marketing', 'Writing'].map(cat => (
                        <div key={cat} className="p-6 bg-white shadow-xl rounded-xl text-center border-t-4 border-blue-500 hover:shadow-2xl transition duration-300 transform hover:scale-[1.02]">
                            {/* Dummy icon/placeholder */}
                            <div className="h-16 w-16 mx-auto mb-4 flex items-center justify-center text-4xl text-blue-600">
                                {/* Using Lucide React Icons in a real React App */}
                                {cat === 'Web Dev' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>}
                                {cat === 'Graphics' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><path d="M4 14c0 1.5.8 2.8.8 2.8"/><path d="M12 21c4.7 0 9-3.6 9-9s-3.6-9-9-9c-2.4 0-4.6.8-6.4 2.3"/></svg>}
                                {cat === 'Marketing' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 18 11 13 6 9 10 2 3"/><path d="M18 7h4v4"/></svg>}
                                {cat === 'Writing' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>}
                            </div>
                            <h3 className="text-xl font-bold">{cat}</h3>
                            <p className="text-sm text-gray-600">Explore tasks</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Static Section: About The Platform */}
            <section className="py-16 container mx-auto px-4">
                 <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">About FrelanceMarket</h2>
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-gray-600 leading-relaxed">
                        FrelanceMarket is a trusted digital platform connecting talented freelancers with clients needing tasks done quickly and professionally. We ensure security, transparency, and high-quality results for every job posted, making freelancing accessible and reliable for everyone.
                    </p>
                    <button className="mt-8 px-6 py-3 font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 shadow-lg">
                        Learn More
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;