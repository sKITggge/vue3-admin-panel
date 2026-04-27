import type {PaginatedUsers, Post, User} from "./types.ts";

export const LIMIT = "4";
const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getUsers(page: number = 1): Promise<PaginatedUsers> {
    const params = new URLSearchParams({
        _page: String(page),
        _limit: LIMIT,
    });

    const res = await fetch(`${BASE_URL}/users?${params.toString()}`);

    if (!res.ok) {
        return { data: [], total: 0 };
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