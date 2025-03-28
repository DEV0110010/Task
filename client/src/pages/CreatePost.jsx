import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
        <form className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                <TextInput type='text' placeholder='Title' required id='title' className='flex-1'/>
                
    <Select>
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
      <option value="artificial-intelligence">Artificial Intelligence</option>
      <option value="cloud-computing">Cloud Computing</option>
      <option value="blockchain">Blockchain</option>
      <option value="software-development">Software Development</option>
      <option value="open-source">Open Source</option>
      <option value="robotics">Robotics</option>
      <option value="game-development">Game Development</option>

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

      {/* Lifestyle & Personal Development */}
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
      <option value="travel">Travel</option>
      <option value="adventure">Adventure</option>
      <option value="backpacking">Backpacking</option>
      <option value="road-trips">Road Trips</option>
      <option value="luxury-travel">Luxury Travel</option>
      <option value="budget-travel">Budget Travel</option>

      {/* Home & Design */}
      <option value="home-improvement">Home Improvement</option>
      <option value="DIY">DIY</option>
      <option value="interior-design">Interior Design</option>
      <option value="architecture">Architecture</option>
      <option value="gardening">Gardening</option>
      <option value="woodworking">Woodworking</option>

      {/* Art & Creativity */}
      <option value="art">Art</option>
      <option value="graphic-design">Graphic Design</option>
      <option value="photography">Photography</option>
      <option value="animation">Animation</option>
      <option value="3d-modeling">3D Modeling</option>

      {/* Food & Cooking */}
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

      {/* Miscellaneous */}
      <option value="automotive">Automotive</option>
      <option value="pets">Pets</option>
      <option value="books">Books</option>
      <option value="DIY-crafts">DIY Crafts</option>
      <option value="education">Education</option>
    </Select>
            </div>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                <FileInput type='file' accept='image'/>
                <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>
                    Upload image
                </Button>
            </div>
            <ReactQuill theme='snow' placeholder='Write something' className='h-72 mb-12' required />
            <Button type='submit' gradientDuoTone='purpleToPink'>
                Publish
            </Button>
        </form>
    </div>
  )
}

export default CreatePost