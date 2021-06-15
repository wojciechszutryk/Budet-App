import http from "./http-common";

class UploadFilesService {
    upload(file, email, password) {
        let formData = new FormData();
        formData.append("userImage", file);
        formData.append("password", password);
        formData.append("email", email);

        return http.post("/users/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}

export default new UploadFilesService();