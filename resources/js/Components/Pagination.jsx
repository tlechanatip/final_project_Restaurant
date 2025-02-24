import React from "react";

const Pagination = ({ links, onPageChange }) => {

    return (
        <nav className="flex items-center gap-2">
            {links.map((link, index) => (
                <button
                key={index}
                onClick={() => link.url && onPageChange(link.url)}
                disabled={!link.url}
                className={`px-4 py-2 rounded-lg ${
                    link.active ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                aria-label={`Go to page ${index + 1}`}
                dangerouslySetInnerHTML={{ __html: link.label }}
            >
            </button>
            ))}
        </nav>
    );
};

export default Pagination;
