import type {PaginatedUsers, User} from "./types.ts";

export const LIMIT = "4";
const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers(page: number = 1): Promise<PaginatedUsers> {
    const params = new URLSearchParams({
        _page: String(page),
        _limit: LIMIT,
    });

    const res = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Unable to get users");
    }

    const data: User[] = await res.json();
    const totalCount = res.headers.get('X-Total-Count');
    const total = totalCount ? parseInt(totalCount, 10) : 0;

    return { data, total };
}