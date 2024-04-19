package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class AdminDAO {

    private static AdminDAO instance = null;

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    ConnectionPool cp = null;

    private AdminDAO() {

        cp = ConnectionPool.getInstance();
    }

    public static AdminDAO getInstance() {
        if (instance == null) {
            instance = new AdminDAO();
        }
        return instance;
    }

    public void connect() {
        conn = cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

    public List<AdminDTO> getAdminList( ) {

        List<AdminDTO> list = new ArrayList<>();
        AdminDTO dto = null;
        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.GET_ADMIN_LIST.getQuery());
            rs = pstmt.executeQuery();

            while (rs.next()) {
                dto = new AdminDTO();
                dto.setAdminNo(rs.getInt("admin_no"));
                dto.setAdminId(rs.getString("admin_id"));
                dto.setAdminPwd(rs.getString("admin_pwd"));
                dto.setAdminName(rs.getString("admin_name"));
                dto.setAdminPhone(rs.getString("admin_phone"));
                dto.setAdminAddr(rs.getString("admin_addr"));
                dto.setAdminBirth(rs.getString("admin_birth"));
                dto.setAdminGrade(rs.getString("admin_grade"));
                dto.setAdminTeam(rs.getString("admin_team"));

                list.add(dto);
            }

        } catch (Exception e) {
            System.out.println("getAdminList() 에러 : " + e);
        } finally {
            disconnect(rs, pstmt, conn);
        }

        return list;
    }

    public AdminDTO getAdminCont(int adminNo) {

        AdminDTO dto = null;
        connect();

        try {
            pstmt = conn.prepareStatement(AdminSQL.GET_ADMIN_CONT.getQuery());
            pstmt.setInt(1, adminNo);
            rs = pstmt.executeQuery();

            if (rs.next()) {

                dto = new AdminDTO();
                dto.setAdminNo(rs.getInt("admin_no"));
                dto.setAdminId(rs.getString("admin_id"));
                dto.setAdminPwd(rs.getString("admin_pwd"));
                dto.setAdminName(rs.getString("admin_name"));
                dto.setAdminPhone(rs.getString("admin_phone"));
                dto.setAdminAddr(rs.getString("admin_addr"));
                dto.setAdminBirth(rs.getString("admin_birth"));
                dto.setAdminGrade(rs.getString("admin_grade"));
                dto.setAdminTeam(rs.getString("admin_team"));
            }
        } catch (Exception e) {
            System.out.println("getAdminCont() 에러 : " + e);
        } finally {
            disconnect(rs, pstmt, conn);
        }

        return dto;
    }

    public int adminCheck(String adminId, String adminPwd) {

        int result = 0;
        connect();

        try {

            pstmt = conn.prepareStatement(AdminSQL.ADMIN_LOGIN_CHECK.getQuery());
            pstmt.setString(1, adminId);
            rs = pstmt.executeQuery();

            if(rs.next()) {

                if(adminPwd.equals(rs.getString("admin_pwd"))) {
                    result = 1;
                } else {
                    result = -1;
                }
            }

        } catch (Exception e) {
            System.out.println("adminCheck() 에러 : " + e);
        }finally {
            disconnect(rs, pstmt, conn);
        }
        return result;
    }

    public AdminDTO getAdmin(String adminId) {

        AdminDTO dto = null;
        connect();

        try {

            pstmt = conn.prepareStatement(AdminSQL.ADMIN_LOGIN_CHECK.getQuery());
            pstmt.setString(1, adminId);
            rs = pstmt.executeQuery();

            if(rs.next()) {

                dto = new AdminDTO();
                dto.setAdminNo(rs.getInt("admin_no"));
                dto.setAdminId(rs.getString("admin_id"));
                dto.setAdminPwd(rs.getString("admin_pwd"));
                dto.setAdminName(rs.getString("admin_name"));
                dto.setAdminPhone(rs.getString("admin_phone"));
                dto.setAdminAddr(rs.getString("admin_addr"));
                dto.setAdminBirth(rs.getString("admin_birth"));
                dto.setAdminGrade(rs.getString("admin_grade"));
                dto.setAdminTeam(rs.getString("admin_team"));
            }
        } catch (Exception e) {
            System.out.println("getAdmin() 에러 : " + e);
        }finally {
            disconnect(rs, pstmt, conn);
        }
        return dto;
    }
}
