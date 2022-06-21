import React, { useEffect } from 'react';
import IconUser from '../../assets/img/user-icon.jpg';
import IconSmallMenu from '../../assets/img/icon-small-menu.svg';
import { deletePost } from '../../reducks/posts/operations';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import like from '../../assets/img/heart.svg';

const Post = React.forwardRef((props, ref) => {
    const { post } = props;
    const dispatch = useDispatch();
    const [menuToggle, setMenuToggle] = useState(false);

    const deleteHandler = () => {
        dispatch(deletePost(post.id));
    };

    const editpage = () => {
        dispatch(push('/edit/'));
    };

    const settingHandler = () => {
        setMenuToggle(!menuToggle);
    };

    const getDate = date => {
        return new Date(date).toLocaleDateString('en-Us', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // try 
    const [liked, setLiked] = useState(0)
    const likeFunction = () => {
        setLiked(liked => liked +1);
    };
    //try

    return (
        <li ref={ref}>
            <img className="menu_icon" onClick={settingHandler} src={IconSmallMenu} alt="setting" />
            {menuToggle && (
                <div className="menu">
                    <span onClick={deleteHandler}>Delete</span> <br />
                    {/* try  */}
                    <span onClick={editpage}>Edit</span>
                    {/* try  */}
                </div>
            )}
            <div className="logo">
                <img src={IconUser} alt="user-profile" />
            </div>
            <div className="name_body">
                <div className="name">{post.name}</div>
                <div className="datetime">{getDate(post.created_at)}</div>
                <p className="body">{post.body}</p>
                {post.image && (
                        <a href={post.image} target="_blank" rel="noopener noreferrer">
                            <img className="post-image" src={post.image} alt="thumbnail" />
                        </a>
                )}
                        <img  className='likeImg' src={like} alt="like" onClick={likeFunction} />
                        <p>Likes {liked}</p>
            </div>
        </li>
    );
});

export default Post;
