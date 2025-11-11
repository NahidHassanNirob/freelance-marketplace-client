// client/src/components/Footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 mt-10">
            <aside>
                <p className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                    FreelanceHub
                </p> 
                <p className="text-sm">
                    ফ্রিল্যান্স জব পোস্টিং ও বিডিং প্ল্যাটফর্ম।
                    <br/>সর্বস্বত্ব সংরক্ষিত © {new Date().getFullYear()}
                </p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <a className="link link-hover">যোগাযোগ</a>
                    <a className="link link-hover">গোপনীয়তা নীতি</a>
                    <a className="link link-hover">শর্তাবলী</a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;