package com.moment.admin.model;

import com.moment.configuration.ConnectionPool;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;


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
        cp.connect();
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {
        cp.disconnect(pstmt, conn);
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {
        cp.disconnect(rs, pstmt, conn);
    }

}
