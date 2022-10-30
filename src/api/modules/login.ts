import http from "@/api";



// * 获取按钮权限
export const getAuthorButtons = () => {
	return http.get(`/auth/buttons`);
};


