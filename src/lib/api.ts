import type {PaginatedPosts, PaginatedUsers, Post, User} from "./types.ts";

export const LIMIT = 6;
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(page: number = 1, search: string = ""): Promise<PaginatedUsers> {
    const params = new URLSearchParams({
        _page: String(page),
        _limit: String(LIMIT),
        q: search,
    });

    const res = await fetch(`${BASE_URL}/users?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Unable to get users");
    }

    const data: User[] = await res.json();
    const totalCount = res.headers.get('X-Total-Count');
    const total = totalCount ? parseInt(totalCount, 10) : 0;

    return { data, total };
}

export async function getUser(id: number): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${id}`);

    if (!res.ok) {
        throw Error("Unable to get user");
    }

    return await res.json();
}

export async function getUserPosts(id: number): Promise<Post[]> {
    const res = await fetch(`${BASE_URL}/posts?userId=${id}`);

    if (!res.ok) {
        return []
    }

    return await res.json();
}

export async function getPosts(page: number = 1, search: string = ""): Promise<PaginatedPosts> {
    const params = new URLSearchParams({
        _expand: "user",
        _page: String(page),
        _limit: String(LIMIT),
        q: search,
    });

    const res = await fetch(`${BASE_URL}/posts?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Unable to get posts");
    }

    const data = await res.json();
    const totalCount = res.headers.get('X-Total-Count');
    const total = totalCount ? parseInt(totalCount, 10) : 0;

    return { data, total };
}

export async function deletePost(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error('Delete failed');
    }
}