import axios, { AxiosRequestConfig } from "axios";

type HeaderContentType = "json" | "multipart";

interface CustomConfig extends AxiosRequestConfig {
  contentType?: HeaderContentType;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const getClient = (contentType: HeaderContentType = "json") => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type":
        contentType === "json" ? "application/json" : "multipart/form-data",
    },
  });
  return client;
};

export const api = {
  get: async <T>(url: string, config?: CustomConfig): Promise<T> => {
    const client = getClient(config?.contentType);
    const response = await client.get(url, config);
    return response.data;
  },

  post: async <T>(
    url: string,
    data: any,
    config?: CustomConfig
  ): Promise<T> => {
    const client = getClient(config?.contentType);
    const response = await client.post(url, data, config);
    return response.data;
  },

  put: async <T>(url: string, data: any, config?: CustomConfig): Promise<T> => {
    const client = getClient(config?.contentType);
    const response = await client.put(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: CustomConfig): Promise<T> => {
    const client = getClient(config?.contentType);
    const response = await client.delete(url, config);
    return response.data;
  },
};

// POST 요청 예제 (JSON)
// const createUser = async () => {
//   const newUser = {
//     name: "홍길동",
//     email: "hong@example.com",
//     age: 25,
//   };

//   const createdUser = await api.post<User>("/users", newUser);
//   console.log(`생성된 유저 ID: ${createdUser.id}`);
// };

// 2. 파일 업로드 예제 (multipart/form-data)
// interface FileResponse {
//     fileUrl: string;
//     fileName: string;
//   }

//   const uploadUserProfile = async (userId: number, file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('userId', userId.toString());

//     const response = await api.post<FileResponse>(
//       '/users/profile-upload',
//       formData,
//       { contentType: 'multipart' }  // multipart 설정
//     );

//     console.log(`업로드된 파일 URL: ${response.fileUrl}`);
//   };
