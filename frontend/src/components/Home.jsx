
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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-lg mt-10 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload your image</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center">
          <p className="text-gray-500 mb-3">
            {selectedFile ? selectedFile.name : "Drag & Drop or Click to Upload"}
          </p>
          <input type="file" className="hidden" id="fileInput" onChange={handleFileChange} />
          <label
            htmlFor="fileInput"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Choose Image
          </label>
        </div>

        <button
          onClick={handleGenerateCaption}
          disabled={!isLoggedIn || !selectedFile || isLoading}
          className={`w-full mt-6 py-2 rounded-xl transition ${
            !isLoggedIn
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLoading
            ? "Generating..."
            : !isLoggedIn
            ? "Login to Generate Caption"
            : "Generate AI Caption"}
        </button>

        {caption && (
          <div className="mt-4 text-center text-gray-700 font-medium">{caption}</div>
        )}
      </div>

      {/* ✅ Recent Posts Section */}
      <div className="w-full max-w-5xl mt-12">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {isLoggedIn ? "Your Recent Posts" : "Explore Random Posts"}
        </h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition"
            >
              <img
                src={post.image}
                alt="post"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700 text-sm">{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
