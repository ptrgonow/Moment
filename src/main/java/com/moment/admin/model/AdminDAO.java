package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentNavigableMap;

public class AdminDAO {

    private static AdminDAO instance = null;

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

    public int getTotalAdminCount() {
        int count = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.COUNT_ADMIN.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                count = rs.getInt(1);
            }
        } catch (SQLException e) {
            System.out.println("어드민 수 조회 에러 : " + e);
        }

        return count;
    }
    
    private AdminDTO createAdminDTO(ResultSet rs) throws Exception {
        AdminDTO dto = new AdminDTO();
        dto.setAdminNo(rs.getInt("admin_no"));
        dto.setAdminId(rs.getString("admin_id"));
        dto.setAdminPwd(rs.getString("admin_pwd"));
        dto.setAdminName(rs.getString("admin_name"));
        dto.setAdminPhone(rs.getString("admin_phone"));
        dto.setAdminAddr(rs.getString("admin_addr"));
        dto.setAdminBirth(rs.getString("admin_birth"));
        dto.setAdminGrade(rs.getString("admin_grade"));
        dto.setAdminTeam(rs.getString("admin_team"));
        return dto;
    }

    private PreparedStatement createPreparedStatement(Connection conn, String query, Object... parameters) throws Exception {
        PreparedStatement pstmt = conn.prepareStatement(query);
        for (int i = 0; i < parameters.length; i++) {
            pstmt.setObject(i + 1, parameters[i]);
        }
        return pstmt;
    }

    public List<AdminDTO> getAdminList(int page, int size) {
        List<AdminDTO> list = new ArrayList<>();
        
        int startNo = (page * size) - (size - 1);
        int endNo = (page * size);
        
        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(AdminSQL.GET_ADMIN_LIST.getQuery())){
            	 pstmt.setInt(1, startNo);
            	 pstmt.setInt(2, endNo);
            	 
            	 try(ResultSet rs = pstmt.executeQuery()){
        	
        		while (rs.next()) {
        			list.add(createAdminDTO(rs));
            }
        }

        } catch (Exception e) {
            System.out.println("getAdminList() 에러 : " + e);
        }

        return list;
    }

    public AdminDTO getAdminCont(int adminNo) {
        AdminDTO dto = null;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = createPreparedStatement(conn, AdminSQL.GET_ADMIN_CONT.getQuery(), adminNo);
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                dto = createAdminDTO(rs);
            }

        } catch (Exception e) {
            System.out.println("getAdminCont() 에러 : " + e);
        }

        return dto;
    }

    public int adminCheck(String adminId, String adminPwd) {
        int result = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = createPreparedStatement(conn, AdminSQL.ADMIN_LOGIN_CHECK.getQuery(), adminId);
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                if (adminPwd.equals(rs.getString("admin_pwd"))) {
                    result = 1;
                } else {
                    result = -1;
                }
            }

        } catch (Exception e) {
            System.out.println("adminCheck() 에러 : " + e);
        }

        return result;
    }

    public AdminDTO getAdmin(String adminId) {
        AdminDTO dto = null;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = createPreparedStatement(conn, AdminSQL.ADMIN_LOGIN_CHECK.getQuery(), adminId);
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                dto = createAdminDTO(rs);
            }

        } catch (Exception e) {
            System.out.println("getAdmin() 에러 : " + e);
        }

        return dto;
    }


    public int adminInput(AdminDTO dto) {
        int result = 0;

        try(Connection conn = cp.connect();
            PreparedStatement pstmt = createPreparedStatement(conn, AdminSQL.INSERT_ADMIN.getQuery(),
                    dto.getAdminId(), dto.getAdminPwd(), dto.getAdminName(),
                    dto.getAdminPhone(), dto.getAdminAddr(), dto.getAdminBirth(),
                    dto.getAdminGrade(), dto.getAdminTeam())) {

            result = pstmt.executeUpdate();

        } catch (Exception e) {
            System.out.println("adminInput() 에러 : " + e);
        }

        return result;
    }


    public AdminDTO getSelectColumn() {
        AdminDTO dto = null;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = createPreparedStatement(conn, AdminSQL.SELECT_COLUMN.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                dto = createAdminDTO(rs);
            }

        } catch (Exception e) {
            System.out.println("getSelectColumn() 에러 : " + e);
        }

        return dto;

    }
}