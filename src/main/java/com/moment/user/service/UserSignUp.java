package com.moment.user.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.user.model.UserDAO;
import com.moment.user.model.UserDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class UserSignUp implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String userId = request.getParameter("signId");
        String userPwd = request.getParameter("signPwd");
        String userName = request.getParameter("signName");

        UserDTO dto = new UserDTO();
        dto.setUserId(userId);
        dto.setUserPwd(userPwd);
        dto.setUserName(userName);

        UserDAO dao = UserDAO.getInstance();
        int check = dao.insertUser(dto);

        PrintWriter out = response.getWriter();
        if (check > 0) {
            out.println("<script>");
            out.println("alert('회원가입 성공')");
            out.println("location.href='/views/User/UserLogin.jsp'");
            out.println("</script>");
        } else {
            out.println("<script>");
            out.println("alert('회원가입 실패')");
            out.println("history.back()");
            out.println("</script>");
        }

        return null;

    }
}
