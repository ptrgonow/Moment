package com.moment.admin.service;

import com.moment.action.Action;
import com.moment.action.ActionForward;
import com.moment.admin.model.AdminDAO;
import com.moment.admin.model.AdminDTO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class AdminSignUp implements Action {
    @Override
    public ActionForward execute(HttpServletRequest request, HttpServletResponse response) throws Exception {

            System.out.println("AdminInputOK 진입!");
            String adminId = request.getParameter("admin_id").trim();
            String adminPwd = request.getParameter("admin_pwd").trim();
            String adminName = request.getParameter("admin_name").trim();
            String adminPhone = request.getParameter("admin_phone").trim();
            String adminAddr = request.getParameter("admin_addr").trim();
            String adminBirth = request.getParameter("admin_birth").trim();
            String adminGrade = request.getParameter("admin_grade").trim();
            String adminTeam = request.getParameter("admin_team").trim();

            AdminDTO dto = new AdminDTO();
            dto.setAdminId(adminId);
            dto.setAdminPwd(adminPwd);
            dto.setAdminName(adminName);
            dto.setAdminPhone(adminPhone);
            dto.setAdminAddr(adminAddr);
            dto.setAdminBirth(adminBirth);
            dto.setAdminGrade(adminGrade);
            dto.setAdminTeam(adminTeam);

            AdminDAO dao = AdminDAO.getInstance();

            int check = dao.adminInput(dto);
            PrintWriter out = response.getWriter();

            if(check > 0) {
                out.println("<script>");
                out.println("alert('관리자 등록 성공')");
                System.out.println("AdminInputOK 탈출!");
                out.println("location.href='admin_list.go'");
                out.println("</script>");
            }else {
                out.println("<script>");
                out.println("alert('관리자 등록 실패')");
                out.println("history.back()");
                out.println("</script>");
            }
            return null;
    }
}
