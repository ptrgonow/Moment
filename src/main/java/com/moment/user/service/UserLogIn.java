package com.moment.user.service;

import com.google.gson.Gson;
import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.user.model.UserDAO;
import com.moment.user.model.UserDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class UserLogIn implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String userId = request.getParameter("userId");
        String userPwd = request.getParameter("userPwd");
        System.out.println("userId: " + userId);
        System.out.println("userPwd: " + userPwd);

        UserDAO dao = UserDAO.getInstance();

        if (dao.checkUserExists(userId, userPwd)) {
            UserDTO user = dao.getUerInfo(userId, userPwd);
            Gson gson = new Gson();
            String json = gson.toJson(user.getUserName());
            HttpSession session = request.getSession();
            session.setAttribute("userName", user.getUserName());
            System.out.println("userName: " + user.getUserName());
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(json);
            System.out.println("로그인 성공");
        } else {
            System.out.println("로그인 실패");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        return null;
    }
}
