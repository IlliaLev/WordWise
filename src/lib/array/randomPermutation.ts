export function randomPermutation<T>(arr: T[]): T[] {
    const res = [...arr];

    for(let idx = res.length - 1; idx > 0; idx--) {
        const randomIdx = Math.floor(Math.random() * (idx + 1));
        [res[idx], res[randomIdx]] = [res[randomIdx], res[idx]];
    }

    return res;
}