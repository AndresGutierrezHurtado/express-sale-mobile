export const fetchData = async (endpoint) => {
    try {
        const res = await fetch(`http://192.168.1.4:8080${endpoint}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log("Fetch Error: ", err);
    }
}