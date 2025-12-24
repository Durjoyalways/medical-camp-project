const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="text-center mx-auto md:w-8/12 my-10 px-4">
            {/* subHeading চেক করা হচ্ছে যেন এটি না থাকলেও এরর না দেয় */}
            {subHeading && (
                <p className="text-primary font-medium text-lg mb-2 italic">
                    --- {subHeading} ---
                </p>
            )}
            
            {/* heading চেক করা হচ্ছে */}
            {heading && (
                <h3 className="text-3xl md:text-5xl font-bold uppercase border-y-4 border-gray-200 py-4 inline-block px-10">
                    {heading}
                </h3>
            )}
        </div>
    );
};

export default SectionTitle;