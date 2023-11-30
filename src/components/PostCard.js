import { Trash } from 'react-bootstrap-icons';
import { BsFillGearFill } from 'react-icons/bs';
import { useContext } from 'react';
//import { Link } from 'react-router-dom';
import PostsContext from '../context/posts';
import UserContext from '../context/user';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ post }) {
    const { deletePostById } = useContext(PostsContext);
    const { user } = useContext(UserContext);
    const handleDeleteClick = () => {
        deletePostById(post.id);
    };
    const date = new Date(post.datetime);
    console.log(post);
    return (
        <div className="col">
            <div className="card">
                <img alt="post" src={`data:image/png;base64, ${post.image}`} />
                <div className="card-body">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="border rounded border-primary p-1 text-primary"><b>{post.category[0].toUpperCase()}{post.category.substring(1)}</b></div>
                        <div className="d-flex flex-row justify-content-between">
                            <div className="me-2 mt-2">
                                {(user && user.id === post.userId) ?
                                    <Link to={`/posts/edit/${post.id}`} state={post}>
                                        <BsFillGearFill color="black" />
                                    </Link> : ""}
                            </div>
                            <div>{(user && user.id === post.userId) ?
                                <button className="btn btn-link" onClick={handleDeleteClick}>
                                    <Trash color='red' />
                                </button> :
                                ""}
                            </div>
                        </div>
                    </div>
                    <h5 className="card-title text-center">{post.title}</h5>
                    <div className="card-text">{parse(post.content.substring(0, 200))}
                        <div>
                            <Link to={`/posts/${post.id}`} state={post}>more...</Link>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="text-muted small">
                        {post.user.name} in {date.toLocaleDateString('en-us', { year: "numeric", month: "short" })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;