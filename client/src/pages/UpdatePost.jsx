import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const UpdatePost = () => {
    const { currentUser } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if(res.ok){
            setPublishError(null);
            setFormData(data.posts[0]);
        }
      }
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
            value={formData.title}
          />

          <Select
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
            }}
            value={formData.category}
          >
            {/* General Category */}
            <option value="uncategorized">Select a category</option>

            {/* Technology & Programming */}
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="web-development">Web Development</option>
            <option value="mobile-apps">Mobile Apps</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="data-science">Data Science</option>
            <option value="machine-learning">Machine Learning</option>
            <option value="artificial-intelligence">
              Artificial Intelligence
            </option>
            <option value="cloud-computing">Cloud Computing</option>
            <option value="blockchain">Blockchain</option>
            <option value="software-development">Software Development</option>
            <option value="open-source">Open Source</option>
            <option value="robotics">Robotics</option>
            <option value="game-development">Game Development</option>
            <option value="UI-UX-design">UI/UX Design</option>
            <option value="ethical-hacking">Ethical Hacking</option>
            <option value="devops">DevOps</option>
            <option value="frontend-development">Frontend Development</option>
            <option value="backend-development">Backend Development</option>
            <option value="full-stack-development">
              Full Stack Development
            </option>
            <option value="database-management">Database Management</option>
            <option value="software-testing">Software Testing</option>
            <option value="quantum-computing">Quantum Computing</option>
            <option value="embedded-systems">Embedded Systems</option>
            <option value="internet-of-things">Internet of Things (IoT)</option>
            <option value="virtual-reality">Virtual Reality</option>
            <option value="augmented-reality">Augmented Reality</option>
            <option value="web3">Web3</option>
            <option value="cyber-physical-systems">
              Cyber-Physical Systems
            </option>
            <option value="game-ai">Game AI</option>
            <option value="edge-computing">Edge Computing</option>

            {/* Business & Finance */}
            <option value="finance">Finance</option>
            <option value="business">Business</option>
            <option value="marketing">Marketing</option>
            <option value="investing">Investing</option>
            <option value="entrepreneurship">Entrepreneurship</option>
            <option value="startups">Startups</option>
            <option value="cryptocurrency">Cryptocurrency</option>
            <option value="real-estate">Real Estate</option>
            <option value="e-commerce">E-commerce</option>
            <option value="personal-finance">Personal Finance</option>
            <option value="stock-market">Stock Market</option>
            <option value="business-analytics">Business Analytics</option>
            <option value="venture-capital">Venture Capital</option>
            <option value="taxation">Taxation</option>
            <option value="dropshipping">Dropshipping</option>
            <option value="sales-strategies">Sales Strategies</option>
            <option value="fintech">Fintech</option>
            <option value="wealth-management">Wealth Management</option>
            <option value="crowdfunding">Crowdfunding</option>
            <option value="economic-policies">Economic Policies</option>
            <option value="business-law">Business Law</option>
            <option value="business-intelligence">Business Intelligence</option>
            <option value="customer-experience">Customer Experience</option>

            {/* Career & Productivity */}
            <option value="career">Career</option>
            <option value="job-hunting">Job Hunting</option>
            <option value="freelancing">Freelancing</option>
            <option value="side-hustles">Side Hustles</option>
            <option value="workplace-culture">Workplace Culture</option>
            <option value="leadership">Leadership</option>
            <option value="public-speaking">Public Speaking</option>
            <option value="negotiation">Negotiation</option>
            <option value="productivity">Productivity</option>
            <option value="career-growth">Career Growth</option>
            <option value="interview-tips">Interview Tips</option>
            <option value="networking">Networking</option>
            <option value="remote-work">Remote Work</option>
            <option value="personal-branding">Personal Branding</option>
            <option value="resume-building">Resume Building</option>
            <option value="time-management">Time Management</option>
            <option value="career-switching">Career Switching</option>
            <option value="soft-skills-development">
              Soft Skills Development
            </option>
            <option value="hybrid-work">Hybrid Work</option>
            <option value="conflict-resolution">Conflict Resolution</option>
            <option value="entrepreneurship-mindset">
              Entrepreneurship Mindset
            </option>

            {/* Art & Creativity */}
            <option value="art">Art</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="photography">Photography</option>
            <option value="animation">Animation</option>
            <option value="3d-modeling">3D Modeling</option>

            {/* Lifestyle & Personal Development */}
            <option value="stoicism">Stoicism</option>
            <option value="productivity-hacks">Productivity Hacks</option>
            <option value="digital-detox">Digital Detox</option>
            <option value="emotional-intelligence">
              Emotional Intelligence
            </option>
            <option value="gratitude-practices">Gratitude Practices</option>
            <option value="life-coaching">Life Coaching</option>
            <option value="personal-finance-for-students">
              Personal Finance for Students
            </option>
            <option value="lifestyle">Lifestyle</option>
            <option value="self-improvement">Self-Improvement</option>
            <option value="personal-development">Personal Development</option>
            <option value="psychology">Psychology</option>
            <option value="philosophy">Philosophy</option>
            <option value="relationships">Relationships</option>
            <option value="parenting">Parenting</option>
            <option value="mental-health">Mental Health</option>
            <option value="mindfulness">Mindfulness</option>
            <option value="meditation">Meditation</option>
            <option value="spirituality">Spirituality</option>
            <option value="work-life-balance">Work-Life Balance</option>

            {/* Entertainment & Media */}
            <option value="gaming">Gaming</option>
            <option value="entertainment">Entertainment</option>
            <option value="movies">Movies</option>
            <option value="television">Television</option>
            <option value="music">Music</option>
            <option value="podcasting">Podcasting</option>
            <option value="content-creation">Content Creation</option>
            <option value="social-media">Social Media</option>
            <option value="video-editing">Video Editing</option>
            <option value="film-making">Film Making</option>
            <option value="influencer-marketing">Influencer Marketing</option>

            {/* Science & Innovation */}
            <option value="science">Science</option>
            <option value="astronomy">Astronomy</option>
            <option value="biotechnology">Biotechnology</option>
            <option value="nanotechnology">Nanotechnology</option>
            <option value="renewable-energy">Renewable Energy</option>
            <option value="climate-change">Climate Change</option>
            <option value="space-exploration">Space Exploration</option>
            <option value="marine-biology">Marine Biology</option>
            <option value="wildlife">Wildlife</option>

            {/* Health & Wellness */}
            <option value="health">Health</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
            <option value="dieting">Dieting</option>
            <option value="weight-loss">Weight Loss</option>
            <option value="yoga">Yoga</option>
            <option value="alternative-medicine">Alternative Medicine</option>

            {/* Travel & Adventure */}
            <option value="eco-tourism">Eco-Tourism</option>
            <option value="sustainable-travel">Sustainable Travel</option>
            <option value="travel-blogging">Travel Blogging</option>
            <option value="cultural-immersion">Cultural Immersion</option>

            {/* Food & Cooking */}
            <option value="fermentation">Fermentation</option>
            <option value="home-brewing">Home Brewing</option>
            <option value="global-cuisine">Global Cuisine</option>
            <option value="food">Food</option>
            <option value="cooking">Cooking</option>
            <option value="baking">Baking</option>
            <option value="vegan-lifestyle">Vegan Lifestyle</option>
            <option value="wine-and-beverages">Wine & Beverages</option>

            {/* Society & Culture */}
            <option value="history">History</option>
            <option value="politics">Politics</option>
            <option value="economics">Economics</option>
            <option value="sustainability">Sustainability</option>
            <option value="philanthropy">Philanthropy</option>
            <option value="charity">Charity</option>
            <option value="nonprofits">Nonprofits</option>

            {/* Health & Fitness */}
            <option value="biohacking">Biohacking</option>
            <option value="strength-training">Strength Training</option>
            <option value="fitness-gadgets">Fitness Gadgets</option>
            <option value="diet-nutrition-science">
              Diet & Nutrition Science
            </option>
            <option value="home-workouts">Home Workouts</option>
            <option value="mental-resilience">Mental Resilience</option>

            {/* Home & Design */}
            <option value="home-improvement">Home Improvement</option>
            <option value="DIY">DIY</option>
            <option value="interior-design">Interior Design</option>
            <option value="architecture">Architecture</option>
            <option value="gardening">Gardening</option>
            <option value="woodworking">Woodworking</option>

            {/* Miscellaneous */}
            <option value="astronomy">Astronomy</option>
            <option value="aviation">Aviation</option>
            <option value="myth-busting">Myth-Busting</option>
            <option value="vintage-collectibles">Vintage Collectibles</option>
            <option value="automotive">Automotive</option>
            <option value="pets">Pets</option>
            <option value="books">Books</option>
            <option value="DIY-crafts">DIY Crafts</option>
            <option value="education">Education</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="h-72 w-full object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something"
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          value={formData.content}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToPink"
          className="mt-4 sm:mt-0"
        >
          Update post
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
};

export default UpdatePost;
