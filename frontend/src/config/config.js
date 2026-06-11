
if(!import.meta.env.VITE_BACKEND_PORT){
    throw new Error("VITE_BACKEND_PORT not found");
}
const config = {
    BACKEND_PORT:import.meta.env.VITE_BACKEND_PORT
}

export default config;