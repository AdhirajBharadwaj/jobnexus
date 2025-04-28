import React from 'react';

const Footer = () => {
  return (
    <footer
      className="w-full fixed bottom-0 left-0 px-0  md:px-0 border-t border-gray-100 backdrop-blur-xl bg-white/70 shadow-lg"
      style={{
        background: 'rgba(255,255,255,0.82)',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 -6px 32px 0 rgba(248,48,2,0.07)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 py-4 md:py-5 px-6 md:px-10">
        {/* Branding & Logo */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6A38C2] to-[#F83002] flex items-center justify-center shadow-md mr-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" fill="#fff" /></svg>
          </span>
          <div>
            <span className="block font-extrabold text-lg md:text-xl text-gray-900 tracking-tight leading-none">Job Nexus</span>
            <span className="block text-xs md:text-sm text-gray-500 font-medium">Connecting Talent & Opportunity</span>
          </div>
        </div>
        {/* Social Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 mt-3 md:mt-0">
          <a href="https://facebook.com" className="group" aria-label="Facebook">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#4267B2] to-[#233554] p-2 shadow hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white group-hover:text-[#ffbe30] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" /></svg>
            </span>
          </a>
          <a href="https://twitter.com" className="group" aria-label="Twitter">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0a192f] p-2 shadow hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white group-hover:text-[#ffbe30] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" /></svg>
            </span>
          </a>
          <a href="https://linkedin.com" className="group" aria-label="LinkedIn">
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#0077b5] to-[#0a192f] p-2 shadow hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-white group-hover:text-[#ffbe30] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" /></svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;