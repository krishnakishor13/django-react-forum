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
    const post = getPosts(selector);
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const postValues = { 
      name: post.name,
      body: post.body, 
      image: post.image
    };
    const [values, setValues] = useState(postValues);

    const handleInputChange = e => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
  };

    // useEffect(() => {
    //   dispatch(fetchPosts());
    // }, [])

    return (
        <>
         <input
                type="text"
                name="name"
                value={post.name}
                placeholder="Name"
                onChange={handleInputChange}
                required
            />
        </>
    );
};

export default Edit;
