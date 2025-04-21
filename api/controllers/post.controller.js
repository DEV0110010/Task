import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";
import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const sanitizeHTML = (dirty) =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "strong", "em", "u", "pre", "code", "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "span", "div", "br", "blockquote", "a",
      "img", "b", "i", "table", "thead", "tbody", "tr", "th", "td"
    ],
    ALLOWED_ATTR: ["class", "href", "src", "alt", "style", "target"],
    FORBID_ATTR: ["style", "onerror"],
    ADD_ATTR: ['target'],
    ADD_TAGS: ['iframe'],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto|ftp|tel):|[^a-z]|[a-z+.-]+(?:[^a-z+.\-:]|$))/i
  });

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) return next(errorHandler(403, "You are not allowed to create a post"));
  if (!req.body.title || !req.body.content) return next(errorHandler(400, "Please provide all required fields"));

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");

  const processedContent = req.body.content
    .replace(/<pre class="ql-syntax" spellcheck="false">/g, '<pre><code>')
    .replace(/<\/pre>/g, '</code></pre>');

  const newPost = new Post({
    ...req.body,
    content: sanitizeHTML(processedContent),
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "desc" ? -1 : 1;

    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1));
    const lastMonthPosts = await Post.countDocuments({ createdAt: { $gte: oneMonthAgo } });

    res.status(200).json({ posts, totalPosts, lastMonthPosts });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The Post has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this post"));
  }

  const processedContent = req.body.content
    .replace(/<pre class="ql-syntax" spellcheck="false">/g, '<pre><code>')
    .replace(/<\/pre>/g, '</code></pre>');

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: sanitizeHTML(processedContent),
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};