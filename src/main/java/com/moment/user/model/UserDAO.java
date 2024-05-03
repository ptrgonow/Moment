package com.moment.user.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class UserDAO {

    private static UserDAO instance = null;

    ConnectionPool cp = null;

    private UserDAO() {
        cp = ConnectionPool.getInstance();
    }

    public static UserDAO getInstance() {
        if (instance == null) {
            instance = new UserDAO();
        }
        return instance;
    }

    public int getMaxNum() {

        int boardNo = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(UserSQL.GET_MAX_NUM.getQuery());
             ResultSet rs = pstmt.executeQuery()) {

            if (rs.next()) {
                boardNo = rs.getInt(1) + 1;
            }

        } catch (Exception e) {
            System.out.println("에러 : getMaxNum()");
        }


        return boardNo;
    }


    public int insertUser(UserDTO dto) {
        int result = 0;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(UserSQL.INSERT_USER.getQuery())) {

            pstmt.setInt(1, getMaxNum());
            pstmt.setString(2, dto.getUserId());
            pstmt.setString(3, dto.getUserPwd());
            pstmt.setString(4, dto.getUserName());

            result = pstmt.executeUpdate();

        } catch (Exception e) {
            System.out.println("에러 : insertUser()");
        }

        return result;
    }

    public boolean checkUserExists(String userId, String userPwd) {
        boolean exists = false;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(UserSQL.USER_LOGIN.getQuery())) {

            pstmt.setString(1, userId);
            pstmt.setString(2, userPwd);

            try (ResultSet rs = pstmt.executeQuery()) {
                exists = rs.next();
            }

        } catch (Exception e) {
            System.out.println("에러 : checkUserExists()");
            e.printStackTrace();
        }

        return exists;
    }

    public UserDTO getUerInfo(String userId, String userPwd) {
        UserDTO dto = null;

        try (Connection conn = cp.connect();
             PreparedStatement pstmt = conn.prepareStatement(UserSQL.USER_LOGIN.getQuery())) {

            pstmt.setString(1, userId);
            pstmt.setString(2, userPwd);

            try (ResultSet rs = pstmt.executeQuery()) {
                if (rs.next()) {
                    dto = new UserDTO();
                    dto.setUserId(rs.getString("user_id"));
                    dto.setUserPwd(rs.getString("user_pwd"));
                    dto.setUserName(rs.getString("user_name"));
                }
            }

        } catch (Exception e) {
            System.out.println("에러 : getUerInfo()");
            e.printStackTrace();
        }

        return dto;
    }
}
