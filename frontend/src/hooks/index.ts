import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}

export const useBlog = ({ id } : { id: string }) => {

    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>()

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    },[id])
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token);

        if (!token) {
            setLoading(false);
            console.error("No token found in localStorage");
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: token
            }
        })
        .then(response => {
            setBlogs(response.data.blogs);
        })
        .catch(error => {
            console.error("Error fetching blogs:", error);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    return {
        loading,
        blogs
    };
};
