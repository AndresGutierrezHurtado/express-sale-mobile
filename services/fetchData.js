export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(process.env.EXPO_PUBLIC_API_URL + endpoint);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Fetch Error: ", err);
    }
}