# 📘 API Documentation

Welcome to the **API Documentation**! This API offers endpoints for:

✨ **User Authentication**  
👤 **User Management**  
📝 **Post Management**  
💬 **Comment Management**  
🚨 **Error Handling**

---

## 📚 Table of Contents

- [🔐 Authentication](#-authentication)
- [👥 Users](#-users)
- [📝 Posts](#-posts)
- [💬 Comments](#-comments)
- [🚨 Error Handling](#-error-handling)

---

## 🔐 Authentication

### 1. 📝 **Signup**
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "message": "Signup Successful"
}
```

**Error Responses:**
- ❌ `400 Bad Request`: All fields are required.
- ❌ `500 Internal Server Error`: Database or server error.

---

### 2. 🔓 **Signin**
**Endpoint:** `POST /api/auth/signin`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "id": "userId",
  "username": "john_doe",
  "email": "john@example.com",
  "isAdmin": false
}
```

**Error Responses:**
- ❌ `400 Bad Request`: All fields are required.
- ❌ `404 Not Found`: Wrong credentials.

---

### 3. 🔐 **Google Authentication**
**Endpoint:** `POST /api/auth/google`

**Request Body:**
```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "googlePhotoUrl": "https://example.com/photo.jpg"
}
```

**Success Response:**
```json
{
  "id": "userId",
  "username": "john_doe1234",
  "email": "john@example.com",
  "profilePicture": "https://example.com/photo.jpg",
  "isAdmin": false
}
```

---

## 👥 Users

### 1. 📋 **Get All Users**
**Endpoint:** `GET /api/user/getusers`

**Headers:**
- `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "users": [
    {
      "id": "userId",
      "username": "john_doe",
      "email": "john@example.com",
      "isAdmin": false
    }
  ],
  "totalUsers": 10,
  "lastMonthUsers": 2
}
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to see all users.

---

### 2. 🔍 **Get User by ID**
**Endpoint:** `GET /api/user/:userId`

**Success Response:**
```json
{
  "id": "userId",
  "username": "john_doe",
  "email": "john@example.com",
  "isAdmin": false
}
```

**Error Response:**
- ❌ `404 Not Found`: User not found.

---

### 3. 🛠️ **Update User**
**Endpoint:** `PUT /api/user/update/:userId`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "username": "new_username",
  "email": "new_email@example.com",
  "password": "newpassword123"
}
```

**Success Response:**
```json
{
  "id": "userId",
  "username": "new_username",
  "email": "new_email@example.com"
}
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to update this user.

---

### 4. 🗑️ **Delete User**
**Endpoint:** `DELETE /api/user/delete/:userId`

**Headers:**
- `Authorization: Bearer <token>`

**Success Response:**
```json
"User has been deleted"
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to delete this account.

---

## 📝 Posts

### 1. ➕ **Create Post**
**Endpoint:** `POST /api/post/create`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My First Post",
  "content": "This is the content of the post.",
  "category": "general"
}
```

**Success Response:**
```json
{
  "id": "postId",
  "title": "My First Post",
  "content": "This is the content of the post.",
  "category": "general",
  "slug": "my-first-post"
}
```

**Error Responses:**
- ❌ `403 Forbidden`: You are not allowed to create a post.
- ❌ `400 Bad Request`: Please provide all required fields.

---

### 2. 📥 **Get Posts**
**Endpoint:** `GET /api/post/getposts`

**Query Parameters:**
- `startIndex` (optional)
- `limit` (optional)
- `order` (optional): `asc` or `desc`

**Success Response:**
```json
{
  "posts": [
    {
      "id": "postId",
      "title": "My First Post",
      "content": "This is the content of the post.",
      "category": "general"
    }
  ],
  "totalPosts": 10,
  "lastMonthPosts": 2
}
```

---

### 3. 🖊️ **Update Post**
**Endpoint:** `PUT /api/post/updatepost/:postId/:userId`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content."
}
```

**Success Response:**
```json
{
  "id": "postId",
  "title": "Updated Title",
  "content": "Updated content."
}
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to update this post.

---

### 4. ❌ **Delete Post**
**Endpoint:** `DELETE /api/post/deletepost/:postId/:userId`

**Headers:**
- `Authorization: Bearer <token>`

**Success Response:**
```json
"The Post has been deleted"
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to delete this post.

---

## 💬 Comments

### 1. 💭 **Create Comment**
**Endpoint:** `POST /api/comment/create`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is a comment.",
  "postId": "postId",
  "userId": "userId"
}
```

**Success Response:**
```json
{
  "id": "commentId",
  "content": "This is a comment.",
  "postId": "postId",
  "userId": "userId"
}
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to create this comment.

---

### 2. 👀 **Get Comments for a Post**
**Endpoint:** `GET /api/comment/getPostComments/:postId`

**Success Response:**
```json
[
  {
    "id": "commentId",
    "content": "This is a comment.",
    "postId": "postId",
    "userId": "userId"
  }
]
```

---

### 3. 👍 **Like/Unlike Comment**
**Endpoint:** `PUT /api/comment/likeComment/:commentId`

**Headers:**
- `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "id": "commentId",
  "likes": ["userId"],
  "numberOfLikes": 1
}
```

---

### 4. ✏️ **Edit Comment**
**Endpoint:** `PUT /api/comment/editComment/:commentId`

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated comment content."
}
```

**Success Response:**
```json
{
  "id": "commentId",
  "content": "Updated comment content."
}
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to edit this comment.

---

### 5. 🗑️ **Delete Comment**
**Endpoint:** `DELETE /api/comment/deleteComment/:commentId`

**Headers:**
- `Authorization: Bearer <token>`

**Success Response:**
```json
"Comment has been deleted"
```

**Error Response:**
- ❌ `403 Forbidden`: You are not allowed to delete this comment.

---

## 🚨 Error Handling

All error responses follow this structure:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message"
}
```

---

> ✨ API Routes And Endpoints With Errors and Responses! 🚀