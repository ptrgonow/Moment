package com.moment.admin.service;

import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.AdminDAO;
import com.moment.admin.model.AdminDTO;

public class AdminLogIn implements Action{

    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

        String adminId = request.getParameter("adminId").trim();
        String adminPwd = request.getParameter("adminPwd").trim();

        AdminDAO dao = AdminDAO.getInstance();
        int check = dao.adminCheck(adminId,adminPwd);

        PrintWriter out = response.getWriter();
        ActionForward forward = new ActionForward();
        HttpSession session = request.getSession();

        if(check > 0) {

            AdminDTO cont = dao.getAdmin(adminId);

            session.setAttribute("adminId", cont.getAdminId());
            session.setAttribute("adminName", cont.getAdminName());

            forward.setRedirect(false);
            forward.setPath("views/admin/AdminMain.jsp");

        }else if(check == -1) {

            out.println("<script>");
            out.println("alert('비밀번호가 틀립니다.')");
            out.println("history.back()");
            out.println("</script>");
        }else {

            out.println("<script>");
            out.println("alert('아이디가 틀립니다.')");
            out.println("history.back()");
            out.println("</script>");
        }

        return forward;
    }

}
