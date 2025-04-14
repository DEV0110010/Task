import { Button, Select, Spinner, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';


const Search = () => {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: 'uncategorized',
    })
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    console.log(sidebarData);
    

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const sortFromUrl = urlParams.get('sort');
        const categoryFromUrl = urlParams.get('category');
        if( searchTermFromUrl || sortFromUrl || categoryFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            });
        }
        try {
           const fetchPosts = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/post/getposts?${searchQuery}`)
            if(!res.ok){
                setLoading(false);
                return;
            }
            if(res.ok){
                const data = await res.json();
                setPosts(data.posts);
                setLoading(false);
                if(data.posts.length === 9){
                    setShowMore(true);
                }else{
                    setShowMore(false);
                }
            }
           }
           fetchPosts(); 
        } catch (error) {
            console.log(error.message);
            
        }
    }, [location.search])

    const handleChange = (e) => {
      if(e.target.id === 'searchTerm'){
        setSidebarData({...sidebarData, searchTerm: e.target.value})
      }
      if(e.target.id === 'sort'){
        const order = e.target.value || 'desc';
        setSidebarData({...sidebarData, sort: order})
      }
      if(e.target.id === 'category'){
        const category = e.target.value || 'uncategorized';
        setSidebarData({...sidebarData, category})
      }
    }
    
    const handelSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('searchTerm', sidebarData.searchTerm);
      urlParams.set('sort', sidebarData.sort);
      urlParams.set('category', sidebarData.category);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }
    
    const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data = await res.json();
            setPosts([...posts, ...data.posts]);
            if(data.posts.length === 9){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
        }
    }

  return (
    <div className='flex flex-col md:flex-row'> 
        <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form className='flex flex-col gap-8' onSubmit={handelSubmit}>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold' >
                        Search Term:
                    </label>
                    <TextInput placeholder='Search...'
                    id='searchTerm'
                    type='text'
                    value={sidebarData.searchTerm}
                    onChange={handleChange}/>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold' >
                        Sort:
                    </label>
                    <Select onChange={handleChange} value={sidebarData.sort}
                    id='sort'>
                        <option value="desc">Latest</option>
                        <option value="asc">Oldest</option>
                    </Select>
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold' >
                        Category:
                    </label>
                    <Select onChange={handleChange} value={sidebarData.category}
                    id='category'>
                        {/* General Category */}
                        <option value="uncategorized">Uncategorized</option>

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
                <Button type='submit' outline gradientDuoTone='purpleToPink'>
                    Apply Filters
                </Button>
            </form>
        </div>
        <div className='w-full'>
        <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5'>Posts results:</h1>
        <div className='p-7 flex flex-wrap gap-4'>
            {!loading && posts.length === 0 && 
            <p className='text-xl text-gray-500'>No posts found.</p>}
            {loading && <p className='text-xl text-gray-500'>
                <Spinner size="xl" /> Loading... </p>}
                {!loading && posts && posts.map((post)=>(
                    <PostCard key={post._id} post={post}/>
                ))}
                {showMore && <button onClick={handleShowMore} className='text-teal-500 text-lg hover:underline p-7 w-full'>
                    Show More
                    </button>}
        </div>
        </div>
    </div>
  )
}

export default Search