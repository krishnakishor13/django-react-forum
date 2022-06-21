import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import IconUser from '../assets/img/user-icon.jpg';
import { fetchPosts, updatePost } from '../reducks/posts/operations';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/Posts/PostForm';
import { getPosts } from '../reducks/posts/selectors';

const Edit = () => {
    const selector = useSelector((state) => state);
    const dispatch = useDispatch();
    const posts = getPosts(selector);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
  //   const updateHandler = () => {
  //     dispatch(updatePost(post.id));
  // };

    useEffect(() => {
      dispatch(fetchPosts());
    }, [])

    return (
        <>
        <PostForm />
        </>
    );
};

export default Edit;
