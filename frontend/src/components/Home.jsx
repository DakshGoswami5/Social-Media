
import { useState, useEffect } from "react";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  // ✅ Verify user login (cookie token se)
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          setIsLoggedIn(true);
          fetchUserPosts(); // agar logged in hai to apni posts le aa
        } else {
          setIsLoggedIn(false);
          loadDummyPosts(); // random posts dikha
        }
      } catch (error) {
        console.error("Verification failed:", error);
        setIsLoggedIn(false);
        loadDummyPosts();
      }
    };

    verifyUser();
  }, []);

  // ✅ User ke posts fetch karne ka function
  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPosts(data.posts);
      } else {
        loadDummyPosts();
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      loadDummyPosts();
    }
  };

  // ✅ Dummy posts load karne ka function
  const loadDummyPosts = () => {
    const dummy = [1, 2, 3, 4].map((i) => ({
      _id: i,
      image: `https://picsum.photos/400?random=${i}`,
      caption: "A random caption for this image.",
    }));
    setPosts(dummy);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleGenerateCaption = async () => {
    if (!selectedFile) return alert("Please select an image first!");
    setIsLoading(true);

    try {
      // FormData create karo
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Backend pe POST request bhejo
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/post/`, {
        method: "POST",
        credentials: "include",
        body: formData, // JSON nahi, FormData bhejo
      });

      const data = await res.json();

      if (res.ok) {
        // Caption set karo jo AI ne generate kiya
        setCaption(data.post.caption);
        alert("Post created successfully! 🎉");
        
        // Posts list update karo
        fetchUserPosts();
        
        // Form reset karo
        setSelectedFile(null);
      } else {
        alert(data.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    {/* Mobile: Stack layout, Desktop: Side-by-side layout */}
    <div className="container mx-auto px-4 py-6 md:py-10">
      
      {/* Desktop: Two column layout, Mobile: Single column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 md:mt-10">
        
        {/* Upload Section - Mobile: Full width, Desktop: 1/3 width */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">
              Upload Your Image
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all duration-300">
              <svg 
                className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-4 text-center text-sm md:text-base font-medium">
                {selectedFile ? selectedFile.name : "Drag & Drop or Click to Upload"}
              </p>
              <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} />
              <label
                htmlFor="fileInput"
                className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Choose Image
              </label>
            </div>

            <button
              onClick={handleGenerateCaption}
              disabled={!isLoggedIn || !selectedFile || isLoading}
              className={`w-full mt-6 py-3 md:py-4 rounded-xl transition-all duration-300 font-semibold text-base md:text-lg shadow-md ${
                !isLoggedIn || !selectedFile
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5"
              }`}
            >
              {isLoading
                ? "✨ Generating..."
                : !isLoggedIn
                ? "🔒 Login to Generate Caption"
                : "🚀 Generate AI Caption"}
            </button>

            {caption && (
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-gray-800 font-medium text-center text-sm md:text-base leading-relaxed">
                  {caption}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Posts Section - Mobile: Full width, Desktop: 2/3 width */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {isLoggedIn ? "📸 Your Recent Posts" : "🌍 Explore Random Posts"}
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              {isLoggedIn ? "Your creative moments" : "Discover amazing content"}
            </p>
          </div>

          {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt="post"
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4 md:p-5">
                  <p className="text-gray-700 text-sm md:text-base line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16 md:py-20">
              <svg 
                className="w-20 h-20 md:w-24 md:h-24 text-gray-300 mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-lg md:text-xl font-medium">No posts yet</p>
              <p className="text-gray-400 text-sm md:text-base mt-2">Start creating amazing content!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default Home;
