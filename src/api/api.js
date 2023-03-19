import axios from "axios";

export async function getAll(token) {
    const response =  await axios.get('https://api.wisey.app/api/v1/core/preview-courses', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.courses
}

export async function getForId(id, token) {
    const response = await axios.get(`https://api.wisey.app/api/v1/core/preview-courses/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    return response.data
}
export async function getToken() {
    const response = await axios.get(`https://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions`)
    return response.data

}


