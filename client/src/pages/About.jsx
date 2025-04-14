import CallToAction from '../components/CallToAction';

const About = () => {
  return (
    <div className='min-h-screen max-w-4xl mx-auto flex justify-center gap-8 items-center flex-col p-6'>
      <h1 className='text-6xl font-bold text-center text-gray-700 dark:text-gray-200'>
        About InsipreHub's Blog
      </h1>
      <p className='text-lg text-gray-600 text-center max-w-3xl dark:text-gray-300'>
        Welcome to InsipreHub's Blog! This blog was created by Deepanshu Pandey as
        a personal project to share his thoughts and ideas with the world. Deepanshu
        is a passionate developer who loves to write about technology, coding, and
        everything in between.
      </p>
      <p className='text-lg text-gray-600 text-center max-w-3xl dark:text-gray-300'>
        On this blog, you'll find weekly articles and tutorials on topics such as
        web development, software engineering, and programming languages. Deepanshu
        is always learning and exploring new technologies, so be sure to check back
        often for new content!
      </p>
      <p className='text-lg text-gray-600 text-center max-w-3xl dark:text-gray-300'>
        We encourage you to leave comments on our posts and engage with other readers.
        You can like other people's comments and reply to them as well. We believe that
        a community of learners can help each other grow and improve.
      </p>
      <div className='w-full flex flex-col gap-6 mt-8'>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-700'>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            Why This Blog?
          </h2>
          <p className='text-gray-600 mt-2 dark:text-gray-400'>
            This blog is an extension of our mission to educate and inspire the developer
            community. By sharing valuable insights and practical tips, we aim to help
            others grow their skills and embark on their own development journeys.
          </p>
        </section>
        <section className='bg-gray-100 p-6 rounded-lg shadow-md dark:bg-gray-700'>
          <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-200'>
            What You'll Find Here
          </h2>
          <ul className='list-disc list-inside text-gray-600 mt-2 dark:text-gray-400'>
            <li>In-depth tutorials on web development technologies</li>
            <li>Best practices for clean and efficient coding</li>
            <li>Latest trends in software engineering</li>
            <li>Tech interviews and career advice</li>
            <li>Community-driven insights and discussions</li>
          </ul>
        </section>
      </div>
      <div className='mt-10'>
        <CallToAction />
      </div>
    </div>
  );
};

export default About;
