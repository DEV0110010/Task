import { Button, Spinner } from "flowbite-react";
import Prism from "prismjs";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

// 1. Import Prism core CSS first
import "prismjs/themes/prism-tomorrow.css";

// 2. Import plugins IN CORRECT ORDER:
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min";
import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.min";

// 3. Import language support
import "prismjs/components/prism-javascript.min";
import "prismjs/components/prism-python.min";
import "prismjs/components/prism-java.min";
import "prismjs/components/prism-css.min";
import "prismjs/components/prism-bash.min";
import "prismjs/components/prism-markup.min";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  useEffect(() => {
    if (!post?.content) return;

    // Initialize Prism after slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.Prism = window.Prism || {};
        window.Prism.manual = true;
        Prism.highlightAll();
        
        // Add line numbers to all pre tags
        document.querySelectorAll('pre').forEach((el) => {
          if (!el.classList.contains('line-numbers')) {
            el.classList.add('line-numbers');
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [post]);

  const processContent = (content) => {
    if (!content) return '';
    
    // Process code blocks to ensure proper Prism.js compatibility
    return content
      .replace(/<pre>/g, '<div class="code-toolbar"><pre class="line-numbers">')
      .replace(/<\/pre>/g, '</pre><div class="toolbar"><div class="toolbar-item"><button class="copy-to-clipboard-button">Copy</button></div></div></div>')
      .replace(/<code>/g, '<code class="language-none">')
      .replace(/<code class="([^"]*)">/g, '<code class="language-$1">');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading post. Please try again.</p>
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post?.title}
      </h1>
      
      <Link to={`/search?category=${post?.category}`} className="self-center mt-5">
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      
      <img
        src={post?.image}
        alt={post?.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover rounded-lg shadow-md"
      />
      
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      {/* Processed content with proper code block handling */}
      <div
        className="post-content p-3 max-w-2xl mx-auto w-full"
        dangerouslySetInnerHTML={{ __html: processContent(post?.content) }}
      />

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      
      <CommentSection postId={post?._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts && recentPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default PostPage;